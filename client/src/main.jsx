import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import { BrowserRouter, } from 'react-router';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
     <Toaster position="top-right" reverseOrder={false} />
     <App/>
    </BrowserRouter>
   </Provider>
);