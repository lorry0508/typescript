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

