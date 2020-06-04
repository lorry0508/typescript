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
// class Point {
//     public x: number;
//     public y: number;
//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
//     public getPosition() {
//         console.log(`(${this.x}, ${this.y})`);
//         return `(${this.x}, ${this.y})`;
//     }
// }

// (2)private
// private修饰符表示私有的，它修饰的属性在类的定义外面是没法访问的：
// class Parent {
//     private age: number;
//     constructor(age: number) {
//         this.age = age;
//     }
// }
// const p = new Parent(18);
// console.log(p); // {age: 18}
// console.log(p.age); //属性“age”为私有属性，只能在类“Parent”中访问
// console.log(Parent.age); // 类型“typeof Parent”上不存在属性“age”
// class Child extends Parent {
//     constructor(age: number) {
//         super(age);
//         console.log(super.age); // 通过 "super" 关键字只能访问基类的公共方法和受保护方法
//     }
// }

// 这里你可以看到，age 属性使用 private 修饰符修饰，说明他是私有属性，我们打印创建的实例对象 p，发现他是有属性 age 的，但是当试图访问 p 的 age 属性时，编译器会报错，告诉我们私有属性只能在类 Parent 中访问。

// 这里我们需要特别说下 super.age 这里的报错，我们在之前学习 ES6 的类的时候，讲过在不同类型的方法里 super 作为对象代表着不同的含义，这里在 constructor 中访问 super，这的 super 相当于父类本身，这里我们看到使用 private 修饰的属性，在子类中是没法访问的。

// (3)protected
// protected修饰符是受保护修饰符，和private有些相似，但有一点不同，protected修饰的成员在继承该类的子类中可以访问，我们再来看下上面那个例子，把父类 Parent 的 age 属性的修饰符 private 替换为 protected：
// class Parent {
//     protected age: number;
//     constructor(age: number) {
//         this.age = age;
//     }
//     protected getAge() {
//         return this.age;
//     }
// }
// const p = new Parent(18);
// console.log(p.age); // 属性“age”受保护，只能在类“Parent”及其子类中访问
// console.log(Parent.age); // 属性“age”受保护，只能在类“Parent”及其子类中访问
// class Child extends Parent {
//     constructor(age: number) {
//         super(age);
//         console.log(super.age); //undefined
//         console.log(super.getAge());
//     }
// }
// new Child(18);

// protected还能用来修饰 constructor 构造函数，加了protected修饰符之后，这个类就不能再用来创建实例，只能被子类继承，这个需求我们在讲 ES6 的类的时候讲过，需要用new.target来自行判断，而 TS 则只需用 protected 修饰符即可：
// class Parent {
//     protected constructor() {
//         //
//     }
// }
// const p = new Parent(); //类“Parent”的构造函数是受保护的，仅可在类声明中访问
// class Child extends Parent {
//     constructor() {
//         super();
//     }
// }
// const c = new Child();

/**
 * @readonly修饰符
 */
// 在类里可以使用readonly关键字将属性设置为只读。
// class UserInfo {
//     readonly name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
// }
// const user = new UserInfo("Lison");
// user.name = "haha"; //在类里可以使用readonly关键字将属性设置为只读。

// 设置为只读的属性，实例只能读取这个属性值，但不能修改。


/**
 * @参数属性
 */
// 之前的例子中，我们都是在类的定义的顶部初始化实例属性，在 constructor 里接收参数然后对实力属性进行赋值，我们可以使用参数属性来简化这个过程。参数属性简单来说就是在 constructor 构造函数的参数前面加上访问限定符，也就是前面讲的 public、private、protected 和 readonly 中的任意一个，我们来看例子：
// class A {
//     constructor(name: string) {}
// }
// const a = new A("aaa");
// console.log(a.name); //类型“A”上不存在属性“name”
// class B {
//     constructor(public name: string) {}
// }
// const b = new B("bbb");
// console.log(b.name); // "bbb"

// 可以看到，在定义类 B 时，构造函数有一个参数 name，这个 name 使用访问修饰符 public 修饰，此时即为 name 声明了参数属性，也就无需再显示地在类中初始化这个属性了。

/**
 * @静态属性
 */
// 和 ES6 的类一样，在 TS 中一样使用static关键字来指定属性或方法是静态的，实例将不会添加这个静态属性，也不会继承这个静态方法，你可以使用修饰符和 static 关键字来指定一个属性或方法：
// class Parent {
//     public static age: number = 18;
//     public static getAge() {
//         return Parent.age;
//     }
//     constructor() {
//         //
//     }
// }
// const p = new Parent();
// console.log(p.age); // Property 'age' is a static member of type 'Parent'
// console.log(Parent.age); // 18

// 如果使用了 private 修饰道理和之前的一样：

