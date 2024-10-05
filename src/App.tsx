import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query.client';
import { Router } from './router/Router';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};
