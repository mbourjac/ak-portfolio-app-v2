import { Link } from '@tanstack/react-router';
import type { WorkProject } from '../../services/work/work.types';

type MobileProjectsProps = {
  projects: WorkProject[];
};

export const MobileProjects = ({ projects }: MobileProjectsProps) => {
  return (
    <main className="flex flex-col gap-4 p-6 pt-[9rem]">
      {projects.map(({ id, slug, title, cover: { mobileUrl } }) => (
        <Link
          key={id}
          to="/work/$projectSlug"
          params={{ projectSlug: slug }}
          className="flex flex-col gap-1"
        >
          <h2>{title}</h2>
          <img src={mobileUrl} alt={title} />
        </Link>
      ))}
    </main>
  );
};
