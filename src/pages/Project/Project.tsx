import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouteContext } from '@tanstack/react-router';
import { useSmallDevice } from '../../hooks/use-small-device';
import { DesktopGallery } from './DesktopGallery';
import { MobileGallery } from './MobileGallery';

export const Project = () => {
  const getProjectQuery = useRouteContext({
    from: '/_layout/work/$projectSlug',
    select: (context) => context.getProjectQuery,
  });
  const { data: project } = useSuspenseQuery(getProjectQuery);

  const isSmallDevice = useSmallDevice();

  return isSmallDevice ?
      <MobileGallery {...project} />
    : <DesktopGallery {...project} />;
};
