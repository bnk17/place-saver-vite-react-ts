// src/AppLayout.tsx
import { Outlet } from 'react-router';
import { AppHeader } from './components/Header/Header';

export default function AppLayout() {
  return (
    <div className="flex h-[90vh] flex-col px-8 py-5 md:m-auto md:h-[100vh] md:max-w-[600px] lg:max-w-[800px]">
      {/* Shared header */}
      <AppHeader />
      {/* Shared page container */}
      <main>
        {/* Nested routes will render here */}
        <Outlet />
      </main>
    </div>
  );
}
