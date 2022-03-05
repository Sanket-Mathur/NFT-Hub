import '../styles/globals.css'

import Layout from '../components/Layout'
import store from '../store/store.js'
import {Provider} from 'react-redux'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </Provider>
      
    </div>
  );
}

export default MyApp
