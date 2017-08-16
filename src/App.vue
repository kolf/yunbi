<template>
  <div id="app">
    <div class="container">
      <div class="currency-box">
      
      <div class="well">
        <div class="media">
          <div class="media-left">
            <a href="#">
              <img class="media-object" data-src="holder.js/64x64" alt="64x64" style="width: 64px; height: 64px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNWRlOThkODQyYyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1ZGU5OGQ4NDJjIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy4xNzk2ODc1IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" data-holder-rendered="true">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{user.userName}}</h4>
            {{user.mobile}}
          </div>
        </div>
      </div>
      <div class="well">
        <table class="table currency-table">
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
              <h4 class="modal-title" id="myModalLabel">修改价格</h4>
            </div>
            <div class="modal-body">
              <form @submit.prevent="validateSubmit">
                <div class="form-group" :class="{'has-error': errors.has('highPrice')}">
                  <label class="control-label">最高价</label>
                  <div class="input-group">
                    <div class="input-group-addon">$</div>
                    <input type="number" v-validate="'required'" maxLength="6" minLength="1" class="form-control" name="highPrice" placeholder="请输入最高价" v-model="spyForm.highPrice">
                  </div>
                </div>
                <div class="form-group" :class="{'has-error': errors.has('lowPrice')}">
                  <label class="control-label">最低价</label>
                  <div class="input-group">
                    <div class="input-group-addon">$</div>
                    <input type="number" v-validate="'required'" maxLength="6" minLength="1" class="form-control" name="lowPrice" placeholder="请输入最低价" v-model="spyForm.lowPrice">
                  </div>
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
    toggleModal(show, item) {
      if (show) {
        this.spyForm.highPrice = item.highPrice
        this.spyForm.lowPrice = item.lowPrice
        this.showModal = show
        setTimeout(() => {
          this.inModal = show
        }, 150)
      } else {
        this.inModal = show
        setTimeout(() => {
          this.showModal = show
        }, 150)
      }
    },
    validateSubmit() {
      this.$validator.validateAll().then(() => {
        this.updateSpy()
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
          if (res.status === 200) {
            // alert('提交成功！')
            this.toggleModal(false)
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
