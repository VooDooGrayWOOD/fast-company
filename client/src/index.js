import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './app/App'
import { createStore } from './app/store/createStore'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './app/utils/history'

const store = createStore()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
