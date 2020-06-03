// javascript 
function handleData() {
    if(arguments.length === 1) return arguments[0] * 2;
    else if (arguments.length === 2) return arguments[0] * arguments[1];
    else return Array.prototype.slice.apply(arguments).join("_");
}
console.log(handleData(2)); // 4
console.log(handleData(3, 5)); // 15
console.log(handleData(2, 3, 7)); // 2, 3, 7
// 这段代码如果在TypeScript环境中，三个对handleData函数的调用都会报错，因为handleData函数定义的时候没有参数。
