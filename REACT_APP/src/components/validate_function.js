// 撰寫資料檢驗的函式

// 資料空白
function x_isEmpty(dataStr){
  if(dataStr.trim().length == 0){
    return true;
  }else{
    return false;
  }
}
// 檢查 eMail
function x_isEmail(dataStr){
  let reg_Email = /^\w+((-\w+)|(.\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z]+$/;
  if (reg_Email.test(dataStr)){
    return true;
  }else{
    return false;
  }
}
// >=8位數字，簡易密碼
function x_isPassword(dataStr){
  let reg_password = /[a-zA-Z0-9]{8,}/;
  if (reg_password.test(dataStr)){
    return true;
  }else{
    return false;
  }
}
// 強型態密碼檢查 (8~20)
function x_isPassword_strong(dataStr){
  // 密碼的強度必須是包含大小寫字母和數位的組合，不能使用特殊字元，長度在8~20之間。
  // let reg_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

  // 密碼的強度必須是包含大小寫字母和數位的組合，使用特殊字元(!@#$%^&*?)，長度在8~20之間。
  let reg_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?]).{8,20}$/;

  if (reg_password.test(dataStr)){
    return true;
  }else{
    return false;
  }
}
// Mobile
function isMobile(dataStr){
  let reg_mobile = /^09\d{8}$/;
  if (reg_mobile.test(dataStr)){
    return true;
  }else{
    return false;
  }
}
