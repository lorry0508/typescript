// 在 JavaScript 中，命名空间能有效的避免全局污染。在 es6 引入了模块系统之后，命名空间就很少被使用了。但 TS 中依然实现了这个特性，尽管在模块系统中，我们不必考虑全局污染情况，但如果使用了全局的类库，命名空间仍然是一个比较好的解决方案。
namespace Shape {
    const pi = Math.PI;
    export function circle(r: number) {
        return pi * r ** 2
    }
}