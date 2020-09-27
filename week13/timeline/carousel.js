import {Component} from "./framework.js"
export class Carousel extends Component{
    constructor(){
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value){
        this.attributes[name] = value;
    }
    render(){
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (const record of this.attributes.src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url("${record}")`;
            this.root.appendChild(child);
        }

        let position = 0;

        this.root.addEventListener("mousedown", e => {
            console.log("down");
            let children = this.root.children;
            let startX = e.clientX;
            let move = e => {
                let x = e.clientX - startX;

                let current = position - Math.round((x - x % 500) / 500);;

                for (const offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    // 处理负数
                    pos = (pos + children.length) % children.length;
                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x}px)`
                }

                // for (const child of children) {
                //     child.style.transition = "none";
                //     child.style.transform = `translateX(${-position * 500 + x}px)`
                // }
            }
            let up = e => {
                console.log("up");
                let x = e.clientX - startX;
                position = position - Math.round(x/500);
                for (const offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                    let pos = position + offset;
                    // 处理负数
                    pos = (pos + children.length) % children.length;
                    children[pos].style.transition = "";
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`
                }

                // 防移出
                document.removeEventListener("mousemove", move)
                document.removeEventListener("mouseup", up)
            }
            document.addEventListener("mousemove", move)
            document.addEventListener("mouseup", up)
        })
        // let currentIndex = 0;

        // setInterval(() => {
        //     let children = this.root.children;
        //     let nextIndex = (currentIndex + 1) % children.length;

        //     let current = children[currentIndex];
        //     let next = children[nextIndex];

        //     next.style.transition = "none";
        //     // 相对于原位置
        //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

        //     setTimeout(() => {
        //         next.style.transition = "";
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
        //         next.style.transform = `translateX(${-nextIndex * 100}%)`;
        //         currentIndex = nextIndex;
        //     }, 16);
        // }, 1000);

        return this.root;
    }
    mountTo(parent){
        parent.appendChild(this.render());
    }
}
