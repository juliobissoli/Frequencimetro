<template>
  <div class="bg-white ">
    <MakePayment v-show="modalMakepayment" @close="modalMakepayment = false" />
    <span class="title">{{ title }}</span>
    <div class="list">
      <table class="table table-striped ">
        <slot v-if="monthly_payment">
          <thead>
            <tr>
              <th scope="col">Periodo</th>
              <th scope="col">Vencimento</th>
              <th scope="col">Valor cobrado</th>
              <th scope="col">Valor pago</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in payments" :key="index">
              <td class="p-1">{{ item.period }}</td>
              <td class="p-1">{{ date(item.date_end) }}</td>
              <td class="p-1">{{ itsPaid(item).monthly_payment }}</td>
              <td class="p-1">R${{ itsPaid(item).value }}</td>
              <td class="p-1">
                <button
                  style="border:none"
                  class="btn btn-sm"
                  @click="modalMakepayment  =  !modalMakepayment"
                  :class="itsPaid(item).btn"
                >
                  <i :class="itsPaid(item).icon"></i>
                </button>
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

import moment from "moment";

export default {
  name: "PaymenstListy",
  props: ["payments", "title", "monthly_payment"],
  components: {MakePayment},
  data(){
    return {
      modalMakepayment: false,
    }
  },
  methods: {
    itsPaid(item) {
      if (item.payments.length > 0) {
        return {
          monthly_payment: item.payments[0].charge_value,
          value: item.payments[0].value,
          btn: "btn-outline-success",
          icon: "fas fa-check",
        };
      } else {
        return {
          monthly_payment: this.monthly_payment,
          value: "0,00",
          btn: "btn-outline-danger",
          icon: "fas fa-money-bill",
        };
      }
    },
    date(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    day(date) {
      return moment(date).format("dddd");
    },
  },
};
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
