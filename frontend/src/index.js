import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'emotion';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './containers/App';
import rootReducer from './modules/root';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Open Sans', sans-serif;
    min-height: 100%;
    margin: 0;
    padding: 0; 
  }
`

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>              
    <App />
  </Provider>, 
  document.getElementById('root')
);

if (module.hot) {                                       
  module.hot.accept('./containers/App', () => {                    
     const NextApp = require('./containers/App').default;
     ReactDOM.render(
        <Provider store={store}><NextApp /></Provider>,
        document.getElementById('root')
     );
  });

  module.hot.accept('./modules/root', () => {                  
    const nextRootReducer = require('./modules/root').default;
    store.replaceReducer(nextRootReducer);             
  });
}

registerServiceWorker();
