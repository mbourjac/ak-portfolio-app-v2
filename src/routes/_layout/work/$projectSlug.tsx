import { createFileRoute } from '@tanstack/react-router';
import { Project } from '../../../pages/Project';

export const Route = createFileRoute('/_layout/work/$projectSlug')({
  component: Project,
});
