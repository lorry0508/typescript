/**
 * @泛型的概念
 */
// 泛型是指在定义函数、接口或类的时候，不预先定义具体的类型，而在使用的时候再指定类型的一种特性。
// 可以这么理解：直接把泛型理解未代表类型的参数
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for(let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray<string>(3, 'x');


/**
 * @多个类型参数
 */
function swap<T,U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']);


/**
 * @泛型约束
 */
interface Lengthwise {
    length: number;
}
function logginIndentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
logginIndentity(7); //错误，因为泛型约束，判断7没有length属性
// 多个类型参数之间也可以相互约束
function copyFields<T extends U, U>(target: T, source: U) {
    for(let id in source) {
        target[id] = (<T>source)[id]
    }
    return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 }) // { a: 1, b: 10, c: 3, d: 20 }


/**
 * @泛型函数
 */
type Log = <T>(value: T) => T;
let log: Log = (value) => {
    console.log(value);
    return value;
}
log(<number>(2)); // 2
log('2'); // '2'
log(true); // <boolean>true

/**
 * @泛型接口
 */
// 第一步，接口实现一个类
interface SearchFunc1 {
    (source: string, subString: string): boolean
}
let mySearch1: SearchFunc1;
mySearch1 = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
// 第二步，使用包含泛型的接口替换
interface CreateArrayFunc1 {
    <T>(length: number, value: T): Array<T>
}
let createArray1: CreateArrayFunc1;
createArray1 = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for(let i = 0; i < length; i++){
        result[i] = value;
    }
    return result;
}
createArray1(3, 'x');
// 第三步，把泛型参数提到接口名上
interface CreateArrayFunc2<T> {
    <T>(length: number, value: T): Array<T>;
}
let createArray2: CreateArrayFunc2<any>;
createArray2 = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for(let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
console.log(3, 'x');


/**
 * @泛型类
 */
class Log1<T> {
    run(value: T) {
        console.log(value);
        return value;
    }
}
let log1 = new Log1<number>()
log1.run(1); // 1
let log2 = new Log1();
log2.run('1'); // '1'
// 注意：泛型不能应用于类的静态成员
class Log2<T> {
    static run(value: T) { // 错误，泛型不能应用于类的静态成员
        console.log(value);
        return value;
    }
}

/**
 * 小结
 */
// 1.函数和类可以轻松支持多种数据，增强代码的拓展性
// 2.不必写多条函数重载，冗长的联合类型声明，增强代码的可读性
// 3.灵活控制类型之间的约束