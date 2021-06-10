import React, { Component } from 'react';


const MinecraftAPI = require('minecraft-api');

class Test extends Component{
    onclick = () => {
        MinecraftAPI.uuidForName('GoldFrosch')
        .then(uuid => console.log(uuid))
        .catch(err => console.log(err)) 
    };
    
    render(){
        return(
            <div>
                <button onClick={this.onclick}>가져오기</button>
            </div>
        )
    }
}
export default Test;