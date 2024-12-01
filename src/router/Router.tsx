import { useQueryClient } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { SanityInformationRepository } from '../sanity/sanity.information';
import { SanityProjectRepository } from '../sanity/sanity.project';
import { SanitySeoRepository } from '../sanity/sanity.seo';
import { SanityWorkRepository } from '../sanity/sanity.work';
import { useInformationService } from '../services/information/information.service';
import { useProjectService } from '../services/project/project.service';
import { useSeoService } from '../services/seo/seo.service';
import { useWorkService } from '../services/work/work.service';
import { router } from './router.instance';

export const Router = () => {
  const queryClient = useQueryClient();

  const informationRepository = new SanityInformationRepository();
  const informationService = useInformationService(informationRepository);

  const workRepository = new SanityWorkRepository();
  const workService = useWorkService(workRepository);

  const projectRepository = new SanityProjectRepository();
  const projectService = useProjectService(projectRepository);

  const seoRepository = new SanitySeoRepository();
  const seoService = useSeoService(seoRepository);

  return (
    <RouterProvider
      router={router}
      context={{
        queryClient,
        informationService,
        workService,
        projectService,
        seoService,
      }}
    />
  );
};
