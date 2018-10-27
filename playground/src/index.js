import React from 'react';
import ReactDOM from 'react-dom';
import Playground from './playground';

const node = document.createElement('div');
node.id = 'app';
document.body.appendChild(node);

ReactDOM.render(<Playground />, node);
