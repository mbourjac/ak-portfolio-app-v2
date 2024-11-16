import { Link, Outlet, useLocation } from '@tanstack/react-router';
import { cn } from '../../lib/tailwind.utils';
import { HeaderLogo } from './HeaderLogo';

export const AppLayout = () => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const isReducedLogo = pathname.includes('work');

  return (
    <>
      <div className="fixed z-50 flex w-full flex-col gap-8">
        <header
          className={cn(
            'flex flex-col items-center justify-between gap-8 pt-16',
            isReducedLogo && 'flex-row',
          )}
        >
          <div
            className={cn(
              'pointer-events-none order-last w-full',
              isReducedLogo && 'relative order-first flex h-6 items-center',
            )}
          >
            <HeaderLogo className={cn(isReducedLogo && 'absolute w-[50rem]')} />
          </div>
          <nav className="self-end px-12">
            <ul className="flex gap-4 font-secondary uppercase">
              <li>
                <Link to="/">Gallery</Link>
              </li>
              <li>
                <Link to="/work">Work</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Outlet />
    </>
  );
};
