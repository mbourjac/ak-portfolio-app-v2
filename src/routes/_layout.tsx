import { createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '../layouts/AppLayout/AppLayout';

export const Route = createFileRoute('/_layout')({
  component: AppLayout,
  beforeLoad: ({ context: { informationService, seoService } }) => {
    return {
      getInformationQuery: informationService.getInformationQueryOptions(),
      getSeoQuery: seoService.getSeoQueryOptions(),
    };
  },
  loader: async ({
    context: { queryClient, getInformationQuery, getSeoQuery },
  }) => {
    await queryClient.ensureQueryData(getInformationQuery);
    await queryClient.ensureQueryData(getSeoQuery);
  },
});
