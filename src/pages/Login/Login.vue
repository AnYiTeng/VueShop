<template>
  <div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on: loginType}" @click="loginMethod">短信登录</a>
            <a href="javascript:;" :class="{on: !loginType}" @click="loginMethod">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on: loginType}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phoneNumber"  name="phone" v-validate="'required|mobile'">
                <button :disabled="!isRightPhone || countDown>0" class="get_verification" @click.prevent="getYZM" :class="{getYzmBlack:isRightPhone}">
                  {{countDown > 0 ? `短信已发送${countDown}s`: '获取验证码'}}
                </button>
                <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code" name="code" v-validate="{required: true, regex: /^\d{6}$/}">
                <span style="color: red;">{{errors.first('code')}}</span>
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on: !loginType}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="用户名" v-model="name" name="用户名" v-validate="'required'">
                  <span style="color: red;">{{errors.first('用户名')}}</span>
                </section>
                <section class="login_verification">
                  <input :type="isPasswordShow ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd" name="密码" v-validate="'required'">
                  <div class="switch_button off"  @click="paswordSwitch" :class="isPasswordShow ? 'on' : 'off'">
                    <div class="switch_circle" :class="{circle_right:isPasswordShow}"></div>
                    <span class="switch_text">
                      {{isPasswordShow?'abc':''}}
                    </span>
                  </div>
                  <span style="color: red;">{{errors.first('密码')}}</span>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" name="验证码" v-validate="{required: true, regex: /^.{4}$/}">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" 
                    @click="getCaptcah" ref="captcha">
                  <span style="color: red;">{{errors.first('验证码')}}</span>
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { setInterval, clearInterval } from 'timers'
import throttle from 'lodash/throttle'
import {reqMsg, reqPhoneLogin, reqUserLogin} from '../../api/index'
import { Toast, MessageBox  } from 'mint-ui'
  export default {
    data() {
      return {
        loginType: true, // true短信登录 / false密码登录
        phoneNumber: '', // 手机号码,
        code: '', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 图像验证码

        countDown: 0, // 验证码倒计时
        isPasswordShow: false // 密码是否铭文显示 true 是 铭文显示  false 是 密码显示
      }
    },
    methods: {
      loginMethod () {
        this.loginType = !this.loginType // true 为 短信登录  false 为 密码登录
      },
      async getYZM () {
        // alert(111)
        this.countDown = 10
        const intervalID = setInterval(()=>{
          if (this.countDown === 0) {
            clearInterval(intervalID)
          }else{
            this.countDown--
          }
        }, 1000)

        // 发送短信验证码请求
        const result = await reqMsg(this.phoneNumber)
        if (result.code===0) {
          // alert('短信发送成功')
          Toast('短信发送成功')
        }else {
          // alert(result.msg)
          MessageBox.alert(result.msg)
          // 停止计时器让计时结束
          this.countDown=0
        } 
      },
      // 密码显示开关
      paswordSwitch () {
        this.isPasswordShow = !this.isPasswordShow
      },
      // 点击切换验证码图片
      getCaptcah () {
        this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now()
      },

      // 请求登录
      async login () {
        const {loginType, phoneNumber, code, name, pwd, captcha} = this

        let names
        if(loginType) {
          names = ['phone', 'code']
        } else {
          names = ['用户名', '密码', '验证码']
        }
        const success = await this.$validator.validateAll(names)
        if(success) {
          Toast('表单验证通过, 发送登陆请求')
        }
        let result
        if (loginType) { // 短信登录
          result = await reqPhoneLogin({phoneNumber, code})
          // 短信登录要清除计时
          this.countDown=0
        }else { // 密码登录
          result = await reqUserLogin({name, pwd, captcha})
          // 密码登录 失败 要更新 验证码图片 并 清空输入框
          if (result.code === 1) {
            this.getCaptcah()
            this.captcha = ''
          }
        }
        // 根据请求的结果进行相应的响应
        if (result.code === 0) {
          const user = result.data
          // 将用户信息保存到state中
          this.$store.dispatch('saveUser',user)

          // 跳转到个人中心页面
          this.$router.replace('/profile')          
        } else {
          MessageBox.alert(result.msg)
        }
      }
    },
    computed: {
      isRightPhone () {
        return /^1\d{10}$/.test(this.phoneNumber)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '../../common/stylus/mixins.styl'
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.getYzmBlack
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.circle_right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
