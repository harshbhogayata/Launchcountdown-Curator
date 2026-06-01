import { createBrowserRouter } from 'react-router';

import { ComingSoon } from './pages/ComingSoon';
import { StorePrivacy } from './store-site/pages/StorePrivacy';
import { StoreSupport } from './store-site/pages/StoreSupport';
import { StoreTerms } from './store-site/pages/StoreTerms';

export const router = createBrowserRouter([
  { path: '/', Component: ComingSoon },
  { path: '/privacy', Component: StorePrivacy },
  { path: '/terms', Component: StoreTerms },
  { path: '/support', Component: StoreSupport },
]);
