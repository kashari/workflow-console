import React from 'react';
import WorkflowGraphWebGL from './WorkflowGraphWebGL.jsx';
import { createRoot } from 'react-dom/client';

export default function App() {
  return <WorkflowGraphWebGL />;
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
