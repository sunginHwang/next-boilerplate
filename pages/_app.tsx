import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';

import store from '../store';
import '../styles/globals.css';

const client = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
