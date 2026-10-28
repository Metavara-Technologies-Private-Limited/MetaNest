import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function AppProviders({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}

export default AppProviders;
