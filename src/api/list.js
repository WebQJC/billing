import { base_api } from './index';

//获取设置的参数
export async function getPageSetting (parmas){
  const res = await base_api.post('billing/setting/getPageSetting', parmas)
  return res.data;
}

// 修改设置的参数
export async function updatePageSetting(parmas) {
  const res = await base_api.post('billing/setting/updatePageSetting', parmas)
  return res.data;
}

// // 取未开出停车场信息
// export async function getByPage(parmas) {
//   const res = await base_api.post('billing/product/getByPage', parmas);
//   return res.data;
// }

// 添加订单
export async function orderGetByPage(parmas) {
  const res = await base_api.post('billing/order/getByPage', parmas)
  return res.data;
}

// 获取新增的产品
export async function getProductByPage(parmas) {
  const res = await base_api.post('billing/product/getByPage', parmas)
  return res.data;
}

// 新增、编辑商品---新增商品界面
export async function getUpdateProduct(parmas) {
  const res = await base_api.post('billing/product/update', parmas)
  return res.data;
}

// 打印
export async function getPrint(parmas) {
  const res = await base_api.post('billing/order/addOrder', parmas)
  return res.data;
}


