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
          <div className="App-header-signup">
            <Link to={'/signup'}>
              Signup
            </Link>
          </div>
          <div className="App-header-signin">
            <Link to={'/signin'}>
              Signin
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;