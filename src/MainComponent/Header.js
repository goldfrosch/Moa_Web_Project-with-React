import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Hovermenu extends Component{
  render(){
      return(
          <div>
              <ul className="myMenu"> 
                  <li className="menu1">
                      새소식
                      <ul className="menu1_s submenu">
                        <li><Link to={'/notice'}>공지사항</Link></li>
                        <li>업데이트</li>
                        <li><Link to={'/third'}>이벤트</Link></li>
                      </ul>   
                  </li>
                  <li className="menu2">
                      튜토리얼
                      <ul className="menu2_s submenu">
                        <li>메뉴 2-1</li>
                        <li>메뉴 2-2</li>
                        <li>메뉴 2-3</li>
                      </ul>
                  </li>
                  <li className="menu3">
                      커뮤니티
                      <ul className="menu3_s submenu">
                        <li>자유게시판</li>
                        <li>메뉴 3-2</li>
                        <li>메뉴 3-3</li>
                      </ul>   
                  </li>
                  <li className="testMenu">
                      테스트
                      <ul className="testMenu_s submenu">
                        <li><Link to={'/cookiecliker'}>Cookie Clicker</Link></li>
                        <li>메뉴 4-2</li>
                        <li>메뉴 4-3</li>
                      </ul>   
                  </li>
                  <li className="adminMenu">
                      관리
                      <ul className="adminMenu_s submenu">
                        <li>메뉴 5-1</li>
                        <li>메뉴 5-2</li>
                        <li>메뉴 5-3</li>
                      </ul>   
                  </li> 
                  
              </ul>
          </div>
      );
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
    };
  }
  
  render(){
    return (
      <header className="App-header">
        <div className="App-header_logo">
          <Link to={'/'}>
            <img src="/image/Logo.png" className="App-logo" alt=""/>
          </Link>
        </div>
        <div className="App-header_list">
          <Hovermenu />
        </div>
        <div className="App-header-sign">
          {sessionStorage.getItem('user_id') !== null ? <LogoutForm /> : <LoginForm />}
        </div>
      </header>
    );
  }
}

class LoginForm extends Component {
  render(){
    return(
      <div>
        <div className="App-header-signup">
          <Link to={'/signup'}>
            Sign Up
          </Link>
        </div>
        <div className="App-header-signin">
          <Link to={'/signin'}>
            Sign In
          </Link>
        </div>
      </div>
    )
  }
}

class LogoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
      userinfo: '',
      nickname: '',
    };
  }

  logout = () => {
    sessionStorage.removeItem('user_id');
    document.location.href = '/';
  }

  componentDidMount() {
    this.callApi()
    .then(res => this.setState(
      {
        nickname: res[0].nickname,
        userinfo: res,
      }
    ))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const id = sessionStorage.getItem('user_id');
    const response = await fetch('/api/userinfo?id=' + id);
    const body = await response.json();
    return body;
  }

  render(){
    return(
      <div>
        <div className="App-header-signup">
            <p className="App-header-nick">{this.state.nickname}</p>
            <p className="App-header-nick">|</p>
            <p className="App-header-signout">Info</p>
            <p className="App-header-nick">|</p>
            <p className="App-header-signout" onClick={this.logout}>Sign Out</p>
        </div>
      </div>
    )
  }
}

export default Header;