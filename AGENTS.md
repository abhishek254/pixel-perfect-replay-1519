<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep homepage portfolio, process, and timeline content in the shared data module; only explicitly published projects appear publicly, to prevent draft exposure.
- Use the existing TanStack routes and shadcn controls for navigation and interactive details; preserve route behavior during visual changes.
- Render career details with collision-aware popovers and a horizontally scrollable timeline, so keyboard and touch users can access the same information.
- Portfolio videos and editable categories are stored in Cloud; public queries use published-only RLS, while admin mutations verify the encrypted server session before privileged access.
- Admin access uses a server-only private password, timing-safe verification, persistent attempt limits, and an HTTP-only encrypted cookie; no client-side credentials or authorization flags.
- Uploaded portfolio media is private; short-lived media URLs are issued only for published rows or an authenticated administrator, preventing draft media exposure.
