// Editable site content. Projects will move to the admin-managed database next.
export const CATEGORIES = [
  { id: "d2c-ads", label: "D2C Ads" },
  { id: "social-reels", label: "Social Media Reels" },
  { id: "music-videos", label: "Music Videos" },
  { id: "brand-films", label: "Brand Films" },
  { id: "narrative-films", label: "Narrative Films" },
  { id: "motion-design", label: "Motion Design & Animation" },
  { id: "ai-workflows", label: "AI Workflows" },
  { id: "all", label: "All Work" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: Exclude<CategoryId, "all">;
  year?: string;
  role?: string;
  tools?: string;
  thumbnail?: string;
  videoUrl?: string;
};

// No real projects yet — add them here (or via the admin dashboard once live).
export const PROJECTS: Project[] = [];

export const STATS = [
  { value: "6+", label: "Years of Experience" },
  { value: "100+", label: "Projects Delivered" },
  { value: "25+", label: "Music Videos Done" },
  { value: "Multiple", label: "Brand Collaborations" },
];

export const TIMELINE = [
  { year: "Start", text: "Early editing" },
  { year: "Next", text: "Filmmaking & music videos" },
  { year: "Then", text: "Motion design & commercial projects" },
  { year: "Recent", text: "AI video production" },
  { year: "Recent", text: "Creative strategy & workflows" },
  { year: "Now", text: "1.8 Creative Studio", current: true },
];

export const CONTACT = {
  email: "hello@example.com", // placeholder — replace with real email
  linkedin: "https://www.linkedin.com/", // placeholder — replace with real profile
};
