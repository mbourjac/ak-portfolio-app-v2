import { createFileRoute } from '@tanstack/react-router';
import { Home } from '../../pages/Home/Home';

export const Route = createFileRoute('/_layout/')({
  component: Home,
  beforeLoad: ({ context: { workService } }) => {
    return {
      getHomeWorkQuery: workService.getHomeWorkQueryOptions(),
    };
  },
  loader: async ({ context: { queryClient, getHomeWorkQuery } }) => {
    await queryClient.ensureQueryData(getHomeWorkQuery);
  },
});
