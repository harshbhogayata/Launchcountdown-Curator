import { RouterProvider } from 'react-router';

import { ToastProvider } from './components/Toast';
import { router } from './routes';

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}
