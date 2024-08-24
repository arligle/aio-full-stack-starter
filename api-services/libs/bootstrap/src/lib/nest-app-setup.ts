import { FastifyAdapter } from "@nestjs/platform-fastify";

/*
TODO: 定义了一组方法函数，使用 NestJS 和 Fastify 构建和初始化配置 Web 应用程序。
*/

/**
 * @description 用于创建并返回一个 FastifyAdapter 实例
 * 为 Fastify 服务器提供了一个定制化的适配器，
 * 确保每个请求都有唯一的 ID，并限制了请求体的大小。
 */
export function buildFastifyAdapter() {
  return new FastifyAdapter({
    // TODO:
    // genReqId: (req: { headers: { [x: string]: any } }) => {
    //   const requestId = req.headers[REQUEST_ID_HEADER];
    //   return requestId || generateRandomId();
    // },
    bodyLimit: 10_485_760,
  });
}