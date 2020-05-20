<template>
  <div>
    <div class="head">
      <a class="topHeadA" href="">
        <img class="topImg" src="../assets/logo.png" />
      </a>
    </div>
    <div class="wrapper">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="用户名">
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your username!'
                  }
                ]
              }
            ]"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!'
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              }
            ]"
            type="new-password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="确认密码"
          has-feedback
          v-if="register_show"
        >
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [
                  {
                    required: true,
                    message: '请再次输入你的密码!'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              }
            ]"
            type="new-password"
            @blur="handleConfirmBlur"
            placeholder="请再次输入密码"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="手机号"
          v-if="register_show"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your phone!'
                  },
                  {
                    validator: validateToPhone
                  }
                ]
              }
            ]"
            placeholder="请输入手机号"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="E-mail"
          v-if="register_show"
        >
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              }
            ]"
            placeholder="请输入邮箱"
          />
        </a-form-item>
        <a-form-item>
          <div>
            <a-button type="primary" html-type="submit">
              {{ register_show ? "注册" : "登录" }}
            </a-button>
            <a-button type="primary" class="register" @click="register">
              {{ register_show ? "返回" : "注册" }}
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import login from '../api/login'
export default {
  data() {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 6,
            offset: 4
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 6
          }
        }
      },
      register_show: false // 判断当前是否进入注册页面
    }
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: 'Submit'
    })
  },

  methods: {
    register(e) {
      if (!this.$data.register_show) {
        this.$data.register_show = true
      } else {
        this.$data.register_show = false
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          if (this.register_show) {
          } else {
            console.log(login.loginup)
            login.loginup(values, e => {
              console.log(e)
            })
          }
        }
      })
    },
    validateToPhone(rule, value, callback) {
      // const form = this.form
      if (value && this.confirmDirty) {
        // form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    validateToNextPassword(rule, value, callback) {
      // const form = this.form
      if (value && this.confirmDirty) {
        // form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      let errorinfo = ''
      if (value && value !== form.getFieldValue('password')) {
        errorinfo = '两次密码不一致'
      } else {
        errorinfo = undefined // 返回undefined可以使结果出来
      }
      callback(errorinfo)
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    }
  }
}
</script>

<style scoped lang="less">
.head {
  background-color: #171717;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  .topHeadA {
    color: #337ab7;
    background-color: transparent;

    .topImg {
      max-width: 100%;
      border: 0;
      width: 162px;
      height: 49px;
    }
  }
}

.wrapper {
  margin: 80px auto;
}

.register {
  margin-left: 5rem;
}
</style>
