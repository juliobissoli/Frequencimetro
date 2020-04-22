<template>
  <div class="p-3 bg-white ">
    <span class="title">{{ title }}</span>
    <div class="list">
      <table class="table table-striped ">
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Dia</th>
            <th scope="col">Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in attendances" :key="index">
            <td class="p-1">{{ date(item.created_at) }}</td>
            <td class="p-1">{{ day(item.created_at) }}</td>
            <td class="p-1">{{ (item.hour * 1).toFixed(0) }} horas</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "AttendancesListy",
  props: ["attendances", "title"],
  methods: {
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
