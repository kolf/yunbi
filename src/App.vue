<template>
  <div id="app">
    <div class="container">
      <div class="currency-box">
        <div class="well">
          <h2 style="margin: 10px 0">{{user.userName}}
            <small>{{user.mobile}}</small>
          </h2>
        </div>
        <div class="well">
          <table class="table currency-table">
            <thead>
              <tr>
                <th>币种</th>
                <th>现价</th>
                <th>最高价</th>
                <th>最低价</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in currencys">
                <td>{{getCurrencyName(item.marketId)}}</td>
                <td>￥{{item.currentPrice}}</td>
                <td>
                  <strong>￥{{item.highPrice}}</strong>
                </td>
                <td>
                  <strong>￥{{item.lowPrice}}</strong>
                </td>
                <td>
                  <button class="btn btn-primary" @click="toggleModal(true, item)">修改</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div :class="{'in': inModal, 'modal fade': true}" tabindex="-1" role="dialog" :style="{'display': showModal? 'block' : 'none'}">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="toggleModal(false)">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">修改价格</h4>
            </div>
            <div class="modal-body">
              <form @submit.prevent="validateSubmit">
                <div class="form-group" :class="{'has-error': errors.has('highPrice')}">
                  <label class="control-label">最高价</label>
                  <div class="input-group">
                    <div class="input-group-addon">$</div>
                    <input type="number" v-validate="'required'" maxLength="6" minLength="1" class="form-control" name="highPrice" placeholder="请输入最高价" v-model="spyForm.t_price">
                  </div>
                  <span v-show="errors.has('highPrice')" class="help-block is-danger">最高价不能为空且只能是数字</span>
                </div>
                <div class="form-group" :class="{'has-error': errors.has('lowPrice')}">
                  <label class="control-label">最低价</label>
                  <div class="input-group">
                    <div class="input-group-addon">$</div>
                    <input type="number" v-validate="'required'" maxLength="6" minLength="1" class="form-control" name="lowPrice" placeholder="请输入最低价" v-model="spyForm.b_price">
                  </div>
                  <span v-show="errors.has('lowPrice')" class="help-block is-danger">最低价不能为空且只能是数字</span>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="toggleModal(false)">关闭</button>
              <button type="button" class="btn btn-primary" @click="validateSubmit">保存</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" :class="{'in': inModal, 'modal-backdrop fade': true}"></div>
    </div>
    <notifications position="top center" />
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
      showModal: false,
      inModal: false,
      spyForm: {},
      user: {},
      key: ''
      // spy: {
      //   marketId: '',
      //   t_price: 0,
      //   b_price: 0
      // }
    }
  },
  created() {
    this.getVerifyCode()
    this.key = getUrlParam('c')
    if (this.key) {
      this.verifyUser()
    } else {
      this.$notify({
        title: '链接错误',
        text: '链接错误!'
      })
    }
  },
  methods: {
    getCurrencyName(id) {
      return currencyMap[id]
    },
    getVerifyCode() {
      this.verifyCode = parseInt(Math.random() * (9999 - 1000) + 1000)
    },
    toggleModal(show, item) {
      if (show) {
        this.spyForm.t_price = item.highPrice
        this.spyForm.b_price = item.lowPrice
        this.spyForm.marketId = item.marketId
        this.spyForm.userId = this.key
        this.showModal = show
        setTimeout(() => {
          this.inModal = show
        }, 150)
      } else {
        this.spyForm = {}
        this.inModal = show
        setTimeout(() => {
          this.showModal = show
        }, 150)
      }
    },
    validateSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateSpy();
          return
        }

        // alert('error')
        // this.updateSpy()
      })
    },
    verifyUser() {
      const { key } = this
      axios.get('http://47.95.4.132:6009/user/verifyUser', {
        params: {
          key
        }
      })
        .then((res) => {
          if (res.status === 200) {
            const { data, userName, mobile } = res.data || []
            // this.spy.userId = mobile
            this.user = {
              userName,
              mobile
            }
            this.currencys = data
          }
        })
    },
    updateSpy() {
      console.log()
      axios.get('http://47.95.4.132:6009/user/updateSpy', {
        params: this.spyForm
      })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            const { message } = res.data
            this.$notify({
              title: '修改成功',
              text: message
            })
            this.toggleModal(false)
            this.verifyUser()
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
