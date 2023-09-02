'use client';

import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import { AppErrorBoundaryFallback } from './AppErrorBoundaryFallback';

const AppWithErrorBoundary: FC = () => (
  <ErrorBoundary fallback={<AppErrorBoundaryFallback />}>
    <App />
  </ErrorBoundary>
);

export default AppWithErrorBoundary;
