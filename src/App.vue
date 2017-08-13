<template>
  <div id="app">
    <div class="container">
      <div class="row form-box">
        <div class="col-md-6 col-md-offset-3">
          <form class="" @submit.prevent="validateSubmit">
            <div class="form-group" :class="{'has-error': errors.has('userId')}">
              <label class="control-label">手机号</label>
               <input type="tel" class="form-control" readonly placeholder="请输入您的手机号" v-model="spy.userId"> 
            </div>
            <div class="form-group" :class="{'has-error': errors.has('verifyCode')}">
              <label class="control-label">验证码</label>
              <div class="input-group input-group-verify">
                <input type="text" maxlength="4" name="verifyCode" v-model="spy.code" v-validate="'required'" class="form-control" placeholder="请输入验证码">
                <div @click="getCode" class="input-group-addon verify-code">{{verifyCode}}</div>
              </div>
            </div>
            <div class="form-group" :class="{'has-error': errors.has('marketId')}">
              <label class="control-label">币种</label>
              <select class="form-control" v-model="spy.marketId" v-validate="'required'" name="marketId">
                <option value="">请选择币种</option>
                <option v-for="(currency, index) in currencys" v-bind:value="currency.value">{{currency.label}}</option>
              </select>
            </div>
            <div class="form-group" :class="{'has-error': errors.has('bPrice')}">
              <label class="control-label">最低价</label>
              <div class="input-group">
                <div class="input-group-addon">$</div>
                <input type="number" v-validate="'required'" maxLength="6" minLength="1" class="form-control" name="bPrice" placeholder="请输入最低价" v-model="spy.b_price">
              </div>
            </div>
            <div class="form-group" :class="{'has-error': errors.has('tPrice')}">
              <label class="control-label">最高价</label>
              <div class="input-group">
                <div class="input-group-addon">$</div>
                <input type="number" v-validate="'required'" maxLength="6" minLength="1" class="form-control" name="tPrice" placeholder="请输入最高价" v-model="spy.t_price">
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block">确定</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getUrlParam from './utils/getUrlParam'
import getCurrencyOptions from './utils/getCurrencyOptions'
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      verifyCode: '',
      currencys: [],
      spy: {
        marketId: '',
        t_price: 0,
        b_price: 0
      }
    }
  },
  created() {
    this.getCode()
    const c = getUrlParam('c')
    if (c) {
      this.verifyUser(c)
    } else {
      alert('链接有误！')
    }
  },
  methods: {
    // getVerifyCode() {
    //   this.verifyCode = parseInt(Math.random() * (9999 - 1000) + 1000)
    // },
    validateSubmit(){
      this.$validator.validateAll().then(() => {
				this.updateSpy()
			})
    },
    verifyUser(key) {
      axios.get('http://47.95.4.132:6009/user/verifyUser', {
        params: {
          key
        }
      })
        .then((res) => {
          if (res.status === 200) {
            const { data, mobile } = res.data || []
            this.spy.userId = mobile
            this.currencys = getCurrencyOptions(data)
          }
        })
    },
    updateSpy() {
      axios.get('http://47.95.4.132:6009/user/updateSpy', {
        params: this.spy
      })
        .then((res) => {
          if (res.status === 200) {
            alert('提交成功！')
          }
        })
    },
    getCode() {
      axios.get('http://47.95.4.132:6009/user/getCode')
        .then((res) => {
          if (res.status === 200) {
            this.verifyCode = res.data
          }
        })
    }
  }
}
</script>

<style lang="scss">
@import './styles/app.scss';
</style>
