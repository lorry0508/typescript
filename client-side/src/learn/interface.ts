/**
 * @基本用法
 */
// 我们需要定义这样一个函数，参数是一个对象，里面包含两个字段：firstName 和 lastName，也就是英文的名和姓，然后返回一个拼接后的完整名字。来看下函数的定义：
// 注：这段代码为纯JavaScript代码，请在JavaScript开发环境编写下面代码，在TypeScript环境会报一些类型错误
// const getFullName = ({ firstName, lastName }) => {
//     return `${firstName} ${lastName}`;
// };

// 使用时传入参数：
// getFullName({
//     firstName: "Lison",
//     lastName: "Li"
//   }); // => 'Lison Li'

// 没有问题，我们得到了拼接后的完整名字，但是使用这个函数的人如果传入一些不是很理想的参数时，就会导致各种结果：
// getFullName(); // Uncaught TypeError: Cannot destructure property `a` of 'undefined' or 'null'.
// getFullName({ age: 18, phone: "13312345678" }); // 'undefined undefined'
// getFullName({ firstName: "Lison" }); // 'Lison undefined'

// 这些都是我们不想要的，在开发时难免会传入错误的参数，所以 TypeScript 能够帮我们在编译阶段就检测到这些错误。我们来完善下这个函数的定义：
// const getFullName = ({
//     firstName,
//     lastName
// }: { // 指定这个参数的类型，因为他是一个对象，所以这里来指定对象中每个字段的类型
//     firstName: string, // 指定属性名为firstName和lastName的字段的属性值必须为string类型
//     lastName: string
// }) => {
//     return `${firstName}${lastName}`;
// }
// // 我们通过对象字面量的形式去限定我们传入的这个对象的结构，现在再来看下之前的调用会出现什么提示：
// getFullName(); // 应有1个参数，但获得0个
// getFullName({ age: 18, phone: 123456789 }); // 类型“{ age: number; phone: number; }”的参数不能赋给类型“{ firstName: string; lastName: string; }”的参数。
// getFullName({ firstName: "Lison" }); // 缺少必要属性lastName

// 这些都是在我们编写代码的时候 TypeScript 提示给我们的错误信息，这样就避免了在使用函数的时候传入不正确的参数。接下来我们用这节课要讲的接口来书写上面的规则，我们使用interface来定义接口：
// interface Info {
//     firstName: string;
//     lastName: string
// }
// const getFullName = ({firstName, lastName}: Info) => {
//     return `${firstName}${lastName}`
// }
// 注意在定义接口的时候，你不要把它理解为是在定义一个对象，而要理解为{}括号包裹的是一个代码块，里面是一条条声明语句，只不过声明的不是变量的值而是类型。声明也不用等号赋值，而是冒号指定类型。每条声明之前用换行分隔即可，或者也可以使用分号或者逗号，都是可以的。

/**
 * @可选属性
 */
// 当我们定义一些结构的时候，一些结构对于某些字段的要求是可选的，有这个字段就做处理，没有就忽略，所以针对这种情况，typescript为我们提供了可选属性。
// 我们先定义一个描述传入蔬菜信息的句子的函数：
// const getVegetables = ({color, type}) => {
//     return `A${color ? color + "" : ""}${type}`;
// }
// 我们可以看到这个函数中根据传入对象中的 color 和 type 来进行描述返回一句话，color 是可选的，所以我们可以给接口设置可选属性，在属性名后面加个?即可：
// interface Vegetables {
//     color?: string;
//     type: string;
// }


/**
 * @多余属性检查
 */
// getVegetables({
//     type: 'tomato',
//     size: 'big' // error, 'size'不在类型'Vegetables'中
// })
// 我们看到，传入的参数没有 color 属性，但也没有错误，因为它是可选属性。但是我们多传入了一个 size 属性，这同样会报错，TypeScript 会告诉你，接口上不存在你多余的这个属性。只要接口中没有定义这个属性，就会报错，但如果你定义了可选属性 size，那么上面的例子就不会报错。
// 这里可能 tslint 会报一个警告，告诉我们属性名没有按开头字母顺序排列属性列表，如果你想关闭这条规则，可以在 tslint.json 的 rules 里添加"object-literal-sort-keys": [false]来关闭。


/**
 * @绕开多余属性检查
 */
// 有时我们并不希望 TypeScript 这么严格地对我们的数据进行检查，比如我们只需要保证传入getVegetables的对象有type属性就可以了，至于实际使用的时候传入对象有没有多余的属性，多余属性的属性值是什么类型，这些都无所谓，那就需要绕开多余属性检查，有如下三个方法：

// (1)使用类型断言
// 我们在基础类型中讲过，类型断言就是用来明确告诉 TypeScript，我们已经自行进行了检查，确保这个类型没有问题，希望 TypeScript 对此不进行检查，所以最简单的方式就是使用类型断言：
interface Vegetables {
    color?: string;
    type: string
}
const getVegetables = ({color, type}: Vegetables) => {
    return `A${color ? color + "" : ""}${type}`;
};
getVegetables({
    type: "tomato",
    size: 12,
    price: 1.2
} as Vegetables);

// (2)添加索引标签
// 更好的方式是添加字符串索引签名，索引签名我们会在后面讲解，先来看怎么实现：

