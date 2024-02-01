import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <App />
        </PersistGate>
    </Provider>
);
