<template>
  <div id="app">
    <div class="container">
      <div class="box">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>币种</th>
              <th>现价</th>
              <th>最高价</th>
              <th>最低价</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in currencys">
              <td>
                <img :src="'./assets/c_'+item.marketId+'.gif'" alt="">
              </td>
              <td>{{getCurrencyName(item.marketId)}}</td>
              <td>￥{{item.currentPrice}}</td>
              <td>
                <strong>￥{{item.highPrice}}</strong>
              </td>
              <td>
                <strong>￥{{item.lowPrice}}</strong>
              </td>
              <td>
                <button class="btn btn-primary" @click="toggleModal(true)">修改</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal fade in" tabindex="-1" role="dialog" :style="{'display': showModal? 'block' : 'none'}">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="toggleModal(false)">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title" id="myModalLabel">Modal title</h4>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row form-box">
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
                        <div @click="getVerifyCode" class="input-group-addon verify-code">{{verifyCode}}</div>
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
              </div> -->
    </div>
  </div>
</template>

<script>
import getUrlParam from './utils/getUrlParam'
import getCurrencyOptions from './utils/getCurrencyOptions'
import axios from 'axios'

const currencyMap = {
  1: 'BTC',
  14: 'EOS'
}

export default {
  name: 'app',
  data() {
    return {
      // verifyCode: '',
      currencys: [],
      showModal: false
      // spy: {
      //   marketId: '',
      //   t_price: 0,
      //   b_price: 0
      // }
    }
  },
  created() {
    this.getVerifyCode()
    const c = getUrlParam('c')
    if (c) {
      this.verifyUser(c)
    } else {
      alert('链接有误！')
    }
  },
  methods: {
    getCurrencyName(id) {
      return currencyMap[id]
    },
    getVerifyCode() {
      this.verifyCode = parseInt(Math.random() * (9999 - 1000) + 1000)
    },
    toggleModal(show){
      this.showModal = show
    },
    validateSubmit() {
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
            // this.spy.userId = mobile
            this.currencys = data
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
    // getCode() {
    //   axios.get('http://47.95.4.132:6009/user/getCode')
    //     .then((res) => {
    //       if (res.status === 200) {
    //         this.verifyCode = res.data
    //       }
    //     })
    // }
  }
}
</script>

<style lang="scss">
@import './styles/app.scss';
</style>
