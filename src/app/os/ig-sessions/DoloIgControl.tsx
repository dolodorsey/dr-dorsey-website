'use client';

const META_CONNECT_URL =
  'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/meta-social-connect-start?brand_slug=dr_dorsey&account_identifier=dolodorsey&return_url=https%3A%2F%2Fwww.thedoctordorsey.com%2Fos%2Fig-sessions';

export default function DoloIgControl() {
  return (
    <section className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-5">
      <div className="text-xs uppercase tracking-[0.25em] text-yellow-100/80">@dolodorsey Connection</div>
      <h2 className="mt-2 text-2xl font-semibold text-white">Connect Instagram Through Meta</h2>
      <p className="mt-2 text-sm leading-6 text-white/70">
        Use the official Meta connection for approved publishing, comments, insights and reporting. The Dolo connection is intentionally created without Instagram message permissions.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={META_CONNECT_URL}
          className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-200"
        >
          Connect @dolodorsey Through Meta
        </a>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-green-400/20 bg-green-400/10 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-green-100/70">Private Messages</div>
          <div className="mt-2 text-lg font-semibold text-white">Owner manual</div>
          <p className="mt-1 text-sm text-white/65">
            No automated DMs, no automated DM replies, no keyword-DM routing, and no inbox polling for @dolodorsey. Dr. Dorsey handles the inbox personally.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-yellow-100/70">Allowed Automation</div>
          <div className="mt-2 text-lg font-semibold text-white">Content + measurement</div>
          <p className="mt-1 text-sm text-white/60">
            Organize content, prepare captions, publish approved posts, collect post insights, track attributed clicks and build engagement recommendations.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/65">
        <strong className="text-white">Connection rule:</strong> the Meta OAuth request for @dolodorsey excludes <code className="text-yellow-100">instagram_manage_messages</code>. Reconnecting the account through this button preserves the no-DM policy.
      </div>
    </section>
  );
}
