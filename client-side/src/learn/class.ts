// 虽然说类是 ES6 中新增的概念，但是在这里讲 TS 中的类，是因为在语法的实现上 TS 和 ES6 规范的，还是有点区别。在学习本节课之前，你要确定你已经详细学习了ES6标准的类的全部知识，如果没有学习，建议你先学习下阮一峰的《ECMAScript 6 入门》，学习完后再来学习本节课你会发现，一些同样的功能写法上却不同。
/**
 * @基础
 */
// 类的所有知识我们已经在 ES6 中的类两个课时学过了，现在我们先来看下在 TS 中定义类的一个简单例子：
// class Point {
//     x: number;
//     y: number;
//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
//     getPosition() {
//         console.log(`(${this.x}, ${this.y})`);
//         return `(${this.x}, ${this.y})`;
//     }
// }
// const point = new Point(1, 2);

// 我们首先在定义类的代码块的顶部定义两个实例属性，并且指定类型为 number 类型。构造函数 constructor 需要传入两个参数，都是 number 类型，并且把这两个参数分别赋值给两个实例属性。最后定义了一个定义在类的原型对象上的方法 getPosition。

// 同样你也可以使用继承来复用一些特性：
// class Parent {
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
// }
// class Child extends Parent {
//     constructor(name: string) {
//         super(name);
//     }
// }
// 这些和 ES6 标准中的类没什么区别，如果大家不了解ES6标准中类关于这块的内容，建议大家先去学习ES6类的知识。

/**
 * @修饰符
 */
// 在 ES6 标准类的定义中，默认情况下，定义在实例的属性和方法会在创建实例后添加到实例上；而如果是定义在类里没有定义在 this 上的方法，实例可以继承这个方法；而如果使用 static 修饰符定义的属性和方法，是静态属性和静态方法，实例是没法访问和继承到的；我们还通过一些手段，实现了私有方法，但是私有属性的实现还不好实现。

// 接下来我们来看下 TS 中的公共、私有和受保护的修饰符：

// (1) public
// public表示公共的，用来指定在创建实例后可以通过实例访问的，也就是类定义的外部可以访问的属性和方法。默认是 public，但是 TSLint 可能会要求你必须用修饰符来表明这个属性或方法是什么类型的。
class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public getPosition() {
        console.log(`(${this.x}, ${this.y})`);
        return `(${this.x}, ${this.y})`;
    }
}

// (2)private
// private修饰符表示私有的，它修饰的属性在类的定义外面是没法访问的：
