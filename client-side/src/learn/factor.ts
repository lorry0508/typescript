// 条件类型，它不是三元操作符的写法吗？
/**
 * @基础使用
 */
// 条件类型是 TS2.8 引入的，从语法上看它像是三元操作符。它会以一个条件表达式进行类型关系检测，然后在后面两种类型中选择一个，先来看它怎么写：
// T extends U ? X : Y;

// 这个表达式的意思是，如果 T 可以赋值给 U 类型，则是 X 类型，否则是 Y 类型。来看个实际例子：
// type Type<T> = T extends string ? string: number;
// let index: Type<'a'>; // index 的类型为string
// let index2: Type<false>; // index2的类型为number

/**
 * @分布式条件类型
 */
// 当待检测的类型是联合类型，则该条件类型被称为“分布式条件类型”，在实例化时会自动分发成联合类型，来看例子：
// type TypeNumber<T> = T extends any ? T : never;
// type Type1 = TypeNumber<string | number>; // type1的类型为string | number

// 你可能会说，既然想指定 Type1 的类型为 string|number，为什么不直接指定，而要使用条件类型？其实这只是简单的示范，条件类型可以增加灵活性，再来看个复杂点的例子，这是官方文档的例子：
// type TypeName<T> = T extends string
//     ? string
//     : T extends number
//     ? number
//     : T extends boolean
//     ? boolean
//     : T extends undefined
//     ? undefined
//     : T extends Function
//     ? Function
//     : object;
// type Type1 = TypeName<() => void>; // Type1的类型为Function
// type Type2 = TypeName<string[]>; // Type2的类型为object
// type Type3 = TypeName<(() => void) | string[]>; // Type3的类型为object | Function

// 我们来看一个分布式条件类型的实际应用：
// type Diff<T, U> = T extends U ? never : T;
// type Test = Diff<string | number | boolean, undefined | number>; //Test的类型为string和boolean

// 这个例子定义的条件类型的作用就是，找出从 T 中出去 U 中存在的类型，得到剩下的类型。不过这个条件类型已经内置在 TS 中了，只不过它不叫 Diff，叫 Exclude，我们待会儿会讲到。

// 来看一个条件类型和映射类型结合的例子：
// type Type<T> = {
//     [K in keyof T]: T[K] extends Function ? K : never
// }[keyof T];
// interface Part {
//     id: number;
//     name: string;
//     subparts: Part[];
//     undatePart(newName: string): void;
// }
// type Test = Type<Part>; // Test的类型为“updatePart”

// 来看一下，这个例子中，接口 Part 有四个字段，其中 updatePart 的值是函数，也就是 Function 类型。Type的定义中，涉及到映射类型、条件类型、索引访问类型和索引类型。首先[K in keyof T]用于遍历 T 的所有属性名，值使用了条件类型，T[K]是当前属性名的属性值，T[K] extends Function ? K : never表示如果属性值为 Function 类型，则值为属性名字面量类型，否则为 never 类型。接下来使用keyof T获取 T 的属性名，最后通过索引访问类型[keyof T]获取不为 never 的类型。

/**
 * @条件类型的类型推断infer
 */
// 条件类型提供一个infer关键字用来推断类型，我们先来看个例子。我们想定义一个条件类型，如果传入的类型是一个数组，则返回它元素的类型；如果是一个普通类型，则直接返回这个类型。来看下不使用 infer 的话，怎么写：
// type Type<T> = T extends any[] ? T[number] : T;
// type test = Type<string[]>; // test的类型为string
// type test2 = Type<string>; // test2的类型为string

// 这个例子中，如果传入 Type 的是一个数组类型，那么返回的类型为T[number]，也就是该数组的元素类型，如果不是数组，则直接返回这个类型。这里我们是自己通过索引访问类型T[number]来获取类型的，如果使用 infer 关键字则无需自己手动获取，我们来看下怎么使用 infer：
// type Type<T> = T extends Array<infer U> ? U : T;
// type test = Type<string[]>; // test的类型为string
// type test2 = Type<string>; // test2的类型为string

// 这里 infer 能够推断出 U 的类型，并且供后面使用，你可以理解为这里定义了一个变量 U 来接收数组元素的类型。

/**
 * @TS预定义条件类型
 */
// TS 在 2.8 版本增加了一些预定义的有条件类型，来看一下：
// (1) Exclude<T, U>，从 T 中去掉可以赋值给 U 的类型：
// type Type = Exclude<"a" | "b" | "c", "a" | "b">; //Type => "c"
// type Type1 = Exclude<string | number | boolean, string | number>; // Type1 => boolean

// (2) Extract<T, U>，选取 T 中可以赋值给 U 的类型：
// type Type = Extract<"a" | "b" | "c", "a" | "c" | "f">; // Type => "a" | "c"
// type Type2 = Extract<number | string | boolean, string | boolean>; // Type2 => string | boolean

// (3) NonNullable，从 T 中去掉 null 和 undefined：
// type Type = NonNullable<string | number | undefined | null>; // Type => string | number

// (4) ReturnType，获取函数类型返回值类型：
// type Type = ReturnType<() => string>; // Type => string
// type Type2 = ReturnType<(arg: number) => void>; // Type2 => void

// (5) InstanceType，获取构造函数类型的实例类型：
// InstanceType直接看例子可能不好理解，所以我们先来看下它的实现：
// type instanceType<T extends new(...args: any[]) => any> = T extends new(
//     ...args: any[]
// ) => infer R ? R : any;

// InstanceType 条件类型要求泛型变量 T 类型是创建实例为 any 类型的构造函数，而它本身则通过判断 T 是否是构造函数类型来确定返回的类型。如果是构造函数，使用 infer 可以自动推断出 R 的类型，即实例类型；否则返回的是 any 类型。

// 看过 InstanceType 的实现后，我们来看怎么使用：
// class A {
//     constructor() {}
// }
// type T1 = InstanceType<typeof A>; // T1的类型为A
// type T2 = InstanceType<any>; // T2的类型为any
// type T3 = InstanceType<never>; // T3的类型never
// type T4 = InstanceType<string>; // error

// 上面例子中，T1 的定义中，typeof A返回的的是类 A 的类型，也就是 A，这里不能使用 A 因为它是值不是类型，类型 A 是构造函数，所以 T1 是 A 构造函数的实例类型，也就是 A；T2 传入的类型为 any，因为 any 是任何类型的子类型，所以它满足T extends new (…args: any[]) => infer R，这里 infer 推断的 R 为 any；传入 never 和 any 同理。传入 string 时因为 string 不能不给构造函数类型，所以报错。




