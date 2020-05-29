/**
 * @类型检查机制
 */
// ts编译器在做类型检查时，所秉承的一些原则，以及表现出来的行为。
// 包含：类型推断、类型兼容性、类型保护

/**
 * @类型推断
 */
// 不需要指定变化的类型（函数的返回值类型），ts可以根据规则自动推断出一个类型
// 1.基础类型推断
let a; // let a: any
let b = 1; //let b: number
let c = []; //let c: any[]

// 2.最佳通用类型推断(从右向左推断)
// 当需要从多个类型中推断出一个类型时，ts就会尽可能的推断出一个最佳通用类型
let d = [1, null]; // let d: (number | null)[]

// 3.上下文类型推断（从左往右推断）
// 通常发生在事件处理中
window.onkeydown = (event) => {}; // (parameter) event: KeyboardEvent


/**
 * @类型兼容性
 */
// 当一个类型Y可以赋值给另一个类型X时，我们可以认为类型X兼容类型Y
// X 兼容 Y: X(目标类型) = Y(源类型)

// 1.变量兼容性
let s: string = 'abc';
s = null;
// string类型兼容null类型，null是string类型的子类型

// 2.接口兼容性
interface X {
    a: any,
    b: any
}
interface Y {
    a: any,
    b: any,
    c: any
}
let x: X = {a: 1, b: 2};
let y: Y = {a: 1, b: 2, c: 3};
x = y;
y = x; //错误
// 注意：接口之间相互赋值，成员少的会兼容成员多的。源类型必须具备目标类型的必要属性。

// 3.函数兼容性
// 3.1 函数个数
type Handler = (a: number, b: number) => void;
function hof(handler: Handler) {
    return handler;
}
let handler1 = (a: number) => {};
hof(handler1);
let handler2 = (a: number, b: number, c: number) => {};
hof(handler2); // 错误，函数个数不兼容
let handler3 = (a: string) => {};
hof(handler3); // 错误，a的类型不兼容
// 注意：函数参数个数，参数多的兼容参数少的。换句话就是，参数多的可以被参数少的替换。

// 3.2 固定参数、可选参数、剩余参数
let a1 = (p1: number, p2: number) => {}; //固定参数
let a2 = (p1?: number, p2?: number) => {}; //可选参数
let a3 = (...args: number[]) => {}; //剩余参数
a = b
a = c
b = a // Error
b = c // Error
c = a
c = b
// 注意：固定参数兼容可选参数和剩余参数。可选参数不兼容固定参数和剩余参数。剩余参数兼容固定参数和可选参数。

// 3.3 复杂类型
interface Point3D {
    x: number,
    y: number,
    z: number
}
interface Point2D {
    x: number,
    y: number
}
let p3d = (point: Point3D) => {};
let p2d = (point: Point2D) => {};

p3d = p2d;
p2d = p3d; //错误
// 注意：成员个数多的兼容成员个数少的，这里与接口兼容性理论相反。可以把对象拆分成参数，参数多的兼容参数少的，与函数兼容性结论一致。

// 3.4 返回值类型
let f = () => ({name: 'Alice'});
let g = () => ({name: 'Alcie', location: 'Beijing'});
f = g;
g = f; //错误
// 注意：目标函数的返回值类型，必须与源文件额返回值类型相同，或其为子类型。成员少的兼容成员多的。

// 3.5 函数重载
function overload (a: number, b: number): number;
function overload (a: string, b: string): string;
function overload (a: any, b: any): any {};
// 注意：在重载列表中，目标函数的参数要大于源函数的参数

// 4.枚举兼容性
enum Fruit {
    Apple,
    Banana
}
enum Color {
    Red,
    Blue,
    Green
}
let fruit: Fruit.Apple = 3;
let no: number = Fruit.Apple;
let color: Color.Red = Fruit.Apple; // Error
// 注意：枚举类型和数值类型相互兼容，枚举与枚举之间相互不兼容。

// 5.类兼容性
class A {
    constructor(p: number, q: number) {}
    id: number = 1;
}
class B {
    static s = 1;
    constructor(p: number) {};
    id: number = 2;
}
let aa = new A(1, 2);
let bb = new B(1);
aa = bb;
bb = aa;
// 注意： 比较类与类是否兼容，静态成员和构造函数不进行比较。成员少的兼容成员多的，父类与子类之间的实例相互兼容。

// 6.泛型兼容性
interface Empty<T> {};
let obj1: Empty<number> = {};
let obj2: Empty<string> = {};
obj1 = obj2;

interface Empty1<T> {
    value: T;
}
let obj3: Empty1<number> = {value: 1};
let obj4: Empty1<string> = {value: 'a'};
obj3 = obj4; //Error
// 泛型接口未设置任何属性时，obj1 与 obj2 相互兼容，若此时 Empty 设置了属性 value: T 时，obj1 与 obj2 不兼容。

// 泛型函数
let log1 = <T>(x: T): T => {
    console.log('x');
    return x;
}
let log2 = <U>(y: U): U => {
    console.log('y');
    return y;
}
log1 = log2;
// 注意：泛型函数参数类型相同，参数多的兼容参数少的。

/**
 * @小结
 */
// 1.结构之间兼容，成员少的兼容成员多的
// 2.函数之间兼容，参数多的兼容参数少的

/**
 * @类型保护
 */
// TS能够在特定的区块中保证变量属于某种确定的类型
enum Type {
    Strong,
    Week
}
class Java {
    helloJava() {
        console.log('hello java');
    }
    java: any
}
class JavaScript {
    helloJavaScript() {
        console.log('hello javascript');
    }
    javaScript: any
}
function getLanguange(type: Type, x: string | number) {
    let lang = type === Type.Strong ? new Java() : new JavaScript()
    if ((lang as Java).helloJava) {
        (lang as Java).helloJava()
    } else {
        (lang as JavaScript).helloJavaScript()
    }
    return lang
}
getLanguange(Type.Strong);
// 1.instanceof 判断实例是否属于某个类
// if (lang instanceof Java) {
//     lang.helloJava()
//   } else {
//     lang.helloJavaScript()
//   }

//2.in 判断一个属性是否属于某个对象
// if ('java' in lang) {
//     lang.helloJava()
//   } else {
//     lang.helloJavaScript()
//   }
  
// 3.typeof 判断了一个基本类型
// if (typeof x === 'string') {
//     x.length
//   } else {
//     x.toFixed(2)
//   }

// 4.创建类型保护函数
// function isJava(lang: Java | JavaScript): lang is Java {
//     return (lang as Java).helloJava !== undefined
//   }
  
//   if (isJava(lang)) {
//     lang.helloJava()
//   } else {
//     lang.helloJavaScript()
//   }
  
  