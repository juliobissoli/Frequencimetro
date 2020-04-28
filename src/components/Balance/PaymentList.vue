<template>
  <div class="bg-white ">
    <span class="title">{{ title }}</span>
    <div class="list">
      <table class="table table-striped ">
        <thead>
          <tr>
            <th scope="col">Aluno</th>
            <th scope="col">Periodo</th>
            <th scope="col">Data pagamento</th>
            <th scope="col">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-1">Felipe Melo</td>
            <td class="p-1">Jan 2020</td>
            <td class="p-1">{{ date("2020-04-20") }}</td>
            <td class="p-1">{{ (2 * 1).toFixed(0) }} horas</td>
          </tr>
          <tr>
            <td class="p-1">Felipe Melo</td>
            <td class="p-1">Jan 2020</td>
            <td class="p-1">{{ date("2020-04-20") }}</td>
            <td class="p-1">{{ (2 * 1).toFixed(0) }} horas</td>
          </tr>
          <tr>
            <td class="p-1">Felipe Melo</td>
            <td class="p-1">Jan 2020</td>
            <td class="p-1">{{ date("2020-04-20") }}</td>
            <td class="p-1">{{ (2 * 1).toFixed(0) }} horas</td>
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
