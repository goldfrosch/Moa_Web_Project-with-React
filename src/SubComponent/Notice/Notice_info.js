import React, { Component } from 'react';

class NoticeRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice_info: '',
        };
    }
    
    componentDidMount() {
        this.callApi()
        .then(res => {
            this.setState({notice_info: res})
        })
        .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/notice-info');
        const body = await response.json();
        return body;
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}

export default NoticeRead;