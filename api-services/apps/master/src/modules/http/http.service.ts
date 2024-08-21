import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import { NormalException } from '@/master/exception';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ECONNREFUSED } from 'node:constants';
/**
 * @description 通过封装 axios 实例，提供了一组常用的 HTTP 方法，
 * 并通过拦截器机制处理请求和响应的日志记录和错误处理。
 * @class HttpService
 */
@Injectable()
export class HttpService {
  private instance: AxiosInstance;

  private logger = new Logger(HttpService.name);

  constructor() {
    const instance = axios.create({
      timeout: 5000,
    });

    instance.interceptors.request.use(
      // 在发送请求之前做一些事情
      (config) => {
        return config;
      },
      // 执行请求错误的操作
      (error) => {
        this.logger.error(error.toJSON());
      }
    );

    instance.interceptors.response.use(
      // 任何位于 2xx 范围内的状态代码都会导致此函数触发
      (response) => {
        if (response?.data) this.logger.debug(response.data);

        return response;
      },
      // 任何超出 2xx 范围的状态代码都会导致此功能触发
      (error) => {
        if (error.errno === ECONNREFUSED * -1)
          throw NormalException.HTTP_REQUEST_TIMEOUT();

        if (axios.isAxiosError(error)) {
          if (error?.response?.data) this.logger.debug(error.response.data);
          this.logger.error(error.toJSON());
          return;
        }

        this.logger.error(error);
      }
    );

    this.instance = instance;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.delete(url, config))?.data;
  }

  async get<T = any, C = any>(
    url: string,
    config?: AxiosRequestConfig<C>
  ): Promise<T> {
    return (await this.instance.get(url, config))?.data;
  }

  getInstance() {
    return this.instance;
  }

  async head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.head(url, config))?.data;
  }

  async options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.options(url, config))?.data;
  }

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.instance.patch(url, data, config))?.data;
  }

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.instance.post(url, data, config))?.data;
  }

  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.instance.put(url, data, config))?.data;
  }
}
