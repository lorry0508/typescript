/**
 * 接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都是抽象的，由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。
 * 注意:
 * 1.接口规范首字母大写
 * 2.被赋值的变量必须和接口的定义保持一致，参数不能多也不能少；
 * 3.类型检查器不会 去检查属性的顺序，只要相应的属性存在并且类型正确即可
 */

//  1.可选属性: 
// 接口的所有属性可能都不是必需的。
interface Person {
    name: string,
    age?: number
}
let man: Person = {
    name: "Tom"
}

// 2.只读属性：
// 关键字Readonly,初始化后不可更改
interface Person1 {
    readonly name: string,
    age: number
}
let man1: Person1 = {
    name: 'James',
    age: 20
}

// 3.任意属性：
// 用任意的字符串索引，使其可以得到任意的结果。
interface Person2 {
    name: string,
    age: number,
    [x: string]: any
}
let man2: Person2 = {
    name: 'James',
    age: 30,
    height: '180cm'
}
// 一旦定义了任意属性，那么其他属性的类型必须是任意属性类型的子集。
// interface Person3 {
//     name: string,
//     age: number, //错误
//     [x: string]: string
// }
// let man3: Person3 = {
//     name: 'James',
//     age: 30,
//     hegiht: "180cm"
// }

// 4.数字索引
// 可以得到任意长度的数组
interface StringArray {
    [i: number]: string
}
let chars: StringArray = ['a', "b"];


// 5.对象类型接口
interface List {
    readonly id: number,
    name: string,
    age?: number
}
interface Result {
    data: List[]
}
function render(result: Result) {
    console.log(JSON.stringify(result));
}
let result = {
    data: [
        {id: 1, name: 'A', sex: 'male'},
        {id: 2, name: 'B'},
    ]
}
render(result);
render({
    data: [
      { id: 1, name: 'A', sex: 'male' },
      { id: 2, name: 'B' }
    ]
  } as Result)


// 6.函数类型接口
// 定义一
let add1: (x: number, y: number) => number;
// 定义二
interface Add2 {
    (x: number, y: number): number,
}
let add2: Add2 = (a, b) => a + b;
// 定义三
type Add3 = (x: number, y: number) => number;
let add3: Add3 = (a, b) => a + b;
// interface 和 type 定义函数时有什么区别？
// type: 不是创建新的类型，只是为一个给定的类型起一个名字。type还可以联合、交叉等操作，引用起来更简洁。
// interface: 创建新的类型，接口之间还可以继承、声明合并。建议优先使用interface
