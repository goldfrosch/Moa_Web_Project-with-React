import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import './MainComponent/HF.css';
import './SubComponent/Sign/signup.css';
import './SubComponent/Notice/Notice.css';
import './SubComponent/CookieClicker/Cookie.css';

import { MenuNotice, Home, Second, Third } from './App.js'
import Header from './MainComponent/Header.js'
import Footer from './MainComponent/Footer.js'
import Signup from './SubComponent/Sign/signup';
import Signin from './SubComponent/Sign/signin';
import Notice_Write from './SubComponent/Notice/Notice_write';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Header />
        <hr width="98%" />
        <Route exact path="/" component={Home} />
        <Route path="/notice" component={MenuNotice} />
        <Route path="/second" component={Second} />
        <Route path="/third" component={Third} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/Noticewrite" component={Notice_Write} />
        <hr width="98%" />
        <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();