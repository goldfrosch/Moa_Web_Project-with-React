import React, { Component } from 'react'

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      id: "",
      password: "",
      uuid: "",
      nickname: "",
      status_id: "",
      status_pw: "",
      status_uuid: "",
      status_nn: "",
      islogin: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  btncheckid = () => {
    const {id} = this.state;
    if(id === ''){
      this.setState({
        status_id: "* 아이디를 입력해주세요"
      })
    }
    else if(id.length < 5 || id.length > 16 ){
      this.setState({
        status_id: "* 아이디는 5글자 이상 16글자 이내로 가능합니다"
      })
    }
    else{
      fetch('/api/registercheck_id?id=' + id)
        .then(res => res.json())
        .then(data => this.setState({
            status_id: data.status_id,
          }
        )
      );
    }
  }

  btnregister = () => {
    const {id, password, uuid, nickname} = this.state;
    if (id === '' || password === '' || uuid === '' || nickname === '') {
      if(id === ''){
        this.setState({
          status_id: "* 아이디를 입력해주세요"
        });
      }
      else if(id.length < 5 || id.length > 16){
        this.setState({
          status_id: "* 아이디는 5글자 이상 16글자 이내로 가능합니다"
        })
      }
      
      if(password === ''){
        this.setState({
          status_pw: "* 비밀번호를 입력해주세요"
        });
      }
      if(uuid === ''){
        this.setState({
          status_uuid: "* UUID를 입력해주세요"
        });
      }
      if(nickname === ''){
        this.setState({
          status_nn: "* 닉네임을 입력해주세요"
        });
      }
    }
    else {
      fetch('api/register?id=' + id + '&password=' + password + '&uuid='+ uuid + '&nickname='+ nickname)
          .then(res => res.json())
          .then(data => this.setState({
              status: data.status,
              status_id: data.status_id,
              status_uuid: data.status_uuid
          }
        )
      );
    }
  }

  componentDidMount() {
    if(sessionStorage.getItem('user_id') !== null){
      this.setState({
        islogin: true,
      })
    }
  }
  render() {
    const {status ,status_id, status_pw,status_uuid,status_nn,islogin} = this.state;
    if(islogin){
      return(
        <div className="outer">
          <div className="signin">
            넌 이미 로그인
          </div>
        </div>
      );
      
    }
    else{
      return (
        <div className="outer">
          <div className="signin">
            <h3>해라 너 회원가입</h3>
            아이디<br /> <input name={'id'} placeholder="아이디" onChange={this.handleChange} /><button onClick={this.btncheckid}>중복확인</button><br />
            <p className="caution">{status_id}</p>
            비밀번호<br /> <input type="password" placeholder="비밀번호" name={'password'} onChange={this.handleChange} /><br />
            <p className="caution">{status_pw}</p>
            마인크래프트 UUID<br /> <input name={'uuid'} placeholder="UUID"onChange={this.handleChange} /><br />
            <p className="caution">{status_uuid}</p>
            사용할 닉네임<br /> <input name={'nickname'} placeholder="닉네임" onChange={this.handleChange} /><br />
            <p className="caution">{status_nn}</p>
            <button onClick={this.btnregister}>전송</button>
            <h5>{status}</h5>
          </div>
        </div>
      );
    }
  }
}

// class TestgetExpress extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       id: "",
//       password: "",
//     };
//   }

//   onclick = () => {
//     fetch("http://localhost:5000/api/usergetdata", { 
//       method: "post",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(),
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         console.log(json);
//         this.setState({
//           id: json.id,
//           pw: json.password,
//         });
//       });
//   };

//   render() {
//     return (
//       <div>
//         <h1>데이터 가져오기</h1>
//         <h3>{this.state.id}</h3>
//         <h3>{this.state.pw}</h3>
//         <button onClick={this.onclick}>가져오기</button>
//       </div>
//     );
//   }
// }