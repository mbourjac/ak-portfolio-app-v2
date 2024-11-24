import { formatText } from '../../helpers/format-text';
import type { Project } from '../../services/project/project.types';

type MobileGalleryProps = Project;

export const MobileGallery = ({
  gallery,
  title,
  date,
  medium,
  description,
}: MobileGalleryProps) => {
  return (
    <main className="flex flex-col gap-8 p-6 pt-[9rem]">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 text-xs uppercase">
            <p>Year | {date}</p>
            <p>Medium | {medium}</p>
          </div>
        </div>
      </div>
      {gallery.map(({ type, filename, mobileUrl }, index) => (
        <div key={index}>
          {
            type === 'image' ?
              <img src={mobileUrl} alt="" />
              // eslint-disable-next-line jsx-a11y/media-has-caption
            : <video controls className="h-full">
                <source src={`/${filename}`} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>

          }
        </div>
      ))}
      <div className="pt-8">{formatText(description)}</div>
    </main>
  );
};
