import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Navigation from './ui/Navigation';

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
