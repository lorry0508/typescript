// (1) Symbol.hasInstance
// const obj = {
//     [Symbol.hasInstance](otherObj: any) {
//         console.log(otherObj);
//     }
// };
// console.log({ a: "a" } instanceof (obj as any)); // false


// // (2) Symbol.isConcatSpreadable
// // 这个值是一个可读写布尔值，其值默认是undefined，当一个数组的 Symbol.isConcatSpreadable 设为 true或者为默认的undefined 时，这个数组在数组的 concat 方法中会被扁平化。我们来看下例子：
// let arr = [1, 2];
// console.log([].concat(arr, [3, 4])); //[1, 2, 3, 4] 

// let arr1 = ["a", "b"];
// console.log(arr1[Symbol.isConcatSpreadable]); //undefined
// arr1[Symbol.isConcatSpreadable] = false;
// console.log(arr1[Symbol.isConcatSpreadable]); // false
// console.log([].concat(arr1, [3, 4])); //[["a", "b", Symbol(Symbol.isConcatSpreadable): false], 3, 4]
// /* 最外层这个数组有三个元素，第一个是一个数组，因为我们设置了arr1[Symbol.isConcatSpreadable] = false
//  所以第一个这个数组没有被扁平化，第一个元素这个数组看似是有三个元素，但你在控制台可以看到这个数组的length为2
//  Symbol(Symbol.isConcatSpreadable): false不是他的元素，而是他的属性，我们知道数组也是对象，所以我们可以给数组设置属性
//  你可以试试如下代码，然后看下打印出来的效果：
//   let arr = [1, 2]
//   arr.props = 'value'
//   console.log(arr) */


// (3) Symbol.species
// class C extends Array {
//     getName() {
//         return "lison";
//     }
// }
// const c = new C(1, 2, 3);
// const a = c.map(item => item + 1);
// console.log(a); //[2, 3, 4]
// console.log(a instanceof C); //true
// console.log(a instanceof Array); //true
// console.log(a.getName()); //lison

// /* 这个例子中，a 是由 c 通过 map 方法衍生出来的，我们也看到了，a 既是 C 的实例，也是 Array 的实例。但是如果我们想只让衍生的数组是 Array 的实例，就需要用 Symbol.species，我们来看下怎么使用： */

// class C extends Array {
//     static get[Symbol.species]() {
//         return Array;
//     }
//     getName() {
//         return "lison";
//     }
// }
// const c = new C(1, 2, 3);
// const a = c.map(item => item + 1);
// console.log(a); //[2, 3, 4]
// console.log(a instanceof C); // false
// console.log(a instanceof Array); // true
// console.log(a.getName()); // 报错
/* 就是给类 C 定义一个静态 get 存取器方法，方法名为 Symbol.species，然后在这个方法中返回要构造衍生数组的构造函数。所以最后我们看到，a instanceof C为 false，也就是 a 不再是 C 的实例，也无法调用继承自 C 的方法。 */

/* forEach和map的区别  es5*/
/*  相同点：
    1.都是循环遍历数组中的每一项
    2.forEach和map方法里每次执行匿名函数都支持3个参数，参数分别是item（当前每一项），index（索引值），arr（原数组）
    3.匿名函数中的this都是指向window
    4.只能遍历数组
    5.都不会改变原数组
*/
/*  区别*/
/* map方法：
    1.map方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值。
    2.map方法不会对空数组进行检测，map方法不会改变原始数组。
    3..浏览器支持：chrome、Safari1.5+、opera都支持，IE9+,
 */
// array.map(function(item, index, arr) {}, thisValue);

// var arr = [0, 2, 4, 6, 8];
// var str = arr.map(function(item, index, arr) {
//     console.log(this); // window
//     console.log("原数组arr:",arr);
//     return item / 2;
// }, this)
// console.log(str);//[0,1,2,3,4]
// /* 4.若arr为空数组，则map方法返回的也是一个空数组。 */

// /* 
//     forEach方法：
//     1.forEach方法用来调用数组的每个元素，将元素传给回调函数
//     2.forEach对于空数组是不会调用回调函数的。
// */
// // Array.forEach(function(item, index, arr) {}, this);

// var arr = [0,2,4,6,8];
// var sum = 0;
// var str = arr.forEach(function(item,index,arr){
//     sum += item;
//     console.log("sum的值为：",sum); //0 2 6 12 20
//     console.log(this); //window
// },this)
// console.log(sum);//20
// console.log(str); //undefined
// // 无论arr是不是空数组，forEach返回的都是undefined。这个方法只是将数组中的每一项作为callback的参数执行一次。



// (4) Symbol.match、Symbol.replace、Symbol.search 和 Symbol.split
/* 这个 Symbol.match 值指向一个内部方法，当在字符串 str 上调用 match 方法时，会调用这个方法，来看下例子： */
// let obj = {
//     [Symbol.match](string) {
//         return string.length;
//     }
// };
// console.log("abcde".match(obj)); //5
/* 相同的还有 Symbol.replace、Symbol.search 和 Symbol.split，使用方法和 Symbol.match 是一样的。 */



// // (5) Symbol.iterator 迭代器
// // 数组的 Symbol.iterator 属性指向该数组的默认遍历器方法：
// const arr = [1, 2, 3];
// const iterator = arr[Symbol.iterator]();
// console.log(iterator);
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// // 这个 Symbol.iterator 方法是可写的，我们可以自定义遍历器方法。


// (6) Symbol.toPrimitive
// 对象的这个属性指向一个方法，当这个对象被转为原始类型值时会调用这个方法，这个方法有一个参数，是这个对象被转为的类型，我们来看下：
// let obj = {
//     [Symbol.toPrimitive](type) {
//         console.log(type);
//     }
// }
// const b = obj++; //number
// const a = `abc${obj}`; //string
// console.log(typeof b);
// console.log(typeof a);



// // (7) Symbol.toStringTag
// // Symbol.toStringTag 和 Symbol.toPrimitive 相似，对象的这个属性的值可以是一个字符串，也可以是一个存取器 get 方法，当在对象上调用 toString 方法时调用这个方法，返回值将作为"[object xxx]"中 xxx 这个值：
// let obj = {
//     [Symbol.toStringTag]: "lison"
// };
// obj.toString(); //"[object lison]"
// let obj2 = {
//     get[Symbol.toStringTag]() {
//         return "haha";
//     }
// }
// obj2.toString(); //"[object haha]"


// (8) Symbol.unscopables
// 这个值和 with 命令有关，我们先来看下 with 怎么使用：
// const obj = {
//     a: "a",
//     b: "b"
// };
// with(obj) {
//     console.log(a);  //"a"
//     console.log(b); //"b"
// };
// 严格模式下会报错
// 可以看到，使用 with 传入一个对象后，在代码块中访问对象的属性就不需要写对象了，直接就可以用它的属性。对象的 Symbol.unscopables 属性指向一个对象，该对象包含了当使用 with 关键字时，哪些属性被 with 环境过滤掉：
console.log(Array.prototype[Symbol.unscopables]);
/* copyWithin: true
entries: true
fill: true
find: true
findIndex: true
flat: true
flatMap: true
includes: true
keys: true
values: true */

export {}