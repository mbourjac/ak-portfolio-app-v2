import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouteContext } from '@tanstack/react-router';
import { useSmallDevice } from '../../hooks/use-small-device';
import { DesktopProjects } from './DesktopProjects';
import { MobileProjects } from './MobileProjects';
export const Work = () => {
  const getWorkQuery = useRouteContext({
    from: '/_layout/work/',
    select: (context) => context.getWorkQuery,
  });
  const {
    data: { projects },
  } = useSuspenseQuery(getWorkQuery);
  const isSmallDevice = useSmallDevice();
  return isSmallDevice ?
      <MobileProjects projects={projects} />
    : <DesktopProjects projects={projects} />;
};
