var assert = require("assert");
import {parseHTML} from "../src/parser.js";

describe("parse html: ", function () {
    
    it("<a></a>", function () {
        let tree = parseHTML('<a></a>');
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href="//time.geekbang.org"></a>', function () {
        let tree = parseHTML('<a href="//time.geekbang.org"></a>');
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
    });
    
})
// describe("mul function testing", function () {
    
//     it("1+2 should be 3", function () {
//         assert.equal(add(1,2),3);
//     });
//     it("-5+2 should be -3", function () {
//         assert.equal(add(-5,2),-3);
//     });
    
// })