import React from 'react';
import { DataTable } from '@commercetools-uikit/data-table';

const rows = [
  { id: 'parasite', title: 'Parasite', country: 'South Korea' },
  { id: 'portrait', title: 'Portrait of a Lady on Fire', country: 'France' },
  { id: 'wat', title: 'Woman at War', country: 'Iceland' },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'country', label: 'Country' },
];

const Example = () => <DataTable rows={rows} columns={columns} />;

export default Example;
