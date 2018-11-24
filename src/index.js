import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

// Learn more about service workers: http://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
