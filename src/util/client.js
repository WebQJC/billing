// 1、登录失效 2、打印 3、上传图片
const u = navigator.userAgent;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

const client = {
  operation: function (postVal) {
    if (!postVal.opt) {
      return false;
    }
    let operationString = `wjxclient://${postVal.opt}`;
    let parmas = ''
    if (postVal.data) {
      if (typeof postVal.data === 'string') {
        parmas = postVal.data
      } else if (typeof postVal.data === 'object' && postVal.data !== null) {
        parmas = JSON.stringify(postVal.data)
      }
      operationString += `?data=${parmas}`
    }
    console.log(operationString);
    window.location.href = operationString;
  }
}

export {client}
