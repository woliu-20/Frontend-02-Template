var assert = require("assert");
import {parseHTML} from "../src/parser.js";

describe("parse html: ", function () {
    
    it("<a></a>", function () {
        let tree = parseHTML('<a></a>');
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
    });
    it("<ab*c></ab*c> == <abc></abc>", function () {
        let tree = parseHTML('<ab*c></ab*c>');
        assert.equal(tree.children[0].tagName, "abc");
        assert.equal(tree.children[0].children.length, 0);
    });
    it("<a></>", function () {
        assert.throws(() => {parseHTML('<a></>')},{message: "unexpected charater \">\""});
    });
    it("<a></", function () {
        assert.throws(() => {parseHTML('<a></')},{message: "endtag error"});
    });
    it("abc", function () {
        let tree = parseHTML('abc');
        assert.equal(tree.children[0].type, "text");
        assert.equal(tree.children[0].content, "abc");
    });
    it("<a></b>", function () {
        assert.throws(() => {parseHTML('<a></b>')},{message: "tag start end doesn't match!"});
    });
    it('<a href="//time.geekbang.org"></a>', function () {
        let tree = parseHTML('<a href="//time.geekbang.org"></a>');
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href="//time.geekbang.org"/>', function () {
        let tree = parseHTML('<a href="//time.geekbang.org"/>');
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href="//time.geekbang.org"', function () {
        assert.throws(() => {parseHTML('<a href="//time.geekbang.org"')},{message: "tag error"});
    });
    it('<a href="//time.geekbang.org"_/>', function () {
        assert.throws(() => {parseHTML('<a href="//time.geekbang.org"_/>')},{message: 'unexpected charater "_"'});
    });
    it('<a  href="//time.geekbang.org"></a>', function () {
        let tree = parseHTML('<a  href="//time.geekbang.org"></a>');
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href ></a>', function () {
        let tree = parseHTML('<a href ></a>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a width = 750></a>', function () {
        let tree = parseHTML('<a width = 750></a>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href id ></a>', function () {
        let tree = parseHTML('<a href id ></a>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href="abc" id ></a>', function () {
        let tree = parseHTML('<a href="abc" id ></a>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href=\'abc\' id ></a>', function () {
        let tree = parseHTML('<a href=\'abc\' id ></a>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a id=abc ></a>', function () {
        let tree = parseHTML('<a id=abc ></a>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a id=abc></a>', function () {
        let tree = parseHTML('<a id=abc></a>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a id=abc/>', function () {
        let tree = parseHTML('<a id=abc/>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a i\u0000d=abc/>', function () {
        assert.throws(() => {parseHTML('<a i\u0000d=abc/>')},{message: "attributeName error"});
    });
    it('<a id="a\u0000bc"/>', function () {
        assert.throws(() => {parseHTML('<a id="a\u0000bc"/>')},{message: "doubleQuotedAttributeValue error"});
    });
    it('<a />', function () {
        let tree = parseHTML('<a />');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a /', function () {
        assert.throws(() => {parseHTML('<a /')},{message: "selfClosingStartTag miss '>'"});
    });
    it('<a/>', function () {
        let tree = parseHTML('<a/>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<A /> unpper case', function () {
        let tree = parseHTML('<A />');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<>', function () {
        let tree = parseHTML('<>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "text");
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