<template>
  <div class="bg-white">
    <MakePayment
      v-show="modalMakepayment"
      @close="modalMakepayment = false"
      @updateApi="$emit('updateApi')"
      :paymentData="paymentData"
      :editiPayment="editMode"
      :id_payment="payment_id"
      :charge_id="charge_id"
    />
    <span class="title">{{ title }}</span>
    <div class="list">
      <table class="table table-striped">
        <slot v-if="student_id">
          <thead>
            <tr>
              <th scope="col">Período</th>
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
                {{
                  paindOut(item)
                    ? item.payments[0].charge_value
                    : monthly_payment
                }}
              </td>
              <td class="p-1">
                R${{ paindOut(item) ? item.payments[0].value : ' ---' }}
              </td>
              <td class="p-1 text-center">
                <span
                  class="badge"
                  :class="paindOut(item) ? 'badge-success' : 'badge-danger'"
                >
                  {{ paindOut(item) ? 'pago' : 'pendente' }}
                </span>
              </td>
            </tr>
          </tbody>
        </slot>
        <slot v-else>
          <thead>
            <tr>
              <th scope="col">Período</th>
              <th scope="col">Aluno</th>
              <th scope="col">Data</th>
              <th scope="col">Valor pago</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in payments"
              :key="index"
              style="cursor: pointer;"
              @click="mekePayment(item)"
            >
              <td class="p-1">
                {{ (item.charges ? item.charges.period : '') }}
              </td>
              <td class="p-1">
                {{ (item.students ? item.students.name : '') }}
              </td>
              <td class="p-1">{{ date(item.date) }}</td>
              <td class="p-1 text-center">{{ item.value }}</td>

            </tr>
          </tbody>
        </slot>
      </table>
    </div>
    <Pagination
      @change-page="changePage"
      :perPage="perPage"
      :currentPage="currentPage"
      :total="total"
    />
  </div>
</template>

<script>
import MakePayment from '../Balance/Makepayment'
import Pagination from '../Pagination'

import moment from 'moment'

export default {
  name: 'PaymenstListy',
  props: ['payments', 'title', 'monthly_payment', 'student_id', 'student_date'],
  components: { MakePayment, Pagination },
  data() {
    return {
      editMode: true,
      modalMakepayment: false,
      paymentData: null,
      payment_id: null,
      charge_id: null,
      currentPage: 1,
      perPage: 10,
      total: 30,
    }
  },
  methods: {
    paindOut(item) {
      if (this.student_id) {
        if (item.payments.length > 0) return true
        else return false
      }
      return true
    },

    mekePayment(item) {
      this.modalMakepayment = !this.modalMakepayment

      if (this.student_id) {
        this.editMode = this.paindOut(item)
        this.paymentSelecte = item.payments.id
        this.payment_id = this.paindOut(item) ? item.payments[0].id : null
        this.charge_id = item.id

        this.paymentData = {
          student_id: this.student_id,
          charge_id: item.id,
          period: item.period,
          value: this.paindOut(item)
            ? item.payments[0].value
            : this.monthly_payment,
          date_end: this.paindOut(item) ? item.date_end : this.today,
          charge_value: this.paindOut(item)
            ? item.payments[0].charge_value
            : this.monthly_payment
        }
      } else {
        this.payment_id = item.id
        this.charge_id = item.charges.id

        this.paymentData = {
          period: item.charges.period,
          value: item.value,
          date_end: item.charges.date_end,
          charge_value: item.charge_value
        }
      }

    },

    changePage(page){
      this.currentPage = page
      this.$emit('updateApi', page)
    },
    date(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    day(date) {
      return moment(date).format('dddd')
    },
    today() {
      return moment().format('YYYY-MM-DD')
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
  // max-height: 40vh;
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
