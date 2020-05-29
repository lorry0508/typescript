/**
 * @复习类的概念
 */
// // 1.传统的js
// function Point(x, y) {
//     this.x = x;
//     this.y = y;
// }
// Point.prototype.toString = function() {
//     return '(' + this.x + this.y + ')';
// }
// var p = new Point(1, 2);
// // 2.es6后类的概念
// class Point1 {
//     constructor(x, y) {
//         this.x = x
//         this.y = y
//     }
//     x
//     y
//     toString() {
//         return '(' + this.x + this.y + ')';
//     }
// }
// // 3.ts中类的概念
// class Dog {
//     constructor(name: string) {
//         this.name = name
//     }
//     name: string
//     run() {}
// }
// class Husky extends Dog {
//     constructor(name: string, color: string) {
//         super(name)
//         this.color = color
//     }
//     color: string
// }
// // 注意： 
// // 1.继承类中的构造函数里访问this的属性之前，一定要调用super方法；
// // 2.ts和es6中，‘类的成员属性’都是实例属性，而不是原型属性，“类的成员方法”都是“原型方法”。Dog.protype => {constructor: f, run: f}, new Dog('huang') => {name: "string"}
// // 3.ts中实例的属性必须有初始值，或者在构造函数中被初始化。


/**
 * @修饰符学习
 */
// 1.public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是public
// 2.private 修饰的属性或方法是私有的，不能在它的类的外部访问，包括继承它的类也不可以访问
// 3.protected 修饰的属性或方法是受保护的，它和private类似，区别是在它的子类中是允许访问的
// readonly 修饰的属性为只读属性，只允许出现在属性声明或索引标签名中

// 1.public
class Animal {
    public name: string;
    public constructor(name: string) {
        this.name = name;
    }
}
let a = new Animal('Jack');

// 2.private
class Animal1 {
    private name: string;
    public constructor(name: string) {
        this.name = name;
    }
}
let a1 = new Animal1('Tom');
class Cat1 extends Animal1 {
    constructor(name: string) {
        super(name);
        console.log(this.name); // 报错，name在父类中为私有属性
    }
}

// 3.protected
class Animal2 {
    protected name: string;
    public constructor(name: string) {
        this.name = name;
    }
}
class Cat2 extends Animal2 {
    constructor(name: string) {
        super(name);
        console.log(this.name);
    }
}
let a2 = new Animal2('Jack');

// 4.readonly
class Animal3 {
    readonly name: string;
    public constructor(name: string) {
        this.name = name;
    }
}
let a3 = new Animal3('Jack');
a3.name = 'Tom'; //错误，只能读不能改

// 5.抽象类
// 注意： 
// 1.抽象类不允许被实例化
abstract class Animal4 {
    public name: string;
    public constructor(name: string) {
        this.name = name;
    }
}
var a4 = new Animal4('Jack'); // 错误，抽象类不能被实例化
// 2.抽象类中的抽象方法必须被继承实现
abstract class Animal5 {
    public name: string;
    public constructor(name: string) {
        this.name = name;
    }
    abstract sayHi(): void;
}
class Cat4 extends Animal5 {
    public color: string;
    sayHi() {console.log(`Hi`)};
    public constructor(name: string, color: string) {
        super(name);
        this.color = color;
    }
}
var a4 = new Cat4('Tom', 'Blue');
