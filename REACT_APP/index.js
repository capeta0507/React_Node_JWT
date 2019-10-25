// 網頁 load 完成 ready
$().ready(function(){
  $("#mainForm").on("submit",function(e){
    e.preventDefault();
    submitHandle(e);
  })
});

// *-----------------------------------------*
// *-- Submit 處理程序 ------------------------*
// *-- 驗證 1 資料必須填寫 ---------------------*
// *-- 驗證 2 Regex 資料驗證 ------------------*
// *-- 驗證 3 其他特殊規定 ---------------------*
// *-----------------------------------------*
function submitHandle(e){
  // 驗收資料
  let my_email = $("#email").val().trim();
  let my_password = $("#password").val().trim();
  let my_confirm_password = $("#confirm_password").val().trim();
  let my_username = $("#username").val().trim();
  let my_birthdate = $("#birthdate").val().trim();
  let my_country = $("#country").val().trim();
  let my_mobile = $("#mobile").val().trim();
  // console.log(my_email);
  // console.log(my_email.length);
  // message
  let my_email_message = $("#email_message");
  let my_password_message = $("#password_message");
  let my_confirm_password_message = $("#confirm_password_message");
  let my_username_message = $("#username_message");
  let my_birthdate_message = $("#birthdate_message");
  let my_country_message = $("#country_message");
  let my_mobile_message = $("#mobile_message");

  // console.log(my_email_message.html());

  let error_Count = 0;
  // TODO: 1. 所有資料必填 str.length

  // Email
  // console.log('email len : ',my_email.length);
  if (x_isEmpty(my_email)){
    my_email_message.html("Email 是必填的欄位");
    error_Count ++;
  } else {
    my_email_message.html("");
  }

  // password
  if (x_isEmpty(my_password)){
    my_password_message.html("密碼 是必填的欄位");
    error_Count ++;
  } else {
    my_password_message.html("");
  }

  // confirm_password
  if (x_isEmpty(my_confirm_password)){
    my_confirm_password_message.html("確認密碼 是必填的欄位");
    error_Count ++;
  } else {
    my_confirm_password_message.html("");
  }

  // username
  if (x_isEmpty(my_username)){
    my_username_message.html("使用者名稱 是必填的欄位");
    error_Count ++;
  } else {
    my_username_message.html("");
  }

  // birthdate
  if (x_isEmpty(my_birthdate)){
    my_birthdate_message.html("生日 是必填的欄位");
    error_Count ++;
  } else {
    my_birthdate_message.html("");
  }

  // country (不能為 0)
  if (my_country === '0'){
    my_country_message.html("所在地 是必填的欄位");
    error_Count ++;
  } else {
    my_country_message.html("");
  }

  // mobile
  if (x_isEmpty(my_mobile)){
    my_mobile_message.html("手機 是必填的欄位");
    error_Count ++;
  } else {
    my_mobile_message.html("");
  }

  console.log("TODO 1",error_Count);
  if (error_Count > 0 ){
    // 代表  TODO 1 有錯誤，不必檢查下去
    return false;
  }

  // TODO: 2. Regex 驗證

  // Email
  if (x_isEmail(my_email)){
    my_email_message.html("");
  }else{
    my_email_message.html("Email 無效");
    error_Count ++;
  }

  // // password
  // if (x_isPassword(my_password)){
  //   my_password_message.html("");
  // }else{
  //   my_password_message.html("密碼無效，至少8位英數字");
  //   error_Count ++;
  // }
  // password 強度
  // 密碼的強度必須是包含大小寫字母和數位的組合，不能使用特殊字元，長度在8-10之間。
  if (x_isPassword_strong(my_password)){
    my_password_message.html("");
  }else{
    my_password_message.html("密碼必須包含大小寫字母和數位的組合，使用特殊字元(!@#$%^&*?)，長度在8~20之間");
    error_Count ++;
  }

  // // confirm_password
  if (x_isPassword(my_confirm_password)){
    my_confirm_password_message.html("");
  }else{
    my_confirm_password_message.html("密碼無效，至少8位英數字");
    error_Count ++;
  }

  // // 密碼雙重確認
  if (my_password === my_confirm_password ){
    my_confirm_password_message.html("");
  }else{
    my_confirm_password_message.html("密碼確認錯誤");
    error_Count ++;
  }

  // username (有填就好)

  // mobile
  if (isMobile(my_mobile)){
    my_mobile_message.html("");
  }else{
    my_mobile_message.html("手機無效，必須符合台灣規格");
    error_Count ++;
  }

  console.log("TODO 2",error_Count);
  if(error_Count > 0){
    return false;
  }

  // TODO: 3.特別規定

  // 所在地 必須是高雄
  if (my_country === "KS") {
    my_country_message.html("");
  }else{
    my_country_message.html("本檔活動在高雄舉行");
    error_Count ++;
  }

  console.log("TODO 3",error_Count);
  if(error_Count > 0) {
    // 資料驗證有誤
    return false;
  }else{
    // 資料填寫完卻正確
    let my_Data = {
      email:my_email,
      password:my_password,
      username:my_username,
      birthdate:my_birthdate,
      country:my_country,
      mobile:my_mobile
    }
    console.table(my_Data)
    alert("填寫完成...謝謝");
    // 進行後續處理
  }
}