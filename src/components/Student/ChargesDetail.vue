<template>
  <div class="col-md-12">
    <div class="row p-0 my-2">
      <div class="col-6 pr-1">
        <Card
          clasIcon="fas fa-heartbeat"
          :today="dateFormat"
          subTitle="Faturas Pagas"
          classColor="success"
          title="201"
          class="shadow rounded"
        />
      </div>
      <div class="col-6 pl-1">
        <Card
          :today="dateFormat"
          clasIcon="fas fa-calendar-day"
          subTitle="Fauras Pendentes"
          class="shadow rounded"
          classColor="danger"
          :title="chartsPandin"
        />
      </div>
    </div>
    <h5>
      Mensalidades
    </h5>
    <div class="p-3 shadow bg-white rounded">
      <PaymentList
        :payments="paymentList"
        title="Mensalidades"
        :monthly_payment="item.payment"
        :student_id="item.id"
        :student_date="item.created_at"
        @updateApi="changeApi()"
      />
    </div>
    {{ paymentList }}
  </div>
</template>

<script>
import Card from '../CartExtats'
import PaymentList from '../Balance/PaymentList'

import api from '../../services/api'
import moment from 'moment'

export default {
  name: 'ChargeDetail',
  props: ['item'],
  components: { PaymentList, Card },

  data() {
    return {
      paymentList: [],
      chartsPandin: 0
    }
  },
  computed: {
    dateFormat() {
      return moment().format('ddd DD/MM')
    }
  },
  created() {
    this.getPayments()
  },
  methods: {
    async getPayments() {
      console.log('VAI FAZER O GET NO PAYMENT')

      try {
        await api.get('/charge/' + this.item.id).then((res) => {
          this.paymentList = res.data
          this.chartsPandin = this.countChartsPandin(res.data)
        })
      } catch (error) {
        console.log(error)
      }
    },
    countChartsPandin(list) {
      const count = list
        .map((el) => {
          return el.payments.length > 0 ? 0 : 1
        })
        .reduce((acc, i) => {
          return acc + i
        })
      return count
    },
    changeApi(){
      console.log('ta no update')
      this.getPayments()
    }
  }
}
</script>
