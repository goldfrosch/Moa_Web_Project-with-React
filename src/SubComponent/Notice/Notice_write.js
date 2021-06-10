import React, { Component,useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: "85%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto",
        margin: '0 7.5%',
    }
});
//useInput의 공식같은 느낌
const useInput = (i,v) => {
    const [value,setValue] = useState(i);
    const onChange = (e) => {
        const{
            target: { value }
        } = e;
        let willupdate = true;
        if(typeof v === "function") {
            willupdate = v(value);
        }
        if(willupdate){
            setValue(value);
        }
    }
    return { value,onChange };
}

const NoticeInput = () => {
    const keylimit = (value) => value.length <= 32;
    const name = useInput("", keylimit);
    return (
        <div>
            <input name="title" className="Notice_Title" {...name}/>
        </div>
    )
}

class Notice_Write extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            content: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    
    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
                <div>
                    글 제목:<br />
                    <NoticeInput />
                </div>
                <div>
                    <br />글 내용:<br />
                   <textarea name="content" className="Notice_Textarea" onChange={this.handleChange}/> 
                </div>
                <div>
                    <button>작성 완료</button>
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(Notice_Write)