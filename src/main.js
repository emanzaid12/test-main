import React from "react";
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import store from "./redux/store.js";
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
