import {Component, createElement} from "./framework.js"
import {Carousel} from "./carousel.js"
let d = [
    "./images/1.png",
    "./images/2.png",
    "./images/3.png",
    "./images/4.png",
]

let a = <Carousel src={d} />

// document.body.append(a);
a.mountTo(document.body)