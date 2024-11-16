import { createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '../layouts/AppLayout/AppLayout';

export const Route = createFileRoute('/_layout')({
  component: AppLayout,
  beforeLoad: ({ context: { informationService } }) => {
    return {
      getInformationQuery: informationService.getInformationQueryOptions(),
    };
  },
  loader: async ({ context: { queryClient, getInformationQuery } }) => {
    await queryClient.ensureQueryData(getInformationQuery);
  },
});
