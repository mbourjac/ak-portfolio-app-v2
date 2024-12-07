import { useRouteTransition } from '../../hooks/use-route-transition';
import { useSmallDevice } from '../../hooks/use-small-device';
import { cn } from '../../lib/tailwind.utils';
import type { DefinedRoute } from '../../router/router.types';
import { DesktopHeaderLogo } from './DesktopHeaderLogo';
import { MobileHeaderLogo } from './MobileHeaderLogo';

type HeaderProps = {
  isReducedLogo: boolean;
  toggleAboutModal: () => void;
};

export const Header = ({ isReducedLogo, toggleAboutModal }: HeaderProps) => {
  const isSmallDevice = useSmallDevice();
  const { handleNavigate, pathname } = useRouteTransition();

  const links: { label: string; to: DefinedRoute }[] = [
    { label: 'Gallery', to: '/' },
    { label: 'Work', to: '/work' },
  ];

  return (
    <header
      className={cn(
        'flex flex-col items-center justify-between pt-12 md:gap-4 md:pt-16',
        (isReducedLogo || isSmallDevice) && 'flex-row',
      )}
    >
      <div
        className={cn(
          'pointer-events-none order-last w-full',
          (isReducedLogo || isSmallDevice) &&
            'relative order-first flex h-4 items-center',
        )}
      >
        {isSmallDevice ?
          <MobileHeaderLogo />
        : <DesktopHeaderLogo
            className={cn(
              isReducedLogo && 'absolute w-[30rem] lg:w-[40rem] xl:w-[50rem]',
            )}
          />
        }
      </div>
      <nav className="self-end px-6 md:px-12">
        <ul className="flex gap-4 uppercase leading-none">
          {links.map(({ label, to }) => (
            <li key={label}>
              <a
                href={to}
                onClick={(event) => handleNavigate(event, { to })}
                className="pointer-events-auto"
                aria-current={pathname === to ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={toggleAboutModal}
              className="pointer-events-auto uppercase"
            >
              About
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
