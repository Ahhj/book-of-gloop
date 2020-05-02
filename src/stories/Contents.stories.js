import React from 'react';
// import { action } from '@storybook/addon-actions';

import Contents from '../components/Contents';

export default {
  component: Contents,
  title: 'Contents',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const cData = {
  items: [
    {
      name: 'Sloppy slop',
      quantity: '10 pints',
      updatedAt: new Date(2018, 0, 1, 9, 0),
    },
    {
      name: 'Gloopy gloop',
      quantity: 'Loadz',
      updatedAt: new Date(2018, 0, 1, 9, 0),
    }
  ]
};

export const Default = () => <Contents {...cData}/>;
