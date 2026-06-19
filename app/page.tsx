import { getLiveStats } from "@/lib/stats-server";
import { HomeClient } from "@/components/home-client";

export default async function Home() {
  const stats = await getLiveStats();
  return <HomeClient stats={stats} />;
}
