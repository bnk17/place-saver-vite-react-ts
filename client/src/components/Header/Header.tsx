import clsx from 'clsx';
import { Link, useLocation } from 'react-router';

export const AppHeader = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white py-2">
      <Link to="/" className="hover:underline">
        <h1 className="w-full text-[22px] font-semibold text-zinc-900">
          Rmnd.
        </h1>
      </Link>
      <nav className="space-x-2">
        <Link
          to="/todos"
          className={clsx(
            'px-2 py-1',
            location.pathname === '/todos' &&
              'rounded-full bg-violet-100 font-medium text-violet-700'
          )}
        >
          Todos
        </Link>
        <Link
          to="/places"
          className={clsx(
            'px-2 py-1',
            location.pathname === '/places' &&
              'rounded-full bg-amber-100 font-medium text-amber-600'
          )}
        >
          Places
        </Link>
      </nav>
    </header>
  );
};
