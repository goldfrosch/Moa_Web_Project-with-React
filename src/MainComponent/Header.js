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
                        <li><Link to={'/second'}>업데이트</Link></li>
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
                        <li>메뉴 4-1</li>
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
        {sessionStorage.getItem('user_id') !== null ? <LogoutForm /> : <LoginForm />}
      </header>
    );
  }
}

class LoginForm extends Component {
  render(){
    return(
      <div className="App-header-sign">
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
    };
  }

  logout = () => {
    sessionStorage.removeItem('user_id');
    document.location.href = '/';
  }

  // componentDidMount() {
  //   this.callApi()
  //   .then(res => this.setState({userinfo: res}))
  //   .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const id = sessionStorage.getItem('user_id');
  //   const response = await fetch('/api/userinfo?id=' + id);
  //   const body = await response.json();
  //   return body;
  // }

  render(){
    console.log(this.state.userinfo);
    //var image_link = "https://mc-heads.net/avatar/";
    return(
      <div className="App-header-sign">
        <p>님 환영합니다</p>
        <div className="App-header-signup">
            <p className="App-header-signout">Info</p>
        </div>
        <div className="App-header-signin">
            <p onClick={this.logout} className="App-header-signout">Sign Out</p>
        </div>
      </div>
    )
  }
}

export default Header;