/**
 * @使用映射类型得到新的类型
 */

 /**
  * @基础
  */
//  TS 提供了借助旧类型创建一个新类型的方式，也就是映射类型，它可以用相同的形式去转换旧类型中每个属性。来看个例子：
// interface Info {
//    age: number;
// }

// 我们可以使用这个接口实现一个有且仅有一个 age 属性的对象，但如果我们想再创建一个只读版本的同款对象，那我们可能需要再重新定义一个接口，然后让 age 属性 readonly。如果接口就这么简单，你确实可以这么做，但是如果属性多了，而且这个结构以后会变，那就比较麻烦了。这种情况我们可以使用映射类型，下面来看例子：

// interface Info {
// 	age: number;
// }
// type ReadonlyType<T> = {
// 	readonly [P in keyof T]: T[P]; // 这里定义了一个ReadonlyType<T>映射类型
// }
// type ReadonlyInfo = ReadonlyType<Info>;
// let info: ReadonlyInfo = {
// 	age: 18
// };
// info.age = 28; // Cannot assign to 'age' because it is a read-only property

// 这个例子展示了如何通过一个普通的接口创建一个每个属性都只读的接口，这个过程有点像定义了一个函数，这个函数会遍历传入对象的每个属性并做处理。同理你也可以创建一个每个属性都是可选属性的接口：
// interface Info {
// 	age: number;
// }
// type ReadonlyType<T> = {
// 	readonly [P in keyof T]?: T[P];
// };
// type ReadonlyInfo = ReadonlyType<Info>;
// let info: ReadonlyInfo = {};

// 注意了，我们在这里用到了一个新的操作符 in，TS 内部使用了 for … in，定义映射类型，这里涉及到三个部分： 
// (1) 类型变量，也就是上例中的 P，它就像 for…in 循环中定义的变量，用来在每次遍历中绑定当前遍历到的属性名
// (2) 属性名联合，也就是上例中keyof T，它返回对象 T 的属性名联合；
// (3) 属性的结果类型，也就是 T[P]。

// 因为这两个需求较为常用，所以 TS 内置了这两种映射类型，无需定义即可使用，它们分别是Readonly和Partial。还有两个内置的映射类型分别是Pick和Record，它们的实现如下：
// type Pick<T, K extends keyof T> = {
// 	[P in K]: T[P];
// };
// type Record<K extends keyof any, T> = {
// 	[P in K]: T;
// };

// 先来使用一下 Pick，官方文档的例子并不完整，我们来看完整的例子：
// interface Info {
// 	name: string;
// 	age: number;
// 	address: string;
// }
// const Info: Info = {
// 	name: "lison",
// 	age: 18,
// 	address: "beijing"
// };
// function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
// 	let res = {} as Pick<T, K>;
// 	keys.forEach(key => {
// 		res[key] = obj[key];
// 	});
// 	return res;
// }
// const nameAndAddress = pick(info, ["name", "address"]); // { name: 'lison', address: 'beijing' }