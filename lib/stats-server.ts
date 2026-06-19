// Server-only live stats fetcher. Cached for 24h via Next.js fetch revalidation —
// runs once a day regardless of visitor traffic, never on every page load.

const GITHUB_USERNAME = "Verappansm";
const LEETCODE_USERNAME = "verappansm";
const MEDIUM_USERNAME = "smverappan";

export interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

export interface LiveStats {
    github: {
        contributions: number | null;
        allTime: number | null;
        weeks: (ContributionDay | null)[][];
        profile: string;
    };
    leetcode: {
        total: number | null;
        easy: number | null;
        medium: number | null;
        hard: number | null;
        ranking: number | null;
        profile: string;
    };
    monkeytype: { wpm: number | null; accuracy: number | null; profile: string };
    medium: {
        articles: number | null;
        latestTitle: string | null;
        latestLink: string | null;
        profile: string;
    };
}

const DAY = 60 * 60 * 24;

async function safeJson(url: string, init?: RequestInit) {
    try {
        const res = await fetch(url, { ...init, next: { revalidate: DAY } });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

async function safeText(url: string) {
    try {
        const res = await fetch(url, { next: { revalidate: DAY } });
        if (!res.ok) return null;
        return await res.text();
    } catch {
        return null;
    }
}

// Groups a flat list of days into GitHub-style weekly columns (Sun—Sat),
// padding the first/last week with nulls so every column has 7 cells.
function buildHeatmapWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
    if (days.length === 0) return [];
    const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();

    const padded: (ContributionDay | null)[] = [...Array(firstWeekday).fill(null), ...days];
    while (padded.length % 7 !== 0) padded.push(null);

    const weeks: (ContributionDay | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
        weeks.push(padded.slice(i, i + 7));
    }
    return weeks;
}

export async function getLiveStats(): Promise<LiveStats> {
    const apeKey = process.env.MONKEYTYPE_APE_KEY;

    const [githubData, githubAllTimeData, leetcodeData, monkeytypeData, mediumXml] = await Promise.all([
        safeJson(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`),
        safeJson(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`),
        safeJson(`https://leetcode-stats-api.vercel.app/${LEETCODE_USERNAME}`),
        apeKey
            ? safeJson("https://api.monkeytype.com/users/personalBests?mode=time&mode2=30", {
                headers: { Authorization: `ApeKey ${apeKey}` },
            })
            : Promise.resolve(null),
        safeText(`https://medium.com/feed/@${MEDIUM_USERNAME}`),
    ]);

    const githubContributions = typeof githubData?.total?.lastYear === "number" ? githubData.total.lastYear : null;
    const weeks = Array.isArray(githubData?.contributions) ? buildHeatmapWeeks(githubData.contributions) : [];
    const githubAllTime = githubAllTimeData?.total
        ? Object.values(githubAllTimeData.total as Record<string, number>).reduce(
            (sum, n) => sum + (typeof n === "number" ? n : 0),
            0
        )
        : null;

    const bestRun = Array.isArray(monkeytypeData?.data)
        ? monkeytypeData.data.reduce(
            (max: { wpm: number } | null, cur: { wpm: number }) =>
                !max || cur.wpm > max.wpm ? cur : max,
            null
        )
        : null;

    const articleCount = mediumXml ? (mediumXml.match(/<item>/g) || []).length : null;
    const firstItem = mediumXml?.match(/<item>([\s\S]*?)<\/item>/)?.[1] ?? null;
    const latestTitle = firstItem?.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ?? null;
    const latestLink = firstItem?.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.split("?")[0] ?? null;

    return {
        github: {
            contributions: githubContributions,
            allTime: githubAllTime,
            weeks,
            profile: `https://github.com/${GITHUB_USERNAME}`,
        },
        leetcode: {
            total: leetcodeData?.totalSolved ?? null,
            easy: leetcodeData?.easySolved ?? null,
            medium: leetcodeData?.mediumSolved ?? null,
            hard: leetcodeData?.hardSolved ?? null,
            ranking: leetcodeData?.ranking ?? null,
            profile: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
        },
        monkeytype: {
            wpm: bestRun?.wpm ? Math.round(bestRun.wpm) : null,
            accuracy: bestRun?.acc ? Math.round(bestRun.acc) : null,
            profile: "https://monkeytype.com/profile/Verappan",
        },
        medium: {
            articles: articleCount,
            latestTitle,
            latestLink,
            profile: `https://medium.com/@${MEDIUM_USERNAME}`,
        },
    };
}
