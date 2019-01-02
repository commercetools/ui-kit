import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const node = document.createElement('div');
node.id = 'app';
document.body.appendChild(node);

ReactDOM.render(<App />, node);
