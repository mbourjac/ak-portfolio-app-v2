import { createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '../layouts/AppLayout';

export const Route = createFileRoute('/_layout')({
  component: AppLayout,
});
