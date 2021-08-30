import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import PointMass from './PointMass';

const Example = () => {

  const containerEl = useRef();

  useEffect(() => {
    let mass = new PointMass();
    
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl}></div>
  )
}

render(<Example/>,
  document.getElementById('root')
);

