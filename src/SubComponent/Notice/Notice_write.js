import React, { useState } from 'react';

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

function NoticeWrite(){
    const titlelimit = (value) => value.length <= 32;
    const name = useInput("", titlelimit);

    const contextlimit = (value) => value.length <= 2000;
    const context = useInput("",contextlimit)

    const noticeAccept = () => {
        if(name.value.length === 0){
            alert("글의 제목을 입력해주세요");
        }
        else if(context.value.length === 0){
            alert("글의 내용을 입력해주세요");
        }
        else {
            fetch('api/notice-upload?title=' + name.value + '&content=' + context.value + '&id=' + sessionStorage.getItem('user_id'))
            .then(document.location.href = '/notice')
            .catch(error => console.error('Error:', error))
        }
    }
    
    if(sessionStorage.getItem('user_id') === null){
        document.location.href="/signin"
    }
    else{
        return(
            <div>
                <div>
                    글 제목: <br />
                    <input name="title" className="Notice_Title" {...name}/>
                </div>
                <div>
                    <br />글 내용:<br />
                    <textarea name="content" className="Notice_Textarea" {...context}/><br />
                    글씨 제한: {context.value.length} / 2000
                </div>
                <div>
                    <button onClick={noticeAccept}>작성 완료</button>
                </div>
            </div>
        )
    }
    
}

export default NoticeWrite