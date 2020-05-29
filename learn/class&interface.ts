/**
 * @类实现接口
 */
// 实现是面向对象中一个重要的概念。一般来讲，一个类只能继承自另一个类，有时不同类之间可以有一些共同的特性，这时候就可以把这些共同的特性提取为接口，用implements关键字来实现。这个特性大大提高了面向对象的灵活性。
interface Animal {
    name: string,
    eat(): void
}
class Cat implements Animal {
    constructor(name: string) {
        this.name = name;
    }
    name: string;
    eat() {};
}
// 要点1：类实现接口时，必须声明接口中所有定义的属性和方法
interface Animal1 {
    name: string,
    eat(): void
}
class Cat1 implements Animal1 {
    constructor(name: string) {
        this.name = name;
    }
    name: string;
    // eat() {}; // 错误，类实现接口时，必须声明接口中所有定义的属性和方法 
}
// 要点2: 类实现接口时，声明接口中定义的属性和方法不能修饰为private和protected
interface Animal2 {
    name: string,
    eat(): void
}
class Cat2 implements Animal2 {
    constructor(name: string) {
        this.name = name;
    }
    private name: string; // 错误，类实现接口时，声明接口中定义的属性和方法不能修饰为private和protected
    eat() {}
}
// 要点3：接口不能约束类中的构造函数
interface Animal3 {
    new (name: string): void,
    name: string,
    eat(): void
}
class Cat3 implements Animal3 {
    constructor(name: string) {
        this.name = name;
    }
    name: string; //错误，接口不能约束类中的构造函数
    eat() {}
}

/**
 * @接口继承接口
 */
interface Animal4 {
    name: string;
    eat(): void
}
interface Predator4 extends Animal4 {
    run(): void;
}
class Cat4 implements Predator4 {
    constructor(name: string) {
        this.name = name;
    }
    name: string;
    eat() {};
    run() {};
}
// 要点1：继承多个接口用 , 分割，同理实现多个接口方式相同
interface Animal5 {
    name: string;
    eat(): void
}
interface Lovely5 {
    cute: number
}
interface Predator5 extends Animal5, Lovely5 {
    run(): void
}
class Cat5 implements Predator5{
    constructor(name: string, cute: number) {
        this.name = this.name;
        this.cute = cute;
    }
    name: string;
    cute: number;
    eat() {};
    run() {}
}


/**
 * @接口继承类
 */
class Auto {
    constructor(state: string) {
        this.state = state;
    }
    state: string;
}
interface AutoInterface extends Auto {}
class C implements AutoInterface {
    state = '';
}


/**
 * @混合类型
 */
interface SearchFunc {
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
// 要点1： 一个函数还可以有自己的属性和方法
interface Counter {
    (start: number): string,
    interval: number,
    reset(): void
}
function getCounter(): Counter {
    let counter = <Counter> function(start: number) {};
    counter.interval = 123;
    counter.reset = function() {};
    return counter; // 因为是Counter类型，所以必须有返回值，此句很重要
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

//小结
// 1.接口与接口、类与类之间可以相互继承(extends)
// 2.接口可以通过类来实现(implements)，接口只能约束类的公有成员
// 3.接口可以抽离出类的成员，包括公有、私有、保护的成员