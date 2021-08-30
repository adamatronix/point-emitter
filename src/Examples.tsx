import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import Solitaire from './Solitaire';

const Example = () => {

  const containerEl = useRef();

  useEffect(() => {
    let demo = new Solitaire();

  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl}></div>
  )
}

render(<Example/>,
  document.getElementById('root')
);

