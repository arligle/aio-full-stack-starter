declare namespace NodeJS {
  interface ProcessEnv {
    BASE_PATH?: string;
    CLUSTERING: string;
    LOG_LEVEL?: string;
    NODE_ENV: string;
    PORT: string;
  }
}

/*
declare namespace NodeJS 是在 TypeScript 中声明一个命名空间的语法。
命名空间 NodeJS 是 TypeScript 为 Node.js 提供的全局命名空间，
包含了 Node.js 环境中的所有类型声明。
在这个命名空间内，我们定义了一个接口 ProcessEnv。
接口 ProcessEnv 描述了 process.env 对象的结构，
process.env 是 Node.js 中用于访问环境变量的对象。

实际上就是利用 TypeScript 的类型检查能力确保环境变量的类型正确。
TypeScript 能自动检索到这个文件，并且根据这个文件的内容来检查环墿变量的类型。
*/
