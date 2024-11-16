import { useEffect } from 'react';
import { formatText } from '../../helpers/format-text';
import type { Information } from '../../services/information/information.types';

type AboutModalProps = Information & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const AboutModal = ({
  bio,
  email,
  instagram,
  copyright,
  isOpen,
  setIsOpen,
}: AboutModalProps) => {
  useEffect(() => {
    const { body } = document;

    body.style.overflow = isOpen ? 'hidden' : 'auto';
    body.style.height = isOpen ? '100vh' : 'auto';

    return () => {
      body.style.overflow = 'auto';
      body.style.height = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="pointer-events-auto grid h-60 grid-cols-2 gap-32 overflow-hidden px-12 font-secondary text-sm">
      <div className="overflow-y-auto py-4">{formatText(bio)}</div>
      <div className="flex justify-between uppercase">
        <div className="flex gap-20">
          <div className="self-end py-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p>Mail</p>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div className="flex flex-col gap-1">
                <p>IG</p>
                <a
                  href={instagram.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {instagram.label}
                </a>
              </div>
            </div>
          </div>
          <p className="self-end py-4">{copyright}</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="self-end justify-self-end py-4 uppercase"
        >
          X Close
        </button>
      </div>
    </div>
  );
};
