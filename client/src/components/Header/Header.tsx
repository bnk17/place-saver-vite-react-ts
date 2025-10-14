import clsx from 'clsx';
import { Link, useLocation } from 'react-router';

export const AppHeader = () => {
  const location = useLocation();
  const url = location.pathname as '/places';
  const isPlacesLinkActive = url === '/places';

  return (
    <header className="sticky top-0 flex items-center justify-between">
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
            !isPlacesLinkActive &&
              'rounded-full border-1 border-gray-300 bg-gray-100 font-medium'
          )}
        >
          Todos
        </Link>
        <Link
          to="/places"
          className={clsx(
            'px-2 py-1',
            isPlacesLinkActive &&
              'rounded-full border-1 border-gray-300 bg-gray-100 font-medium'
          )}
        >
          Places
        </Link>
      </nav>
    </header>
  );
};
