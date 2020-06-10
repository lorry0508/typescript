/**
 * @对声明合并的爱与恨
 */
// 声明合并是指 TypeScript 编译器会将名字相同的多个声明合并为一个声明，合并后的声明同时拥有多个声明的特性。我们知道在 JavaScrip 中，使用var关键字定义变量时，定义相同名字的变量，后面的会覆盖前面的值。使用let 定义变量和使用 const 定义常量时，不允许名字重复。在 TypeScript 中，接口、命名空间是可以多次声明的，最后 TypeScript 会将多个同名声明合并为一个。我们下来看个简单的例子：
// interface Info {
//     name: string;
// }
// interface Info {
//     age: number;
// }
// let info: Info;
// info = { // 类型“{ name: string; }”中缺少属性“age”
//     name: "lison"
// }
// info = { // right
//     name: "lison",
//     age: 18
// }

// 可以看到，我们定义了两个同名接口Info，每个接口里都定义了一个必备属性，最后定义info类型为Info时，info的定义要求同时包含name和age属性。这就是声明合并的简单示例，接下来我们详细学习。

/**
 * @补充知识
 */
// TypeScript的所有声明概括起来，会创建这三种实体之一：命名空间、类型和值：
// (1) 命名空间的创建实际是创建一个对象，对象的属性是在命名空间里export导出的内容；
// (2) 类型的声明是创建一个类型并赋给一个名字；
// (3) 值的声明就是创建一个在JavaScript中可以使用的值。

// 下面这个表格会清晰的告诉你，每一种声明类型会创建这三种实体中的哪种，先来说明一下，第一列是指声明的内容，每一行包含4列，表明这一行中，第一列的声明类型创建了后面三列哪种实体，打钩即表示创建了该实体：
// 声明类型	创建了命名空间	创建了类型	创建了值
// Namespace	√		                    √
// Class		                    √	    √
// Enum		                    √	    √
// Interface		                √	
// Type Alias类型别名		         √	
// Function			                    √
// Variable			                    √

// 可以看到，只要命名空间创建了命名空间这种实体。Class、Enum两个，Class即是实际的值也作为类使用，Enum编译为JavaScript后也是实际值，而且我们讲过，一定条件下，它的成员可以作为类型使用；Interface和类型别名是纯粹的类型；而Funciton和Variable只是创建了JavaScript中可用的值，不能作为类型使用，注意这里Variable是变量，不是常量，常量是可以作为类型使用的。

/**
 * @合并接口
 */
// 我们在本节课一开始的例子中，简单示范了一下接口声明的合并，下面我们来补充一些内容。
// 多个同名接口，定义的非函数的成员命名应该是不重复的，如果重复了，类型应该是相同的，否则将会报错。
// interface Info {
//     name: string;
// }
// interface Info {
//     age: number;
// }
// interface Info {
//     age: boolean; // 后续属性声明必须属于同一类型。属性“age”的类型必须为“number”，但此处却为类型“boolean”
// }

// 对于函数成员，每个同名函数成员都会被当成这个函数的重载，且合并时后面的接口具有更高的优先级。来看下多个同名函数成员的例子：
// interface Res {
//     getRes(input: string): number;
// }
// interface Res {
//     getRes(input: number): string;
// }
// const res: Res = {
//     getRes: (input: any): any => {
//         if(typeof input === 'string') return input.length;
//         else return String(input);
//     }
// }
// res.getRes('123').length; // 类型“number”上不存在属性“length”

/**
 * @合并命名空间
 */
// 同名命名空间最后会将多个命名空间导出的内容进行合并，如下面两个命名空间：
// namespace Validation {
//     export const checkNumber = () => {}
// }
// namespace Validation {
//     export const checkString = () => {}
// }

// 上面定义两个同名命名空间，效果相当于：
// namespace Validation {
//     export const checkNumber = () => {}
//     export const checkString = () => {}
// }


