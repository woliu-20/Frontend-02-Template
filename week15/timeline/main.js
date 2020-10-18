import {Component, createElement} from "./framework.js";
import {Carousel} from "./Carousel.js";
import {Button} from "./Button.js";
import {List} from "./List.js";
let d = [
    {
        img: "./images/1.png",
        url: "https://time.geekbang.org",
        title: "111"
    },
    {
        img: "./images/2.png",
        url: "https://time.geekbang.org",
        title: "2222"
    },
    {
        img: "./images/3.png",
        url: "https://time.geekbang.org",
        title: "3333"
    },
    {
        img: "./images/4.png",
        url: "https://time.geekbang.org",
        title: "444"
    },
]

// let a = <Carousel src={d} 
//     onChange={e => console.log(e.detail.position)}
//     onClick={e=>window.location.href = e.detail.data.url}
// />

// document.body.append(a);

let a = <List data={d}>
{(record) => 
    <div>
        <img src={record.img} />
        <a href={record.url}>{record.title}</a>
    </div>
}
</List>
a.mountTo(document.body)