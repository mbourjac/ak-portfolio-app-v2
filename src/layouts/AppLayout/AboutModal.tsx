import { useEffect } from 'react';
import { motion } from 'motion/react';
import { formatText } from '../../helpers/format-text';
import { useSmallDevice } from '../../hooks/use-small-device';
import type { Information } from '../../services/information/information.types';
import { DesktopLogo } from './DesktopLogo';

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
  const isSmallDevice = useSmallDevice();

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
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: '0%' }}
      exit={{
        y: '-100%',
      }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0, 1] }}
      className="pointer-events-auto fixed top-0 z-40 h-dvh bg-secondary/75 pt-24 backdrop-blur-md md:h-auto"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        }}
        exit={{ opacity: 0 }}
        transition={{ ease: [0.39, 0.24, 0.3, 1] }}
        className="flex h-[calc(100vh-96px)] flex-col gap-8 md:h-auto"
      >
        {!isSmallDevice && <DesktopLogo />}
        <div className="grid gap-8 overflow-hidden text-sm md:h-60 md:grid-cols-2 md:gap-0 xl:gap-32">
          <div className="overflow-y-auto px-6 py-4 md:px-12">
            {formatText(bio)}
          </div>
          <div className="flex justify-between px-6 uppercase md:px-12">
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
                  <p className="2xl:hidden">{copyright}</p>
                </div>
              </div>
              <p className="hidden self-end py-4 2xl:block">{copyright}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="self-end justify-self-end py-4 uppercase"
            >
              X Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
