/**
 * @使用模块封装代码
 */
// TypeScript 在 1.5 版本之前，有内部模块和外部模块的概念，从 1.5 版本开始，内部模块改称作命名空间（我们下个小节会讲），外部模块改称为模块。如果你对模块的知识一无所知，建议你先重点学习一下 CommonJS 模块系统和 ES6模块系统，TypeScript 中的模块系统是遵循 ES6 标准的，所以你需要重点学习 ES6 标准中的模块知识，这里推荐大家几个链接，大家可以在这里去学习一下：
// (1) CommonJS/AMD/CMD/ES6规范  http://www.mamicode.com/info-detail-1935796.html
// (2) ECMAScript6入门 - Module 的语法  http://es6.ruanyifeng.com/#docs/module

// TypeScript 和 ES6 保持一致，包含顶级 import 或 export 的文件都被当成一个模块，则里面定义的内容仅模块内可见，而不是全局可见。TypeScript 的模块除了遵循 ES6 标准的模块语法外，还有一些特定语法，用于类型系统兼容多个模块格式，下面我们来开始学习 TypeScript 模块。