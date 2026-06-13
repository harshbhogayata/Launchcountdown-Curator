import { Link } from 'react-router';
import { Mail, ShieldCheck, Trash2 } from 'lucide-react';

import { StoreDocBlock, StorePageHero } from '../StorePageHero';
import { StoreSiteLayout } from '../StoreSiteLayout';
import { LP, SHAPE_ITEM, STORE_CONTACT } from '../tokens';
import { useStorePageMeta } from '../useStorePageMeta';

const deletionMailto = `mailto:${STORE_CONTACT.support}?subject=${encodeURIComponent(
  'The Curator account deletion request',
)}&body=${encodeURIComponent(
  'Please delete my The Curator account and associated data.\n\nAccount email: \n',
)}`;

export function StoreAccountDeletion() {
  useStorePageMeta({
    title: 'Account Deletion · The Curator',
    description:
      'Request deletion of your The Curator account and associated personal data.',
  });

  return (
    <StoreSiteLayout activeNav="deletion">
      <StorePageHero
        overline="Account deletion"
        title={<>Delete your account <span style={{ color: `${LP.onSurface}73` }}>and data.</span></>}
        lede="Delete your account inside The Curator or email us from the address on your account. Required for App Store and Google Play review."
      />

      <div className="space-y-5">
        <StoreDocBlock title="Delete in the app">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Open The Curator and sign in.</li>
            <li>Go to Settings → Account.</li>
            <li>Choose Delete account and confirm the prompt.</li>
          </ol>
          <p>For security, you may be asked to sign in again before deletion completes.</p>
        </StoreDocBlock>

        <StoreDocBlock title="Request deletion by email">
          <p>
            If you cannot access the app, email us from your account address with the phrase
            &quot;Please delete my Curator account.&quot; Include your account email if you write
            from a different address so we can verify ownership.
          </p>
          <a
            href={deletionMailto}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] transition-opacity hover:opacity-90"
            style={{ backgroundColor: LP.onSurface, color: LP.bg }}
          >
            <Mail className="h-4 w-4" />
            Email deletion request
          </a>
          <p>Requests are completed within 30 days.</p>
        </StoreDocBlock>

        <StoreDocBlock title="What is deleted">
          <ul className="list-disc space-y-2 pl-5">
            <li>Your account profile and authentication record.</li>
            <li>Saved articles, collections, reading history, and preferences.</li>
            <li>Push notification registrations and account-linked subscription metadata.</li>
          </ul>
          <p>
            Some records may be retained only when required for security, fraud prevention, billing,
            tax, legal, or compliance obligations, as described in our Privacy Policy.
          </p>
        </StoreDocBlock>
      </div>

      <div
        className="mt-10 flex flex-wrap items-center gap-3 border px-5 py-4 text-[12px] font-bold"
        style={{ borderColor: `${LP.onSurface}1A`, backgroundColor: LP.container, ...SHAPE_ITEM }}
      >
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
          style={{ backgroundColor: LP.errorContainer, color: LP.onSurface }}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Permanent action
        </span>
        <Link
          to="/privacy"
          className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-white/60"
          style={{ color: LP.onSurface }}
        >
          <ShieldCheck className="h-4 w-4" />
          Privacy Policy
        </Link>
        <Link
          to="/support"
          className="rounded-full px-4 py-2 transition-colors hover:bg-white/60"
          style={{ color: LP.onSurface }}
        >
          Support
        </Link>
      </div>
    </StoreSiteLayout>
  );
}
