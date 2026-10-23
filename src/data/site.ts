// Public portfolio content. No speculative client projects are seeded.
export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "digital-ads", label: "Digital Ads" },
  { id: "product-videos", label: "Product Videos" },
  { id: "brand-films", label: "Brand Films" },
  { id: "short-form", label: "Short Form Content" },
  { id: "ai-content", label: "AI Content" },
  { id: "motion-design", label: "Motion Design" },
  { id: "social-media", label: "Social Media" },
  { id: "concepts", label: "Concepts" },
] as const;
export type CategoryId = (typeof CATEGORIES)[number]["id"];
export type Project = {
  slug: string; title: string; description: string;
  category: Exclude<CategoryId, "all">;
  published: boolean;
  year?: string; role?: string; tools?: string; thumbnail?: string; videoUrl?: string;
};
export const PROJECTS: Project[] = [];
export function publicProjects(projects: Project[], category: CategoryId) {
  return projects.filter((p) => p.published && (category === "all" || p.category === category));
}
export const SERVICES = ["Creative Strategy", "Digital Ads", "AI Production", "Brand Storytelling", "Social Media Creative"];
export const STEPS = [
  { title: "Understand", text: "Your business, product, audience, and marketing goals." },
  { title: "Create", text: "Develop compelling concepts, ads, and AI-powered video content." },
  { title: "Test & Refine", text: "Explore creative variations, learn from campaign performance, and improve the approach." },
  { title: "Build on what works", text: "Use insights to develop stronger creative directions and future campaigns." },
];
// Years, employers, and roles transcribed from the supplied homepage reference.
// Add detailed bullet points only when the source timeline HTML is supplied.
export const TIMELINE = [
  { year: "2019", title: "Bando B", role: "Concept Artist, Creative Director" },
  { year: "2020", title: "Bachelors in Law", role: "MGCL, Nanachira" },
  { year: "2021", title: "LH Media", role: "Video Editor, Studio Manager" },
  { year: "2021", title: "Tesseract", role: "Director, Short Film" },
  { year: "2022", title: "The Beyond Limits", role: "Motion Designer" },
  { year: "2023", title: "Rabbit Box Ads", role: "Video Editor, Motion Designer" },
  { year: "2023", title: "GOAT", role: "Feature Film Editor" },
  { year: "2024", title: "The Happy Slate", role: "Creative Lead" },
  { year: "2025", title: "Pocket FM", role: "Assistant Creative Director" },
  { year: "2026", title: "Now", role: "Exploring what's next", current: true },
];
// Actual contact methods have not yet been provided. Do not use placeholder links.
export const CONTACT: { email: string | null; linkedin: string | null } = { email: null, linkedin: null };
