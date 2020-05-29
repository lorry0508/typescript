// 字符串类型
let str: string = 'abc';

// 数字类型
let num: number = 12;

// 布尔类型
let bool: boolean = true;

// 数组类型
let arr: number[] = [1, 2, 3, 4];
let arr1: Array<string> = ["1", "a"];
let arr2: Array<number | string> = [1, "a"];

// 元组
let tuple: [string, number] = ["a", 2];

// 枚举
// 1.数字枚举: 
// 1.1初始值为0，逐步递增，也可以自定义初始值，之后根据初始值逐步递增
// 1.2数字枚举会反向映射，可以根据索引值反向获取枚举类型。
enum Role {
    Red,
    Green,
    Blue
}
// 2.字符串枚举：
// 字符串枚举不支持反向映射
enum Message {
    Success = "成功",
    Error = "失败"
}
// 3.常量枚举：
// 在枚举关键字前添加const,该常量枚举会在编译阶段移除。
const enum Month {
    Jan,
    Feb
}
// 4.外部枚举：
declare enum Color {
    Red,
    Blue
}
// declare 定义的类型只会在编译时的检查，编译结果中会被删除。declare和const可以同时存在。

// 对象
// 第一种：
let obj1: object = {x: 1, eat(): void {}};
// 第二种：
let obj2: {x: number, y: string} = {x: 1, y: 'b'};

// Symbol
// Symbol类型的值通过Symbol构造函数来创建
let s: symbol = Symbol();

// Null & Undefined
let un: undefined = undefined;
let nu: null = null;

// void
// 用于标识方法没有返回值的类型，表示该方法没有返回值
// undefined并不是保留字段可以被赋值，所以设置undefined时，建议使用void 0
function noReturn(): void {};

// 任意类型
// 声明any的变量可以赋予任何类型的值
let x: any;

// 函数
// 1.es6
let add = (x, y) => x + y;
// 2.ts
let add1 = (x: number, y: number) => x + y;

// never
// never类型表示的是那些永不存在的值的类型。
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型 never的子类型或可以赋值给 never类型。即便any也不可以赋值给never
let error = (): never => {
    throw new Error('error')
};
let endless = (): never => {
    while(true) {}
}
// 类型推断：变量在声明时并未赋值，类型推断为any



