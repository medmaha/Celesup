import React from 'react';
import ReactDOM from 'react-dom/client';
import './cssStyles/index.css';
import App from './App';   
import'./cssStyles/supcel-CSS/supcel'


const root = ReactDOM.createRoot(document.getElementById('root'));

if (window.screen.width < 480){
  alert('checkout our mobile')
}

root.render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (localStorage.getItem('theme')){
  let theme = localStorage.getItem('theme')
  document.body.classList.add(theme)
}else{
  localStorage.setItem('theme', 'light-mode')
  document.body.classList.add('light-mode')
}

