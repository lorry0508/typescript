/* 可以理解为字典。使用关键字enum定义，ts支持数字和字符串的枚举 */
/**
 * @数字枚举
 */
// enum Status {
//     Uploading,
//     Success,
//     Failed
// }
// console.log(Status.Uploading); // 0
// console.log(Status["Success"]); // 1
// console.log(Status.Failed); // 2
// 你可以使用’.‘操作符和’[]'两种形式访问里面的值，这和对象一样。

// 再来看输出的结果，Status.Uploading 是 0，Status['Success']是 1，Status.Failed 是 2，我们在定义枚举 Status 的时候，并没有指定索引号，是因为这是默认的编号，我们也可以自己指定：
// 修改起始编号
// enum Color {
//     Red = 2,
//     Blue,
//     Yellow
// }
// console.log(Color.Red, Color.Blue, Color.Yellow); // 2 3 4
// // 指定任意字段的索引值
// enum Status {
//     Success = 200,
//     NotFound = 404,
//     Error = 500
// }
// console.log(Status.Success, Status.NotFound, Status.Error); // 200 404 500
// // 指定部分字段，其余使用默认索引递增
// enum Status1 {
//     Ok = 200,
//     Created,
//     Accepted,
//     BadRequest = 400,
//     Unauthorized
// }
// console.log(Status1.Created, Status1.Accepted, Status1.Unauthorized); // 201 202 401

// 数字枚举在定义值的时候，可以使用计算值和常量。但是要注意，如果某个字段使用了计算值或常量，那么该字段后面紧接着的字段必须设置初始值，这里不能使用默认的递增值了，来看例子：
// const getValue = () => {
//     return 0;
// }
// enum ErrorIndex {
//     a = getValue(),
//     b, // error, 枚举成员必须具有初始化的值
//     c
// }
// enum RightIndex {
//     a = getValue(),
//     b = 1,
//     c
// }
// const Start = 1;
// enum Index {
//     a = Start,
//     b, // error, 枚举成员必须具有初始化的值
// }

/**
 * @反向映射
 */
// TypeScript 还支持反向映射，但是反向映射只支持数字枚举
// enum Status {
//     Success = 200,
//     NotFound = 404,
//     Error = 500
// }
// console.log(Status["Success"]); // 200
// console.log(Status[200]); // Success
// console.log(Status[Status["Success"]]); // Success
// TypeScript 中定义的枚举，编译之后其实是对象，我们来看下上面这个例子中的枚举值 Status 编译后的样子：


/**
 * @字符串枚举
 */
// 字符串枚举值要求每个字段的值都必须是字符串字面量，或者是该枚举值中另一个字符串枚举成员
// enum Message {
//     Error = 'Sorry, error',
//     Success = 'Success'
// }
// console.log(Message.Error); // Sorry, error

// 再来看我们使用枚举值中其他枚举成员的例子：
// enum Message {
//     Error = 'Error, message',
//     ServerError = Error,
//     ClientError = Error
// }
// console.log(Message.Error); // Error, message
// console.log(Message.ServerError); // Error, message
// // 注意，这里的其他枚举成员指的是同一个枚举值中的枚举成员，因为字符串枚举不能使用常量或者计算值，所以也不能使用其他枚举值中的成员。

/**
 * @异构枚举
 */
// 简单来说异构枚举就是枚举值中成员值既有数字类型又有字符串类型，如下：
// enum Result {
//     Failed = 0,
//     Success = 'Success'
// }
// // 但是这种如果不是真的需要，不建议使用。因为往往我们将一类值整理为一个枚举值的时候，它们的特点是相似的。比如我们在做接口请求时的返回状态码，如果是状态码都是数值，如果是提示信息，都是字符串，所以在使用枚举的时候，往往是可以避免使用异构枚举的，重点是做好类型的整理。


/**
 * @枚举成员类型和联合枚举类型
 */
// 如果枚举值里所有成员的值都是字面量类型的值，那么这个枚举的每个成员和枚举值本身都可以作为类型来使用，先来看下满足条件的枚举成员的值有哪些：
/* 
    1.不带初始值的枚举成员，例如enum E { A }
    2.值为字符串字面量，例如enum E { A = ‘a’ }
    3.值为数值字面量，或者带有-符号的数值字面量，例如enum E { A = 1 }、enum E { A = -1 }
*/
// 当我们的枚举值的所有成员的值都是上面这三种情况的时候，枚举值和成员就可以作为类型来用：

/**
 * @枚举成员类型
 */
// 我们可以把符合条件的枚举值的成员作为类型来使用，来看例子：
// enum Animal {
//     Dog = 1,
//     Cat = 2
// }
// interface Dog {
//     type: Animal.Dog; // 这里使用Animal.Dog作为类型，指定接口Dog的必须有一个type字段，且类型为Animal.Dog
// }
// interface Cat {
//     type: Animal.Cat;
// }
// let cat1: Cat = {
//     type: Animal.Dog, // error, [ts] 不能将类型“Animal.Dog”分配给类型“Animal.Cat”
// }
// let dog: Dog = {
//     type: Animal.Dog,
// }

/**
 * 联合枚举类型
 */
// 当我们的枚举值符合条件时，这个枚举值就可以看做是一个包含所有成员的联合类型，先来看例子：
// enum Status {
//     Off,
//     On
// }
// interface Light {
//     status: Status;
// }
// enum Animal {
//     Dog = 1,
//     Cat = 2
// }
// // const light1: Light = {
// //     status: Animal.Dog // error, 不能将类型“Animal.Dog”分配给类型“Status”
// // };
// const light2: Light = {
//     status: Status.Off
// };
// const light3: Light = {
//     status: Status.On
// };
// // 上面例子定义接口 Light 的 status 字段的类型为枚举值 Status，那么此时 status 的属性值必须为 Status.Off 和 Status.On 中的一个，也就是相当于status: Status.Off | Status.On。


/**
 * @运行时的枚举
 */
