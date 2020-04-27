<template>
  <div>
    <div class="row">
      <div class="col-6 pr-1">
        <CardEstats
          clasIcon="fas fa-heartbeat"
          :title="attedanties"
          subTitle="Presentes"
          classColor="primary"
          :today="todayWeek"
          class="shadow  rounded"
        />
      </div>
      <div class="col-6 pl-1">
        <CardEstats
          clasIcon="fas fa-calendar-day"
          :title="matriculated"
          subTitle="Matriculasdos"
          class="shadow  rounded"
          :today="todayWeek"
          classColor="secondary"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="shadow rounded">
          <Chart
            title="Frequencia Diaria"
            :today="today"
            :statistics="statistics.statis"
            :maxTotal="statistics.maxTotal"
            :legend="legendChart"
            formatValue="relative"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardEstats from "../CartExtats";
import Chart from "../Chart";
import api from "../../services/api";
import moment from "moment";

export default {
  name: "StatisticsPanel",
  components: {
    CardEstats,
    Chart,
  },
  data() {
    return {
      legendChart: [
        {
          name: "Presentes",
          color: "#7794cc",
        },
        {
          name: "Matriculado",
          color: "#e6a7b3",
        },
      ],
      attedanties: 0,
      matriculated: 0,
      statistics: {
        statis: [],
        maxTotal: 0,
      },
      dayWeek: "",
    };
  },
  created() {
    this.getStatistcsDay();
    this.dayWeek = moment().format("dddd");
  },
  computed: {
    today() {
      const today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      return date;
    },
    todayWeek() {
      return moment().format("ddd DD/MM");
    },
  },
  methods: {
    formatLabel(statistics) {
      if (statistics) {
        statistics.map((el) => {
          el.label = el.label + "h";
        });
      }
    },
    getStatistcsDay() {
      api
        .get("/statistcsDay", {
          params: {
            min: 7,
            max: 18,
            day: moment().format("dddd"),
            date: this.today,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.formatLabel(res.data.statis);
          this.attedanties = res.data.attendanties;
          this.matriculated = res.data.matriculated;
          this.statistics = res.data;
        });
    },
  },
};
</script>
