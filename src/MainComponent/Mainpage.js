import React,{ Component } from 'react';

const Mainpage_file = [
    {
        id: 0,
        title: "title1",
        img: "image/exam3.png",
        desc: "hey you! it is example1",
        link: "https://www.naver.com"
    },
    {
        id: 1,
        title: "title2",
        img: "image/exam3.png",
        desc: "hey you! it is example2",
        link: "https://www.google.com"
    },
    {
        id: 2,
        title: "title3",
        img: "image/exam3.png",
        desc: "hey you! it is example3",
        link: "https://www.youtube.com"
    },
    {
        id: 3,
        title: "title4",
        img: "image/exam3.png",
        desc: "hey you! it is example4",
        link: "https://www.daum.net"
    }
]

class Mainpage extends Component {
    render(){
        return(
            <div className="App-main_site">
                {Mainpage_file.map((lobby_file,id_code) =>{
                    return <MainpageExport title={lobby_file.title} img={lobby_file.img} desc={lobby_file.desc} link={lobby_file.link} key={id_code}/>
                })}
            </div>
        )
    }
}
  
class MainpageExport extends Component{
    render(){
        return(
            <div>
                <h3>{this.props.title}</h3>
                <a href={this.props.link}>
                    <img src={this.props.img} alt="" width="300vh" height="300vh"/>
                </a><br />
                {this.props.desc}
            </div>
        )
    }
}

export default Mainpage;