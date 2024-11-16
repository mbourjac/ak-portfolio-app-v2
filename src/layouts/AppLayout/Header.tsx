import { Link } from '@tanstack/react-router';
import { cn } from '../../lib/tailwind.utils';
import { HeaderLogo } from './HeaderLogo';

type HeaderProps = {
  isReducedLogo: boolean;
  toggleAboutModal: () => void;
};

export const Header = ({ isReducedLogo, toggleAboutModal }: HeaderProps) => {
  return (
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
