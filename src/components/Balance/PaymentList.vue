<template>
  <div class="bg-white">
    <MakePayment
      v-show="modalMakepayment"
      @close="modalMakepayment = false"
      :paymentData="paymentData"
    />
    <span class="title">{{ title }}</span>
    <div class="list">
      <table class="table table-striped">
        <slot v-if="monthly_payment">
          <thead>
            <tr>
              <th scope="col">Periodo</th>
              <th scope="col">Vencimento</th>
              <th scope="col">Valor cobrado</th>
              <th scope="col">Valor pago</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in payments"
              :key="index"
              style="cursor: pointer;"
              @click="mekePayment(item)"
            >
              <td class="p-1">{{ item.period }}</td>
              <td class="p-1">{{ date(item.date_end) }}</td>
              <td class="p-1">
                {{ itsPaid(item).monthly_payment }}
              </td>
              <td class="p-1">R${{ itsPaid(item).value }}</td>
              <td class="p-1 text-center">
                <span :class="itsPaid(item).badge">
                  {{ itsPaid(item).label }}
                </span>
              </td>
            </tr>
          </tbody>
        </slot>
      </table>
    </div>
  </div>
</template>

<script>
import MakePayment from '../Balance/Makepayment'

import moment from 'moment'

export default {
  name: 'PaymenstListy',
  props: ['payments', 'title', 'monthly_payment', 'student_id'],
  components: { MakePayment },
  data() {
    return {
      modalMakepayment: false,
      paymentData: null,
    }
  },
  methods: {
    itsPaid(item) {
      if (item.payments.length > 0) {
        return {
          monthly_payment: item.payments[0].charge_value,
          value: item.payments[0].value,
          badge: 'badge badge-success',
          label: 'pago',
          data_end: item.payments[0].date,
          income: true
        }
      } else {
        return {
          monthly_payment: this.monthly_payment,
          value: '0,00',
          badge: 'badge badge-danger',
          label: 'pendente',
          data_end: moment().format('YYYY-MM-DD'),
          income: false
        }
      }
    },
    mekePayment(item) {
      this.modalMakepayment = !this.modalMakepayment
      this.paymentData = {
        student_id: this.student_id,
        charge_id: item.id,
        period: item.period,
        value: this.itsPaid(item).monthly_payment,
        modeModal: this.itsPaid(item).income,
        date_end: this.itsPaid(item).data_end,
        charge_value: (this.itsPaid(item).income) ? this.itsPaid(item).value :this.itsPaid(item).monthly_payment 
      }
    },
    date(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    day(date) {
      return moment(date).format('dddd')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  font-size: 20px;
  font-weight: 100;
}
.list {
  max-height: 40vh;
  overflow-y: auto;
  padding: 10px;
}
table {
  th {
    border: none;
  }
  tr {
    font-size: 15px;
  }
}
</style>
