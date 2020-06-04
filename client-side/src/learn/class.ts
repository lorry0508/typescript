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
// class Parent {
//     public static getAge() {
//         return Parent.age;
//     }
//     private static age: number = 18;
//     constructor() {
//         //
//     }
// }
// const p = new Parent();
// console.log(p.age); // Property 'age' is a static member of type 'Parent'
// console.log(Parent.age); // 属性“age”为私有属性，只能在类“Parent”中访问


/**
 * @可选类属性
 */
// TS 在 2.0 版本，支持可选类属性，也是使用?符号来标记，来看例子：
// class Info {
//     name: string;
//     age?: number;
//     constructor(name: string, age?: number, public sex?: string) {
//         this.name = name;
//         this.age = age;
//     }
// }
// const info1 = new Info("lison");
// const info2 = new Info("lison", 12);
// const info3 = new Info("lison", 18, "man");

/**
 * @存取器
 */
// 这个也就 ES6 标准中的存值函数和取值函数，也就是在设置属性值的时候调用的函数，和在访问属性值的时候调用的函数，用法和写法和 ES6 的没有区别：
// class UserInfo {
//     private _fullName!: string;
//     constructor() {}
//     get fullName() {
//         return this._fullName;
//     }
//     set fullName(value) {
//         console.log(`setter: ${value}`);
//         this._fullName = value;
//     }
// }
// const user = new UserInfo();
// user.fullName = "Lison Li"; // "setter: Lison Li"
// console.log(user.fullName); // Lison Li


/**
 * @抽象类
 */
// 抽象类一般用来被其他类继承，而不直接用它创建实例。抽象类和类内部定义抽象方法，使用abstract关键字，我们先来看个例子：
// abstract class People {
//     constructor(public name: string) {
        
//     }
//     abstract printName(): void;
// }
// class Man extends People {
//     constructor(name: string) {
//         super(name);
//         this.name = name;
//     }
//     printName() {
//         console.log(this.name);
//     }
// }
// const m = new Man(); // 应有 1 个参数，但获得 0 个
// const man = new Man("lison");
// man.printName(); // "lison"
// const p = new People("lison"); // 无法创建抽象类的实例

// 上面例子中我们定义了一个抽象类 People，在抽象类里我们定义 constructor 方法必须传入一个字符串类型参数，并把这个 name 参数值绑定在创建的实例上；使用abstract关键字定义一个抽象方法 printName，这个定义可以指定参数，指定参数类型，指定返回类型。当我们直接使用抽象类 People 实例化的时候，就会报错，我们只能创建一个继承抽象类的子类，使用子类来实例化。

// 我们再来看个例子：
// abstract class People {
//     constructor(name: string) {}
//     abstract printName(): void;
// }
// class Man extends People {
//     // 非抽象类“Man”不会实现继承自“People”类的抽象成员"printName"
//     constructor(name: string) {
//         super(name);
//         this.name = name;
//     }
// }
// const m = new Man("lison");
// m.printName(); // m.printName is not a function

// 通过上面的例子我们可以看到，在抽象类里定义的抽象方法，在子类中是不会继承的，所以在子类中必须实现该方法的定义。

