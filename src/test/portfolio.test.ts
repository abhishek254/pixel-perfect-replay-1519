import { describe, expect, it } from "vitest";
import { publicProjects, type Project } from "@/data/site";

const projects: Project[] = [
  { slug: "published", title: "Published", description: "", category: "digital-ads", published: true },
  { slug: "draft", title: "Draft", description: "", category: "digital-ads", published: false },
  { slug: "film", title: "Film", description: "", category: "brand-films", published: true },
];
describe("Public portfolio", () => {
  it("never exposes unpublished projects under All", () => {
    expect(publicProjects(projects, "all").map((p) => p.slug)).toEqual(["published", "film"]);
  });
  it("shows published projects only in their assigned category", () => {
    expect(publicProjects(projects, "digital-ads").map((p) => p.slug)).toEqual(["published"]);
    expect(publicProjects(projects, "concepts")).toEqual([]);
  });
});