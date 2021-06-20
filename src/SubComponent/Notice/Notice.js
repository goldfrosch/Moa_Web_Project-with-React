import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../../MainComponent/loading';


const styles = theme => ({
    root: {
        width: "85%",
        marginTop: "5%",
        overflowX: "auto",
        margin: '0 7.5%',
    },
    table: {
        minWidth: 360
    }
});

class Noticelist extends Component{
    render(){
        return(
            <TableRow>
                <TableCell align="center" style={{ width: 100 }}>{this.props.id}</TableCell>
                <TableCell align="center" style={{ width: 800 }}><Link to ={`/notice_info/${this.props.id}`}>{this.props.title}</Link></TableCell>
                <TableCell align="center" style={{ width: 300 }}><img src={this.props.uuid} width='20vh' alt="프로필사진"/> ({this.props.nickname})</TableCell>
                <TableCell align="center" style={{ width: 400 }}>{this.props.time}</TableCell>
                <TableCell align="center" style={{ width: 80 }}>{this.props.views}</TableCell>
            </TableRow>
        )
    }
}

class Notice extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notice_list: '',
            user_perm: 0,
        };
    }

    //비동기적으로 API 요청 기능을 수행하기 위한 async - await 구문
    componentDidMount() {
        this.callApi()
        .then(res => {
            this.setState({notice_list: res})
        })
        .catch(err => console.log(err));

        this.resPerm()
        .then(res => {
            this.setState(
                {
                    user_perm: res[0].permission_number
                }
            )
        })
        .catch(err => console.log(err));
    }
    
    callApi = async () => {
        const response = await fetch('/api/notice_list');
        const body = await response.json();
        return body;
    }

    resPerm = async () => {
        const response = await fetch('/api/perm_check?&id=' + sessionStorage.getItem('user_id'));
        const body = await response.json();
        return body;
    }

    render(){
        //style 적용 classes
        const { classes } = this.props;
        const { user_perm } = this.state
        var image_link = "https://mc-heads.net/avatar/";
        return(
            <div className="Notice">
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ width: 100 }}>번호</TableCell>
                                <TableCell align="center" style={{ width: 800 }}>제목</TableCell>
                                <TableCell align="center" style={{ width: 300 }}>작성자</TableCell>
                                <TableCell align="center" style={{ width: 400 }}>작성시간</TableCell>
                                <TableCell align="center" style={{ width: 80 }}>조회수</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.notice_list ? this.state.notice_list.map(nlist => {
                                return <Noticelist id={nlist.id} title={nlist.title} uuid={image_link + nlist.uuid} nickname={nlist.nickname} time={nlist.writetime} views={nlist.views} key={nlist.id}/>
                            })
                            :
                            <TableRow>
                                <TableCell colSpan="6" align="center">
                                    <Loading />
                                </TableCell>
                            </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <div className="Notice_Button">
                    {(user_perm > 1) ? <Link to={'/Noticewrite'}>
                        <img src="/image/Logo.png" alt="" className="Notice_Button"/>
                    </Link> : ""}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Notice)