import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './styles/reboot'

const Root = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/weapons">Weapons</Link>
        </li>
      </ul>
      <Route path="/weapons/:type?/:id?" component={App} />
    </div>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
