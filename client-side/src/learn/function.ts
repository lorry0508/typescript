/**
 * @函数类型
 */
// (1)为函数定义参数
// 我们可以给函数定义类型，这个定义包括对参数和返回值的类型定义，我们先来看简单的定义写法：
// function add(arg1: number, arg2: number): number {
//     return x + y;
// }
// const add = (arg1: number, arg2: number): number => {
//     return x + y;
// }
// 在上面的例子中我们用function和箭头函数两种形式定义了add函数，以展示如何定义函数类型。这里参数 arg1 和 arg2 都是数值类型，最后通过相加得到的结果也是数值类型。

// 如果在这里省略参数的类型，TypeScript 会默认这个参数是 any 类型；如果省略返回值的类型，如果函数无返回值，那么 TypeScript 会默认函数返回值是 void 类型；如果函数有返回值，那么 TypeScript 会根据我们定义的逻辑推断出返回类型。

// (2)完整的函数类型
// 一个函数的定义包括函数名、参数、逻辑和返回值。我们为一个函数定义类型时，完整的定义应该包括参数类型和返回值类型。上面的例子中，我们都是在定义函数的指定参数类型和返回值类型。接下来我们看下，如何定义一个完整的函数类型，以及用这个函数类型来规定一个函数定义时参数和返回值需要符合的类型。先来看例子然后再进行解释：
// let add: (x: number, y: number) => number;
// add = (arg1: number, arg2: number): number => arg1 + arg2;
// add = (arg1: string, arg2: string): string => arg1 + arg2;
// 上面这个例子中，我们首先定义了一个变量 add，给它指定了函数类型，也就是(x: number, y: number) => number，这个函数类型包含参数和返回值的类型。然后我们给 add 赋了一个实际的函数，这个函数参数类型和返回类型都和函数类型中定义的一致，所以可以赋值。后面我们又给它赋了一个新函数，而这个函数的参数类型和返回值类型都是 string 类型，这时就会报如下错误：
// 不能将类型"(arg1: string, arg2: string) => string"分配给类型"(x: number, y: number) => number"。
//   参数"arg1"和"x" 的类型不兼容。
//   不能将类型"number"分配给类型"string"。

// 函数中如果使用了函数体之外定义的变量，这个变量的类型是不体现在函数类型定义的。

// (3) 使用接口定义函数类型
// 我们在前面的小节中已经学习了接口，使用接口可以清晰地定义函数类型。还拿上面的 add 函数为例，我们为它使用接口定义函数类型：
// interface Add {
//     (x: number, y: number): number;
// }
// let add: Add = (arg1: string, arg2: string): string => arg1 + arg2; // error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
// 这里我们通过接口的形式定义函数类型，这个接口Add定义了这个结构是一个函数，两个参数类型都是number类型，返回值也是number类型。然后我们指定变量add类型为Add时，再要给add赋值，就必须是一个函数，且参数类型和返回值类型都要满足接口Add，显然例子中这个函数并不满足条件，所以报错了。

