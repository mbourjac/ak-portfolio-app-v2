import { useRef } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouteContext } from '@tanstack/react-router';
import { HomeCover } from './HomeCover';

export const Home = () => {
  const getHomeWorkQuery = useRouteContext({
    from: '/_layout/',
    select: (context) => context.getHomeWorkQuery,
  });
  const {
    data: { projects },
  } = useSuspenseQuery(getHomeWorkQuery);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="h-dvh">
      <div className="relative h-dvh overflow-hidden" ref={containerRef}>
        {projects.map((project) => (
          <HomeCover key={project.id} {...project} />
        ))}
      </div>
    </main>
  );
};
