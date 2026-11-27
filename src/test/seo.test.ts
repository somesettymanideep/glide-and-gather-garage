import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { FAQS } from "@/components/site/FaqSection";

describe("SEO Requirements & Validations", () => {
  it("includes all essential FAQ questions with answers", () => {
    expect(FAQS.length).toBeGreaterThanOrEqual(6);
    const questions = FAQS.map((f) => f.q.toLowerCase());
    expect(questions.some((q) => q.includes("best car travels in vijayawada"))).toBe(true);
    expect(questions.some((q) => q.includes("hourly car rental packages"))).toBe(true);
    expect(questions.some((q) => q.includes("hidden charges") || q.includes("fare"))).toBe(true);
    expect(questions.some((q) => q.includes("airport pickup") || q.includes("gannavaram"))).toBe(true);
    expect(questions.some((q) => q.includes("outstation"))).toBe(true);
  });

  it("verifies public/sitemap.xml exists and references key routes", () => {
    const sitemapPath = resolve(process.cwd(), "public", "sitemap.xml");
    expect(existsSync(sitemapPath)).toBe(true);
    const sitemap = readFileSync(sitemapPath, "utf-8");
    expect(sitemap).toContain("https://madhumithacartravels.in/");
    expect(sitemap).toContain("https://madhumithacartravels.in/cars");
    expect(sitemap).toContain("https://madhumithacartravels.in/about");
    expect(sitemap).toContain("https://madhumithacartravels.in/contact");
    expect(sitemap).toContain("https://madhumithacartravels.in/cars/MC105");
  });

  it("verifies public/robots.txt allows indexing and links to sitemap", () => {
    const robotsPath = resolve(process.cwd(), "public", "robots.txt");
    expect(existsSync(robotsPath)).toBe(true);
    const robots = readFileSync(robotsPath, "utf-8");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: https://madhumithacartravels.in/sitemap.xml");
  });
});
