import { FC, MouseEventHandler, useCallback } from 'react';

export const AppErrorBoundaryFallback: FC = () => {
  const handleClickClearStorage = useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
    window.sessionStorage.clear();
    window.localStorage.clear();
    location.reload();
  }, []);

  return (
    <div className="toast toast-center toast-middle">
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <div>
          <h1 className="font-bold text-lg">Something went wrong</h1>
          <p>Reload the page. If the problem persists try <a href="#" onClick={handleClickClearStorage} className="underline">clearing session data</a>.</p>
        </div>
      </div>
    </div>
  );
};
