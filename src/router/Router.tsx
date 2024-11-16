import { useQueryClient } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { SanityInformationRepository } from '../sanity/sanity.information';
import { useInformationService } from '../services/information/information.service';
import { router } from './router.instance';

export const Router = () => {
  const queryClient = useQueryClient();

  const informationRepository = new SanityInformationRepository();
  const informationService = useInformationService(informationRepository);

  return (
    <RouterProvider
      router={router}
      context={{ queryClient, informationService }}
    />
  );
};
