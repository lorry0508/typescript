/* TypeScript在2.7版本对Symbol做了补充，增加了unique symbol这种类型，他是symbols的子类型，这种类型的值只能由Symbol()或Symbol.for()创建，或者通过指定类型来指定一个值是这种类型。这种类型的值仅可用于常量的定义和用于属性名。另外还有一点要注意，定义unique symbol类型的值，必须用const不能用let。我们来看个在TypeScript中使用Symbol值作为属性名的例子： */

// const key1: unique symbol = Symbol();
// let key2: symbol = Symbol();
// const obj = {
//     [key1]: 'value1',
//     [key2]: 'value2'
// }
// console.log(obj[key1]);
// console.log(obj[key2]); // error, 类型“symbol”不能作为索引类型使用。