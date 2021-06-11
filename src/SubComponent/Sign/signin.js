import React, { Component } from 'react';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id: "",
          password: "",
          status_id: "",
          status_pw: "",
          status: false,
          status_message: "",
        };
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    btnlogin = () => {
        const {id, password} = this.state;
        if(id === ''){
            if(password !== ''){
                this.setState({
                    status_pw: ""
                });
            }
            this.setState({
                status_id: "* 아이디를 입력해주세요"
            });
        }
        else if(password === ''){
            this.setState({
                status_id: "",
                status_pw: "* 비밀번호를 입력해주세요"
            });
        }
        else {
            fetch('api/login?id=' + id + '&password=' + password)
            .then(data => {
                    this.setState(
                        {
                            status_id: "",
                            status_pw: "",
                            status: data.status,
                            status_message: data.status_message,
                        }
                    )
                    if(data.status){
                        sessionStorage.setItem('user_id',id);
                        document.location.href = '/';
                    }
                }
            )
        }
    }

    render() {
        const {status_id, status_pw, status_message, status} = this.state;
        if(sessionStorage.getItem('user_id') === null){
            return (
                <div className="outer">
                    <div className="signin">
                    <h3>해라 너 로그인</h3>
                    아이디<br /> <input name={'id'} placeholder="아이디" onChange={this.handleChange} />
                    <p className="caution">{status_id}</p>
                    비밀번호<br /> <input type="password" placeholder="비밀번호" name={'password'} onChange={this.handleChange} /><br />
                    <p className="caution">{status_pw}</p>
                    <button onClick={this.btnlogin}>로그인</button>
                    <p className="caution">{status_message}</p>
                    <p className="caution">{status}</p>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="outer">
                    <div className="signin">
                        당신은 이미 로그인
                    </div>
                </div>
            );
        }
        
    }
}

export default Signin;