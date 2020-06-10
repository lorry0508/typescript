/**
 * @混入，兼顾值和类型的合并操作
 */
// 混入即把两个对象或者类的内容，混合起来，从而实现一些功能的复用。如果你使用过 Vue，你应该知道 Vue 的 mixins 这个 api，它可以允许你将一些抽离到对象的属性、方法混入到一些组件。接下来我们先来看看个在 JavaScript 中实现的简单混入：
// class A {
//     constructor () {}
//     funcA() {
//         console.log("here");
//     }
// }
// class B {
//     constructor () {}
//     funcB() {}
// }
// const mixin = (target, from) => { // 这里定义一个函数来将一个类混入到目标类
//     Object.getOwnPropertyNames(from).forEach(key => { // 通过Object.getOwnPropertyNames可以获取一个对象自身定义的而非继承来的属性名组成的数组
//         target[key] = from[key]; // 将源类原型对象上的属性拿来添加到目标类的原型对象上
//     });
// };
// mixin(B.prototype, A.prototype); // 传入两个类的原型对象
// const b = new B();
// b.funA(); // here

