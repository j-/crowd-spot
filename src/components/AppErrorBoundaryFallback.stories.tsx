import type { Meta } from '@storybook/react';

import { AppErrorBoundaryFallback } from './AppErrorBoundaryFallback';

const meta: Meta<typeof AppErrorBoundaryFallback> = {
  component: AppErrorBoundaryFallback,
};

export default meta;

export const Primary = () => <AppErrorBoundaryFallback />;
