import React, { useEffect, useState } from 'react';
import useInterval from './useInterval';
// import useAxios from '../../useAxois';

const CheatInput = (init, v) => {
    const [value, setValue] = useState(init);
    const onChange = (e) => {
        let willUpdate = true;
        //v의 검증하는 컴포넌트가 함수일 때
        if(typeof v === "function"){
            willUpdate = v(e.target.value);
        }
        if(willUpdate){
            setValue(e.target.value);
        }
    }
    return { value,onChange };
}

function CookieClicker() {
    const [bonusClickCookie,setbonusClickCookie] = useState(1);
    const [bonusTimeCookie,setbonusTimeCookie] = useState(1);
    const [bonusTime,setbonusTime] = useState(10000);
    const [cookie,setCookie] = useState(0);

    const buyItem_bonuscookie = (e) => {
        if(cookie - e.target.value < 0){
            setCookie(cookie);
        }
        else{
            setCookie(cookie - e.target.value);
            setbonusClickCookie(bonusClickCookie + 1);
        }
    }
    
    
    const buyItem_bonustime = (e) => {
        if(cookie - e.target.value < 0){
            setCookie(cookie);
        }
        else if (bonusTime > 1000){
            setCookie(cookie - e.target.value);
            setbonusTime(bonusTime - 900);
        }
        else {
            console.log("허접아 그만 사");
        }
    }

    const buyItem_timecookie = (e) => {
        if(cookie - e.target.value < 0){
            setCookie(cookie);
        }
        else{
            setCookie(cookie - e.target.value);
            setbonusTimeCookie(bonusTimeCookie + 1);
        }
    }

    useInterval(() => {
        setCookie(cookie + bonusTimeCookie);
    }, bonusTime);
    
    const maxLen = (value) => value.length <= 10;//value.includes("1");
    const name = CheatInput("",maxLen);
    
    return(
        <div>
            <div className="CookieClicker_Main">
                <img src="image/cookie.png" className="CookieClicker_Main_Cookie" onClick={() => setCookie(cookie + bonusClickCookie)} alt="쿠키" />
            </div>
            <div>
                <p className="CookieClicker_p">Click per Cookies: {bonusClickCookie}개</p>
                <p className="CookieClicker_p">Time per Cookies: {bonusTimeCookie}개</p>
                <p className="CookieClicker_p">Cookies per Time: {bonusTime/1000}초</p>
            </div>
            <div>
                <button value="6" onClick={buyItem_bonuscookie}>쿠키 생성량 (가격:)</button><br />
                <button value="10" onClick={buyItem_timecookie}>쿠키 시급 증가 (가격:)</button><br />
                <button value="10" onClick={buyItem_bonustime}>쿠키 지급 시간 감소 (가격:)</button><br />
                <h5>현재 쿠키갯수: {cookie}</h5>
                <input placeholder="치트쿠키" {...name}/>
            </div>
        </div>
    )
}

export default CookieClicker;