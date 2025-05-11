export const personalInfo = {
    name: "Mykhailo H",
    location: "Odessa, Ukraine",
    email: "gmihasik@gmail.com",
    github: "https://github.com/Genorred",
    // linkedin: "https://www.linkedin.com/in/rishikeshs/",
} as const;

export const workExperience = [
    {
        company: "Gloosy",
        iconSrc: '/gloosy.svg',
        exhibitionSrc: '/gloosy-exhibition',
        location: "Remote",
        position: "Software Engineer",
        period: "May 2024 - August 2024",
        achievements: [
            "Created the core functionality and helped to release in time",
            "Created the core functionality and helped to release in time",
            "Created the core functionality and helped to release in time",
            "Created the core functionality and helped to release in time",
            "Created the core functionality and helped to release in time",
            "Created the core functionality and helped to release in time",
            "Created the core functionality and helped to release in time",
            "Created the core functionality and helped to release in time",
            "Made responsive UI of majority of pages",
        ],
    },
] as const;

export const education = [
    {
        institution: "Odessa technical vocational college ONTU",
        location: "Odessa, Ukraine",
        degree: "2 year",
        period: "Jun 2023 - Present",
        achievements: [
            // "President of the Department of Information Technology",
            // "G20 student delegate",
            // "Organized multiple technical workshops and events",
            // "Represented my college in multiple national and international hackathons and won.",
        ],
    },
] as const;
export const skills = {
    programmingLanguages: [
        "TypeScript",
        "JavaScript",
    ],
    frontendDevelopment: [
        "Nextjs",
        "Reactjs",
        "Redux",
        "Zustand",
        "Shadcn UI",
        "Tailwind CSS",
        "HTML",
        "CSS",
    ],
    backendDevelopment: ["Nodejs", "Expressjs", "Nestjs", "GraphQL", "RabbitMQ"],
    databaseAndStorage: ["PostgreSQL", "Prisma (ORM)", "Elasticsearch", "Redis"],
    cloudAndDevOps: ["Docker"],
    toolsAndServices: [
        "Zod",
    ],
} as const;

export const projects: {
    title: string;
    github: string;
    youtube: string;
    description: string[];
    showcases: {
        title: string;
        videoUrl: string;
    }[]
}[] = [
    {
        title: "PEPP",
        github: "https://github.com/Genorred/PEPP",
        youtube: "https://youtu.be/59R-vXjbaoc",
        description: [
            "Blog sharing app with advanced user helping features",
            "Search optimised: Implemented server side rendering with Nextjs for unleashing power of search engines.",
            "Distributed microservice architecture: expandable load resistant system.",
            "Caching optimised: make user experience very handful and fast unleashing power of Redis and SSR",
            "Built with Nextjs, Nestjs",
        ],
        showcases: [
            {
                title: 'In-depth authorization and authentication system',
                videoUrl: '/assets/PEPP/Auth.mp4'
            },
            {
                title: 'Handy post creating flow',
                videoUrl: ''
            },
            {
                title: 'Wide editor',
                videoUrl: '/assets/PEPP/Editor.mp4'
            },
            {
                title: 'Powerful recommendation and searching system',
                videoUrl: ''
            },
            {
                title: "Users interaction",
                videoUrl: ''
            }
        ]
    },
] as const;

export const awards = [
    {
        name: "IEEE YESIST12 Hackathon",
        issuer: "IEEE",
        date: "Sep 2022",
        type: "International",
        position: "Second Place",
    },
    {
        name: "Prodigi Cognizant Hackathon",
        issuer: "Cognizant",
        date: "Feb 2023",
        type: "National",
        position: "Second Runner-up",
    },
    {
        name: "Cisco Thingqbator Hackathon",
        issuer: "Cisco",
        date: "Jan 2023",
        type: "National",
        position: "First Runner-up",
    },
    {
        name: "Innovators Day",
        issuer: "Sri Manakula Vinayagar Engineering College, Pondicherry",
        date: "Sep 2022",
        type: "National",
        position: "First Prize",
    },
    {
        name: "KG Hackfest'22",
        issuer: "KGiSL Institute of Technology, Coimbatore",
        date: "Sep 2022",
        type: "National",
        position: "Second Prize",
    },
    {
        name: "Innohacks'22",
        issuer: "Innogeeks, KIET Group of Institutions, New Delhi",
        date: "May 2022",
        type: "National",
        position: "Second Runner-up",
    },
    {
        name: "Hack @ SKCET",
        issuer: "Hackclub SKCET, SKCET, Coimbatore",
        date: "Feb 2022",
        type: "National",
        position: "Most Impactful Hack",
    },
] as const;
