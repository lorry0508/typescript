// 四种定义函数的方法：
// // 1.
// function add1(x: number, y: number) {
//     return x + y;
// }
// // 2.
// const add2: (x: number, y: number) => number;
// // 3.
// type add3 = (x: number, y: number) => number;
// // 3.
// interface add4 {
//     (x: number, y: number): number
// }


// 1.可选参数
function add1(x: number, y: number, z?: number) {
    return x + y;
}
add1(1, 2);
// 注意： 可选参数必须放在必选参数之后

// 2.默认参数
function add2(x: number, y = 2) {
    return x + y;
}
// 根据类型推断机制，参数y推断为number类型。

// 3.剩余参数
function add3(x: number, ...rest: number[]) {
    return x + rest.reduce((prev, curr) => prev + curr);
}
add3(1, 2, 3, 4, 5);
// 注意： 剩余参数必须在必选参数之后，可选参数允许和剩余参数共同出现在一个函数内

//4.函数重载
function add4(...rest: number[]): number;
function add4(...rest: string[]): string;
function add4(...rest: any[]): any {
    let first = rest[0];
    let type = typeof first;
    switch(type) {
        case 'number': 
            return rest.reduce((prev, curr) => prev + curr);
        case 'string':
            return rest.join('');
    }
    return null;
}
// 备注： 当调用改函数时，ts编译器能够选择正确的类型检查。在重载列表中，会从第一个函数开始检查，从上而下，所以我们使用函数重载时，应该把最容易用到的类型放在最上面。
// 注意：any类型函数不是重载列表的一部分