/*console.log("Hello World!");
console.log("Cool"[1] == "o");
let x = 5;
const age = 25;
console.log("I am " + age + " years old");
console.log(`I have seen ${age} years`); // template literal
console.log(Boolean("")); //false
console.log(Boolean(23456789));  //true
console.log(x);

// constants with objects
// dictionary
const obj = {};
obj.a = 5;
console.log(obj);*/

// writing functions
function foo(x, condition) {
    if (condition) {
        console.log(x);
        //let x = 2;
        x++
        console.log(x);
    }
}

/*
foo(1, true);
console.log(455 === "455");
console.log(2 || "Hello");
*/

let cool = 5;
/*do {
    console.log(cool);
    cool--;
} while(cool < 7);*/

/*for(cool; cool < 9; cool++) {
    console.log(cool);
}*/

switch(cool) {
    case 5:
        console.log("Hi");
        break;
    default:
        break;
}

const obj = {
    name: "Cool",
    for: "Max",
    details: {
        color: "orange",
        size: 12,
    },
}
console.log(obj.name);
console.log(obj['for']);
console.log(obj.details.color);
let babies = ["dog", "cat", "turtle"].map((nam) => `baby ${nam}`);
console.log(babies);

