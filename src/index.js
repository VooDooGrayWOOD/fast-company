import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import reportWebVitals from './reportWebVitals'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
)

reportWebVitals()
