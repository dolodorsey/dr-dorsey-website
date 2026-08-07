import ConnectionChecklist from '../ig-sessions/ConnectionChecklist';

const INSTAGRAM_CONNECT_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/instagram-login-start';
const RETURN_URL = 'https://www.doctordorsey.com/os/ig-connect';

const ACCOUNTS = [
  { brand: 'Dr. Dorsey', brandSlug: 'dr_dorsey', handle: 'dolodorsey' },
  { brand: 'The Kollective', brandSlug: 'kollective', handle: 'kollectivehospitality' },
  { brand: 'Casper Group', brandSlug: 'casper-group', handle: 'thecaspergroupworldwide', note: 'Instagram DM API access must also be enabled in account settings.' },
  { brand: 'Good Times', brandSlug: 'good_times', handle: 'goodtimesworldwide' },
  { brand: 'Help 911', brandSlug: 'help_911', handle: 'help911.help' },
  { brand: 'Make Atlanta Great Again', brandSlug: 'maga', handle: 'makeatlanta.greatagain' },
  { brand: 'On Call', brandSlug: 'on-call', handle: 'oncall.allday', note: 'Instagram DM API access must also be enabled in account settings.' },
];

function connectUrl(brandSlug: string, handle: string) {
  const params = new URLSearchParams({
    brand_slug: brandSlug,
    ig_handle: handle,
    return_url: RETURN_URL,
  });
  return `${INSTAGRAM_CONNECT_URL}?${params.toString()}`;
}

export const metadata = {
  title: 'Instagram Fleet Repair — Ops OS',
  description: 'Canonical Instagram Business Login and connection repair console for the enterprise social fleet.',
};

export default function IgConnectPage() {
  return (
    <main className="min-h-screen bg-[#060607] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <a href="/os/ig-sessions" className="text-xs uppercase tracking-[0.25em] text-yellow-200/75 hover:text-yellow-100">← Back to IG Sessions</a>

        <section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Canonical Instagram Login</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Instagram Fleet Repair</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60">
            Reconnect each company separately. The new connection flow requests publishing, comments, messaging, and insights access, then live-tests Insights and webhook subscriptions before marking the account healthy.
          </p>
          <p className="mt-3 max-w-3xl text-xs leading-5 text-yellow-100/65">
            Sign into the Instagram account shown on each card before approving access. Do not approve a different account for that brand.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {ACCOUNTS.map((account) => (
            <article key={account.brandSlug} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-white/40">{account.brand}</div>
              <h2 className="mt-2 text-2xl font-semibold">@{account.handle}</h2>
              <p className="mt-2 text-sm text-white/55">Reconnect this account only to the {account.brand} record.</p>
              {account.note ? <p className="mt-3 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs leading-5 text-amber-100/75">{account.note}</p> : null}
              <a
                href={connectUrl(account.brandSlug, account.handle)}
                className="mt-5 inline-flex rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-200"
              >
                Reconnect @{account.handle}
              </a>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Connection Health</div>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Existing legacy credentials remain available for proven publishing/comment operations until each replacement connection passes its live capability checks. The backend does not mark unsupported capabilities healthy.
          </p>
          <div className="mt-5">
            <ConnectionChecklist />
          </div>
        </section>
      </div>
    </main>
  );
}
