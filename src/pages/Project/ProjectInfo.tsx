import { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon } from '../../components/ArrowDownIcon';
import { useModalContext } from '../../context/ModalContext/ModalContext.hook';
import { formatText } from '../../helpers/format-text';
import { useElementSize } from '../../hooks/use-element-size';
import { cn } from '../../lib/tailwind.utils';

type ProjectInfoProps = {
  title: string;
  date: string;
  medium: string;
  description: string;
};

export const ProjectInfo = ({
  title,
  date,
  medium,
  description,
}: ProjectInfoProps) => {
  const { isOpen: isAboutModalOpen } = useModalContext();

  const infoRef = useRef(null);
  const { height: infoHeight } = useElementSize(infoRef);

  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  useEffect(() => {
    if (!isAboutModalOpen) return;
    setIsInfoExpanded(false);
  }, [isAboutModalOpen]);

  return (
    <div className="absolute left-12 top-[15.5rem] z-30">
      <div
        className={cn(
          'fixed -mx-4 w-64 overflow-hidden bg-secondary/75 backdrop-blur-md',
          isInfoExpanded && 'w-[30.75rem]',
        )}
      >
        <div className="flex flex-col gap-4 p-4" ref={infoRef}>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 text-xs uppercase">
              <p>Year | {date}</p>
              <p>Medium | {medium}</p>
            </div>
            {!isInfoExpanded && (
              <button onClick={() => setIsInfoExpanded(true)}>
                <ArrowDownIcon />
              </button>
            )}
          </div>
        </div>
        {isInfoExpanded && (
          <div
            className="flex flex-col gap-4 overflow-auto p-4"
            style={{
              maxHeight: `calc(100vh - 152px - 192px - ${String(infoHeight)}px)`,
            }}
          >
            <div>{formatText(description)}</div>
            <button
              onClick={() => setIsInfoExpanded(false)}
              className="w-fit text-xs uppercase"
            >
              X Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
