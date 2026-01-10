// Portfolio Data for Verappan

export const profileData = {
    name: "Verappan",
    avatarSrc: "/portfolio_image.png",
    avatarFallback: "VP",
    location: "India",
    motto: "\"The only history that is worth a damn is the history we make today.\" — Henry Ford",
    bio: "Software Developer, Finance Enthusiast, and AI Engineer with a passion for building impactful solutions.",
    roles: ["Software Developer", "Finance Enthusiast", "AI Engineer"],
    socials: {
        linkedin: "https://linkedin.com/in/verappan",
        github: "https://github.com/verappan",
        instagram: "https://instagram.com/verappan",
        email: "mailto:verappan@example.com",
    },
};

export const workExperience = [
    {
        title: "2024",
        role: "Software Developer",
        organization: "Tech Corp",
        duration: "Jan 2024 - Present",
        bullets: [
            "Led development of core platform features, improving performance by 40%.",
            "Mentored junior developers and established coding standards.",
        ],
    },
    {
        title: "2023",
        role: "Junior Developer",
        organization: "Startup Inc.",
        duration: "Jun 2023 - Dec 2023",
        bullets: [
            "Built RESTful APIs using Django and Node.js.",
            "Contributed to frontend development with React and Tailwind CSS.",
        ],
    },
    {
        title: "2022",
        role: "Intern",
        organization: "Data Labs",
        duration: "May 2022 - Aug 2022",
        bullets: [
            "Developed data analysis pipelines using Python and Pandas.",
            "Assisted in building machine learning models for predictive analytics.",
        ],
    },
];

export const positionsOfResponsibility = [
    {
        title: "2024",
        role: "Technical Lead",
        organization: "College Tech Club",
        duration: "Aug 2024 - Present",
        bullets: [
            "Leading a team of 15+ members in organizing hackathons and workshops.",
            "Mentoring students in web development and open source contributions.",
        ],
    },
    {
        title: "2023",
        role: "Core Committee Member",
        organization: "Finance Society",
        duration: "Jun 2023 - May 2024",
        bullets: [
            "Organized finance-related events and speaker sessions.",
            "Managed a budget of $5000+ for annual events.",
        ],
    },
];

export const projects = [
    {
        slug: "ai-stock-predictor",
        title: "AI Stock Predictor",
        description: "Machine learning model for stock price prediction using LSTM networks.",
        fullDescription: "A comprehensive machine learning project that uses LSTM (Long Short-Term Memory) neural networks to predict stock prices. The model is trained on historical price data, technical indicators, and sentiment analysis from financial news. Features include real-time predictions, backtesting capabilities, and a dashboard for visualization.",
        date: "Dec 2024",
        techStack: ["Python", "TensorFlow", "Pandas", "NumPy"],
        github: "https://github.com/verappan/ai-stock-predictor",
        live: null,
    },
    {
        slug: "portfolio-website",
        title: "Portfolio Website",
        description: "Modern, animated portfolio built with Next.js and Framer Motion.",
        fullDescription: "This very portfolio website you're viewing! Built from scratch using Next.js 14, React 19, Tailwind CSS, and Framer Motion for smooth animations. Features include dark/light mode, scroll-based animations, a custom timeline component, bento grid layouts, and responsive design optimized for all devices.",
        date: "Jan 2025",
        techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        github: "https://github.com/verappan/portfolio",
        live: "https://verappan.dev",
    },
    {
        slug: "expense-tracker",
        title: "Expense Tracker",
        description: "Full-stack expense tracking application with analytics dashboard.",
        fullDescription: "A complete expense management solution with features like category-based tracking, recurring expenses, budget alerts, and visual analytics. The backend is built with Django REST Framework with JWT authentication, while the frontend uses React with Chart.js for interactive visualizations.",
        date: "Oct 2024",
        techStack: ["Django", "PostgreSQL", "React", "Chart.js"],
        github: "https://github.com/verappan/expense-tracker",
        live: null,
    },
    {
        slug: "chat-application",
        title: "Chat Application",
        description: "Real-time chat application with WebSocket support.",
        fullDescription: "A real-time messaging platform supporting private chats, group conversations, and file sharing. Built using Socket.io for WebSocket communication, MongoDB for message persistence, and React for the frontend. Features include typing indicators, read receipts, and message reactions.",
        date: "Aug 2024",
        techStack: ["Node.js", "Socket.io", "MongoDB", "React"],
        github: "https://github.com/verappan/chat-app",
        live: null,
    },
];

export const techStack = {
    languages: ["Python", "C++", "C", "Java", "R"],
    backend: ["Django", "Django REST", "Node.js", "JWT", "jQuery"],
    frontend: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "React", "Bootstrap"],
    libraries: ["scikit-learn", "NumPy", "Pandas", "Pytest", "QuantLib"],
    databases: ["MySQL", "SQLite", "PostgreSQL", "SQL Server", "MongoDB"],
    dataScience: ["Power BI", "Tableau", "Chart.js", "SAS"],
    design: ["Figma", "Adobe XD", "Canva"],
    others: ["Git", "Markdown", "Arduino", "Jira", "Firebase", "Heroku", "Vercel", "Netlify", "Notion", "SAP ERP"],
};

// Flat list of core technologies for pill badge display
export const coreTechnologies = [
    "Python", "JavaScript", "TypeScript", "React.js", "Next.js",
    "Flask", "Node.js", "Supabase", "PostgreSQL", "MySQL",
    "MongoDB", "Docker", "Git"
];

export const stats = [
    { name: "GitHub", value: "200+", label: "Contributions" },
    { name: "LeetCode", value: "150+", label: "Problems Solved" },
    { name: "CodeChef", value: "3★", label: "Rating" },
    { name: "Kaggle", value: "Expert", label: "Tier" },
    { name: "Medium", value: "10+", label: "Articles" },
    { name: "Monkeytype", value: "90 WPM", label: "Typing Speed" },
];

export const certifications = [
    { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
    { name: "Google Data Analytics", issuer: "Google", year: "2023" },
    { name: "Machine Learning Specialization", issuer: "Coursera / Stanford", year: "2023" },
    { name: "Financial Markets", issuer: "Yale University", year: "2022" },
];

export const quotes = [
    "Code is poetry, but the real art is in the architecture.",
    "The best way to predict the future is to create it.",
    "Simplicity is the ultimate sophistication.",
    "First, solve the problem. Then, write the code.",
];

export const randomFacts = [
    "I can solve a Rubik's cube in under 2 minutes.",
    "I've read 50+ books on finance and technology.",
    "I type at 90 WPM on a good day.",
    "My first line of code was in BASIC on a Windows 98 machine.",
];

export const blogs = [
    {
        title: "Understanding Neural Networks",
        excerpt: "A deep dive into the architecture and math behind neural networks.",
        date: "2024-01-15",
        link: "/blog/neural-networks",
    },
    {
        title: "My Journey into Open Source",
        excerpt: "How contributing to open source changed my career trajectory.",
        date: "2023-11-20",
        link: "/blog/open-source-journey",
    },
    {
        title: "Building Scalable APIs with Django",
        excerpt: "Best practices for designing and implementing RESTful APIs.",
        date: "2023-09-10",
        link: "/blog/django-apis",
    },
];

export const navItems = [
    { name: "Home", link: "#home" },
    { name: "Experience", link: "#experience" },
    { name: "Projects", link: "#projects" },
    { name: "About", link: "#about" },
    { name: "Blog", link: "#blog" },
];
