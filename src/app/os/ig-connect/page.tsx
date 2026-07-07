import ConnectionChecklist from '../ig-sessions/ConnectionChecklist';

const META_CONNECT_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/meta-social-connect-start';

export const metadata = {
  title: 'Meta Connect — Ops OS',
  description: 'Meta connection readiness for @dolodorsey.',
};

export default function IgConnectPage() {
  return (
    <main className="min-h-screen bg-[#060607] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <a href="/os/ig-sessions" className="text-xs uppercase tracking-[0.25em] text-yellow-200/75 hover:text-yellow-100">← Back to IG Sessions</a>
        <section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Official Connect</div>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight">Meta Connect Readiness</h1>
          <p className="mt-4 text-sm leading-6 text-white/60">
            This page checks whether the Meta app settings are installed and gives the real connection entry point for @dolodorsey.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={META_CONNECT_URL} className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-200">
              Connect Through Meta
            </a>
            <a href="/os/ig-sessions" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              View IG Board
            </a>
          </div>
        </section>

        <ConnectionChecklist />

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Fully Equipped Means</div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-black/25 p-4"><div className="font-semibold">Start URL</div><p className="mt-1 text-sm text-white/55">The Connect button can start the official flow.</p></div>
            <div className="rounded-2xl bg-black/25 p-4"><div className="font-semibold">Return URL</div><p className="mt-1 text-sm text-white/55">A return route is live for platform responses.</p></div>
            <div className="rounded-2xl bg-black/25 p-4"><div className="font-semibold">Status API</div><p className="mt-1 text-sm text-white/55">The checklist shows what is present and what is missing.</p></div>
            <div className="rounded-2xl bg-black/25 p-4"><div className="font-semibold">Ops Tracking</div><p className="mt-1 text-sm text-white/55">Connection attempts and profile state are stored in Supabase.</p></div>
          </div>
        </section>
      </div>
    </main>
  );
}
