export const PROJECT_STRUCTURE = {
    PART_1: {
        title: "Notes & Essays",
        label: "Part I",
        pages: [
            { title: "Notes", path: "/notes" },
            { title: "Essays", path: "/essays" }
        ]
    },
    PART_2: {
        title: "Notes and words I love",
        label: "Part II",
        pages: [
            { title: "Quotes", path: "/quotes" },
            { title: "Linguistic Treats", path: "/linguistic-treats" }
        ]
    },
    PART_3: {
        title: "Sophia Atlas",
        label: "Part III",
        pages: [
            { title: "Concepts", path: "/concepts" },
            { title: "Definitions", path: "/definitions" },
            { title: "Frameworks", path: "/frameworks" }
        ]
    },
    PART_4: {
        title: "Learning & Research",
        label: "Part IV",
        pages: [
            { title: "Content Notes", path: "/content-notes" }
        ]
    }
} as const;
