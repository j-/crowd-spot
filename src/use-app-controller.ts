import { useContext } from 'react';
import { AppStateContext, UseAppController } from './components/AppStateProvider';

export const useAppController: UseAppController = () => {
  const state = useContext(AppStateContext);
  if (!state) throw new Error('App state provider must be mounted');
  return state;
};
