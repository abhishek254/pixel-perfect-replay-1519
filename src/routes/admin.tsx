import { createFileRoute, Link } from '@tanstack/react-router';
import { useRouter } from '@tanstack/react-router';
import { Logo } from '@/components/site/Reveal';
import { AdminLogin, AdminManager } from '@/components/site/AdminConsole';
import { adminStatus } from '@/lib/portfolio.functions';
import { adminQuery } from '@/lib/portfolio-query';
export const Route = createFileRoute('/admin')({
  loader: async ({ context }) => { const signedIn = await adminStatus(); if (signedIn) await context.queryClient.ensureQueryData(adminQuery); return { signedIn }; },
  head: () => ({ meta: [{ title: 'Portfolio Console — 1.8' }, { name: 'description', content: 'Manage 1.8 portfolio videos and categories.' }, { property: 'og:title', content: 'Portfolio Console — 1.8' }, { property: 'og:description', content: 'Manage 1.8 portfolio videos and categories.' }, { name: 'robots', content: 'noindex' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }] }),
  component: AdminPage,
});
function AdminPage() { const { signedIn } = Route.useLoaderData(); const router = useRouter(); if (signedIn) return <AdminManager />; return <main className="min-h-screen bg-offwhite flex items-center justify-center px-6"><div className="w-full max-w-sm grid gap-6"><Logo className="text-5xl" /><h1 className="text-4xl">Admin console</h1><AdminLogin onSuccess={() => void router.invalidate()} /><Link to="/" className="text-xs underline text-muted-foreground">Back to site</Link></div></main>; }
