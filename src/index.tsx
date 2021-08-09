import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';



// import CssHooksApp from './apps/CssHooksApp';
// import CssConfigApp from './apps/CssConfigApp';
// import NodestrapApp from './apps/NodestrapApp';
// import ColorApp from './apps/ColorApp';
import TypoApp from './apps/TypoApp';



ReactDOM.render(
  // <React.StrictMode>
  // </React.StrictMode>
    <TypoApp />
  ,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
