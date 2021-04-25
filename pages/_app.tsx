import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query'
import initStore from '../store';
import '../styles/globals.css'

const store = initStore();
const client = new QueryClient();
function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store} >
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp
