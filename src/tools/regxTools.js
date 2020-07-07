//手机验证
export const regMobile = (rule, value, callback) => {
  const reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/
  if (!reg.test(value)) return callback(new Error("请输入合法的手机号"))
  callback()
}
