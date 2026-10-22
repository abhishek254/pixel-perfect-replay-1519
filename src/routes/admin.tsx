import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Reveal";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Login — 1.8" },
      { name: "description", content: "Administrator access for the 1.8 portfolio." },
      { property: "og:title", content: "Admin Login — 1.8" },
      { property: "og:description", content: "Administrator access for the 1.8 portfolio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-offwhite px-6 text-center">
      <Logo className="text-5xl" />
      <h1 className="text-3xl font-bold">Admin Login</h1>
      <p className="max-w-sm text-muted-foreground">Secure sign-in and the Portfolio Manager are being set up next.</p>
      <Link to="/" className="text-sm underline underline-offset-4">Back to site</Link>
    </main>
  ),
});
