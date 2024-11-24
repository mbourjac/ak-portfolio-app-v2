import { Link } from '@tanstack/react-router';
import { useSmallDevice } from '../../hooks/use-small-device';
import { cn } from '../../lib/tailwind.utils';
import { DesktopHeaderLogo } from './DesktopHeaderLogo';
import { MobileHeaderLogo } from './MobileHeaderLogo';
``;

type HeaderProps = {
  isReducedLogo: boolean;
  toggleAboutModal: () => void;
};

export const Header = ({ isReducedLogo, toggleAboutModal }: HeaderProps) => {
  const isSmallDevice = useSmallDevice();

  return (
    <header
      className={cn(
        'flex flex-col items-center justify-between pt-12 md:pt-16',
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
        <ul className="flex gap-4 font-secondary uppercase leading-none">
          <li>
            <Link to="/" className="pointer-events-auto">
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/work" className="pointer-events-auto">
              Work
            </Link>
          </li>
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
