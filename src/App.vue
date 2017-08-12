<template>
  <div id="app">
    <div class="container">
      <div class="row form-box">
        <div class="col-md-6 col-md-offset-3">
          <form class="">
            <div class="form-group">
              <label for="phone">手机号</label>
              <input type="tel" class="form-control" id="phone" placeholder="请输入您的手机号" v-model="spy.userId">
            </div>
            <div class="form-group">
              <label for="phone">验证码</label>
              <div class="input-group input-group-verify">
                <input type="text" class="form-control" placeholder="请输入验证码">
                <div @click="getVerifyCode" class="input-group-addon verify-code">{{verifyCode}}</div>
              </div>
            </div>
            <div class="form-group">
              <label for="product">币种</label>
              <select class="form-control" v-model="spy.marketId">
                <option value="-1">请选择币种</option>
                <option v-for="(currency, index) in currencys" v-bind:value="currency.value">{{currency.label}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="minPrice">最低价</label>
              <div class="input-group">
                <div class="input-group-addon">$</div>
                <input type="number" class="form-control" id="minPrice" placeholder="请输入最低价" v-model="spy.b_price">
              </div>
            </div>
            <div class="form-group">
              <label for="maxPrice">最高价</label>
              <div class="input-group">
                <div class="input-group-addon">$</div>
                <input type="number" class="form-control" id="maxPrice" placeholder="请输入最高价" v-model="spy.t_price">
              </div>
            </div>
            <button @click="updateSpy" class="btn btn-primary btn-block">确定</button>
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
        marketId: '-1'
      }
    }
  },
  created() {
    this.getVerifyCode()
    const c = getUrlParam('c')
    if(c){
      this.verifyUser(c)
    }else{
      alert('链接有误！')
    }
  },
  methods: {
    getVerifyCode() {
      this.verifyCode = parseInt(Math.random() * (9999 - 1000) + 1000)
    },
    verifyUser(key) {
      axios.get('http://47.95.4.132:6009/user/verifyUser', {
        params: {
          key
        }
      })
        .then((res) => {
          if (res.status === 200) {
            const { data } = res.data || []
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
    }
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%
}

body {
  background: #e8e8e8
}

.form-box {
  padding: 100px 10px;
  margin: 60px 0;
  background: #fff;
  box-shadow: 0 0 20px #ccc
}

.form-control,
.btn,
.input-group-addon {
  border-radius: 2px
}

.verify-code {
  cursor: pointer;
}
</style>
