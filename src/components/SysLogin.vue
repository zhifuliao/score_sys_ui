<template>
    <head>
        <title>login</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    </head>

    <body>
        <!-- sys_rect (矩形) -->
        <div id="root">
            <img id="root_rect_img" src="../assets/login/sys_rect_u1.svg">
            <!-- login_form_rect (矩形) -->
            <img id="form_rect_img" src="../assets/login/login_form_rect_u2.svg" />
            <!-- login_label (矩形) -->
            <div id="login_label" class="text ">
                <p><span>用户登录</span></p>
            </div>
            <!-- account_input (文本框) -->
            <div id="account_input_rect">
                <img id="account_input_img" src="../assets/login/account_input_u4.svg" />
                <input id="account_input" type="text" placeholder="请输入账号" required v-model="account_val" />
            </div>
            <!-- account_icon (矩形) -->
            <img id="account_icon" src="../assets/login/account_icon_u5.svg" />
            <!-- pwd_input (文本框) -->
            <div id="pwd_input_rect">
                <img id="pwd_input_img" src="../assets/login/pwd_input_u6.svg" />
                <input id="pwd_input" type="password" placeholder="请输入密码" required v-model="pwd_val" />
            </div>
            <!-- pwd_icon (矩形) -->
            <img id="pwd_icon" src="../assets/login/pwd_icon_u7.svg" />
            <!-- auth_code_input (文本框) -->
            <div id="auth_code_input_rect">
                <img id="auth_code_input_img" src="../assets/login/auth_code_input_u8.svg" />
                <input id="auth_code_input" type="text" placeholder="请输入验证码" required v-model="auth_code_val" />
            </div>
            <!-- login_btn (矩形) -->
            <button id="login_btn" @click="Login">登录</button>
            <!-- auth_code_icon (矩形) -->
            <img id="auth_code_icon" src="../assets/login/auth_code_icon_u10.svg" />
            <!-- sys_icon_img (椭圆) -->
            <img id="sys_icon_img" src="../assets/login/sys_icon_img_u11.svg" />
            <!-- sys_label (矩形) -->
            <div id="sys_label" class="text">
                <p><span>学生成绩管理系统</span></p>
            </div>
            <!-- waring (提示信息) -->
            <div id="waring_text" class="text" v-text="waring_text"></div>
            <!-- remeber_pwd_checkbox (按钮) -->
            <input id="remeber_pwd_checkbox" type="checkbox" name="remeber_pwd_redio" value="remeber">
            <label id="remeber_pwd_checkbox_label" for="remeber_pwd_checkbox">记住密码</label>
            <!-- auth_code_img (图片) -->
            <img id="auth_code_img" v-if="auth_code_b64S" :src="auth_code_b64S" />
        </div>
    </body>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            account_val: "",
            pwd_val: "",
            auth_code_val: "",
            waring_text: "",
            auth_code_id: null,
            auth_code_b64S: null
        }
    },
    mounted() {
        this.GetAuthCode()
    },
    methods: {
        async GetAuthCode() {
            var ptr = this
            axios.get('http://127.0.0.1:8888/login', { params: { captcha_type: "string" } })
                .then(function (response) {
                    ptr.auth_code_id = JSON.parse(response.data)["auth_code_id"]
                    ptr.auth_code_b64S = JSON.parse(response.data)["auth_code_b64S"]
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        Login() {
            if (this.account_val == "") {
                this.waring_text = "请输入账号!"
                return
            } else if (this.pwd_val == "") {
                this.waring_text = "请输入密码!"
                return
            } else if (this.auth_code_val == "") {
                this.waring_text = "请输入验证码!"
                return
            }
            var ptr = this
            var obj = {
                account: this.account_val,
                pwd: this.pwd_val,
                auth_code: {
                    auth_code_id: this.auth_code_id,
                    auth_code_val: this.auth_code_val
                }
            }
            axios.post('http://127.0.0.1:8888/login', JSON.stringify(obj))
                .then(function (response) {
                    var login_flag = JSON.parse(response.data)["login_flag"]
                    if (login_flag == 1) { // 成功登录
                        ptr.$router.push(`/main_page/${ptr.account_val}`)
                    } else if (login_flag == 2) { // 验证码错误
                        ptr.waring_text = "验证码错误!"
                    } else { // 账号或者密码错误
                        ptr.waring_text = "账号或者密码错误!"
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        }
    },
}

</script>

<style>
body {
    margin: 0px;
    background-color: rgba(0, 105, 253, 0.996078431372549);
    background-image: url('../assets/login/bg.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-origin: border-box;
    position: relative;
    left: -0px;
    width: 1366px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
}

#root {
    position: absolute;
    left: 290px;
    top: 222px;
}

#root_rect_img {
    width: 870px;
    height: 498px;
    opacity: 0.06;
}

#form_rect_img {
    position: absolute;
    left: 430px;
    top: 0px;
    width: 430px;
    height: 488px;
}

#login_label {
    position: absolute;
    left: 505px;
    top: 82px;
    width: 300px;
    height: 40px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    font-weight: 400;
    font-size: 24px;
    text-align: center;
}

#account_input_rect {
    position: absolute;
    left: 558px;
    top: 163px;
    width: 233px;
    height: 42px;
}

#account_input {
    position: absolute;
    width: 233px;
    height: 42px;
    font-weight: 400;
    font-size: 13px;
    border-color: transparent;
}

#account_input_img {
    position: absolute;
    width: 233px;
    height: 42px;
}

#account_icon {
    position: absolute;
    left: 523px;
    top: 163px;
    width: 35px;
    height: 48px;
    opacity: 0.2;
}

#pwd_input_rect {
    position: absolute;
    left: 558px;
    top: 231px;
    width: 233px;
    height: 38px;
}

#pwd_input {
    position: absolute;
    width: 233px;
    height: 38px;
    font-weight: 400;
    font-size: 13px;
    border-color: transparent;
}

#pwd_input_img {
    position: absolute;
    width: 233px;
    height: 38px;
}

#pwd_icon {
    position: absolute;
    left: 523px;
    top: 231px;
    width: 35px;
    height: 44px;
    opacity: 0.2;
}

#auth_code_input_rect {
    position: absolute;
    left: 558px;
    top: 296px;
    width: 97px;
    height: 40px;
}

#auth_code_input_img {
    position: absolute;
    width: 97px;
    height: 40px;
}

#auth_code_input {
    position: absolute;
    width: 97px;
    height: 40px;
    font-weight: 400;
    font-size: 13px;
    border-color: transparent;
}

#login_btn {
    position: absolute;
    left: 523px;
    top: 374px;
    width: 268px;
    height: 40px;
    color: antiquewhite;
    background: inherit;
    background-color: rgba(22, 155, 213, 1);
    border: none;
    border-radius: 5px;
}

#auth_code_icon {
    position: absolute;
    left: 523px;
    top: 296px;
    width: 35px;
    height: 46px;
    opacity: 0.2;
}

#sys_icon_img {
    position: absolute;
    left: 175px;
    top: 150px;
    width: 124px;
    height: 121px;
}

#sys_label {
    position: absolute;
    left: 144px;
    top: 280px;
    width: 176px;
    height: 36px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 20px;
}

#remeber_pwd_checkbox {
    position: absolute;
    left: 523px;
    top: 350px;
}

#remeber_pwd_checkbox_label {
    position: absolute;
    left: 545px;
    top: 350px;
    font-size: 10px;
}

#waring_text {
    position: absolute;
    left: 523px;
    top: 422px;
    width: 268px;
    height: 19px;
    font-size: 16px;
    color: #FF0000;
}

#auth_code_img {
    position: absolute;
    left: 675px;
    top: 296px;
    width: 116px;
    height: 40px;
}
</style>