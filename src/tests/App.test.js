import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App';

/* eslint-disable-next-line no-undef */
it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
