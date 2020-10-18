import {Component, STATE, ATTRIBUTE} from "./framework.js";
import {enableGesture} from "./gesture.js";
import {Timeline, Animation} from "./animation.js"
import {ease} from "./ease.js"

export {STATE, ATTRIBUTE} from "./framework.js";

export class Carousel extends Component{
    constructor(){
        super();
    }
    render(){
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (const record of this[ATTRIBUTE].src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url("${record.img}")`;
            this.root.appendChild(child);
        }
        enableGesture(this.root)

        let timeline = new Timeline;
        timeline.start();

        let handler = null;
        let children = this.root.children;

        this[STATE].position = 0;

        let t = 0;
        let ax = 0;

        this.root.addEventListener("start", e=>{
            timeline.pause();
            clearInterval(handler);
            if (Date.now() - t < 1500) {
                let progress = (Date.now() - t) / 500;
                ax = ease(progress) * 500 - 500;
            }else {
                ax = 0;
            }
        })
        this.root.addEventListener("tap", e=>{
            this.triggerEvent("click", {
                position: this[STATE].position,
                data: this[ATTRIBUTE].src[this[STATE].position]
            })
        })
        this.root.addEventListener("pan", e=>{
            let x = e.clientX - e.startX - ax;
            let current = this[STATE].position - Math.round((x - x % 500) / 500);
            for (const offset of [-1, 0, 1]) {
                let pos = current + offset;
                // 处理负数
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = "none";
                children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`
            }
        })
        this.root.addEventListener("end", e=>{
            timeline.reset();
            timeline.start();
            handler = setInterval(nextPicture, 3000);

            let x = e.clientX - e.startX - ax;
            let current = this[STATE].position - ((x - x % 500) / 500);

            let direction = Math.round((x % 500) / 500);

            if(e.isFlick){
                if (e.velocity < 0) {
                    direction = Math.ceil((x % 500) / 500);
                }else{
                    direction = Math.floor((x % 500) / 500)
                }
            }

            for (const offset of [-1, 0, 1]) {
                let pos = current + offset;
                // 处理负数
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = "none";
                timeline.add(new Animation(children[pos].style, "transform", 
                    - pos * 500 + offset * 500 + x % 500, 
                    - pos * 500 + offset * 500 + direction * 500, 
                    500, 0, ease, v => `translate(${v}px)`));
            }
            this[STATE].position = this[STATE].position - ((x - x % 500) / 500) - direction;
            this[STATE].position = (this[STATE].position % children.length + children.length) % children.length
        })

        // this.root.addEventListener("mousedown", e => {
        //     console.log("down");
        //     let children = this.root.children;
        //     let startX = e.clientX;
        //     let move = e => {
        //         let x = e.clientX - startX;

        //         let current = this[STATE].position - Math.round((x - x % 500) / 500);;

        //         for (const offset of [-1, 0, 1]) {
        //             let pos = current + offset;
        //             // 处理负数
        //             pos = (pos + children.length) % children.length;
        //             children[pos].style.transition = "none";
        //             children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x}px)`
        //         }

        //         // for (const child of children) {
        //         //     child.style.transition = "none";
        //         //     child.style.transform = `translateX(${-this[STATE].position * 500 + x}px)`
        //         // }
        //     }
        //     let up = e => {
        //         console.log("up");
        //         let x = e.clientX - startX;
        //         this[STATE].position = this[STATE].position - Math.round(x/500);
        //         for (const offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
        //             let pos = this[STATE].position + offset;
        //             // 处理负数
        //             pos = (pos + children.length) % children.length;
        //             children[pos].style.transition = "";
        //             children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`
        //         }

        //         // 防移出
        //         document.removeEventListener("mousemove", move)
        //         document.removeEventListener("mouseup", up)
        //     }
        //     document.addEventListener("mousemove", move)
        //     document.addEventListener("mouseup", up)
        // })

        let nextPicture = () => {
            let children = this.root.children;
            let nextPosition = (this[STATE].position + 1) % children.length;

            let current = children[this[STATE].position];
            let next = children[nextPosition];

            t = Date.now();
            // next.style.transition = "none";
            // // 相对于原位置
            // next.style.transform = `translateX(${500 - nextPosition * 500}px)`;
            timeline.add(new Animation(current.style, "transform", 
                -this[STATE].position * 500, - 500 - this[STATE].position * 500, 500, 0, ease, v => `translate(${v}px)`));
            timeline.add(new Animation(next.style, "transform", 
                500 - nextPosition * 500, - nextPosition * 500, 500, 0, ease, v => `translate(${v}px)`));
            
            this[STATE].position = nextPosition;
            this.triggerEvent("change", {position: this[STATE].position});
        }
        
        handler = setInterval(nextPicture, 3000);

        return this.root;
    }
}
