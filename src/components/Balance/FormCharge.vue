<template>
  <div class="row">
    <div class="form-group col-md-6">
      <label>Mês</label>
      <select v-model="month" class="form-control">
        <option v-for="i in 12" :key="i" :value="formatMonth(i)">
          {{ formatMonth(i) }}
        </option>
      </select>
    </div>

    <div class="form-group col-md-6">
      <label>Ano</label>
      <div class="input-group input-group">
        <select v-model="year" class="form-control">
          <option v-for="i in 10" :key="i" :value="2019 + i">
            {{ 2019 + i }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group col-md-12">
      <label>Vencimento</label>
      <div class="input-group input-group">
        <input v-model="date_end" type="date" class="form-control" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "FormCharge",
  props: ["date_end", "year", "month", 'period'],
  methods: {
    formatMonth(item) {
      if (item) {
        var date =
          this.yearSelected + "-" + (item > 9 ? "0" + item : item) + "-10";
        return moment(date).format("MMM");
      }
    },
  },
  computed: {
    end_date: {
      get () {
        return moment(this.item.end_date).format('YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss')
      },
      set (date) {
        this.item.end_date = moment(date).format('YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD')
      }
    }
  },
};
</script>
