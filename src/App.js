import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Mainpage from './MainComponent/Mainpage.js'
import CookieClicker from './SubComponent/CookieClicker/clicker.js'
import Notice from './SubComponent/Notice/Notice.js'

export class Home extends Component {
  render() {
    return (
      <Mainpage />
    )
  }
} 

export class MenuNotice extends Component {
  render() {
    return (
      <Notice />
    )
  }
}

export class Second extends Component {
  render() {
    return (
      <div>
          <CookieClicker />
      </div>
    )
  }
}

export class Third extends Component {
  render() {
    return (
      <div>
        <Link to={`${this.props.match.url}/1`} style={{ marginRight: '5px' }}>
          1번
        </Link>
        <Link to={`${this.props.match.url}/2`}>2번</Link>
        <Route exact path={this.props.match.url}
          render={() => (
            <div>
              <h3>id를 선택해 주세요.</h3>
            </div>
          )}
        />
        <Route path={`${this.props.match.url}/:id`} component={Item} />
      </div>
    )
  }
}

class Item extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.match.params.id}</h3>
      </div>
    )
  }
}