import axios from 'axios';
import { store } from '@/util';
import * as bill from './list';
import forMatePost from './formMate';
import { Toast, Indicator } from 'mint-ui';
import {client} from "../util/client";

let base_api = axios.create({
  baseURL: '/printer' + '/',
  timeout: 300000
});

base_api.interceptors.request.use(
  function (config) {
    Indicator.open();
    let token = store.cookie.get('token') || '53c7422300344d6e91e92f3f8f6e160f';
    if (token) {
      config.headers.token = token;
    }
    config.data = forMatePost(config.data);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
base_api.interceptors.response.use(
  function (config) {
    Indicator.close();
    // 全剧配置返回信息
    if (config.data.code === 1000) {
      return config;
    } else if(config.data.code === 1004) {
      Toast(config.data.msg);
      client.operation({opt: 'reLogin'});
      return config;
    } else {
      Toast(config.data.msg);
      return config;
    }
  },
  function (error) {
    console.log(error);
    Indicator.close();
    Toast('请求出错');
    return Promise.reject(error);
  }
);
export {
  base_api,
  bill
}
