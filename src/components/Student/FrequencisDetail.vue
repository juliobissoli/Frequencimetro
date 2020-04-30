<template>
  <div class="col-md-12">
    <div class="row p-0 my-2">
      <div class="col-6 pr-1">
        <Card
          clasIcon="fas fa-heartbeat"
          :today="dateFormat"
          subTitle="Presentes Acumulada"
          classColor="primary"
          title="201"
          class="shadow rounded"
        />
      </div>
      <div class="col-6 pl-1">
        <Card
          :today="dateFormat"
          clasIcon="fas fa-calendar-day"
          subTitle="Matriculasdos"
          class="shadow rounded"
          classColor="secondary"
          title="201"
        />
      </div>
    </div>
    <div class="d-flex justify-content-between mt-4">
      <h4>Frequencia Anual</h4>
      <div class="d-flex swith-model-vuew">
        <input type="radio" id="list" value="list" v-model="formatView" />
        <label for="list" :class="{ 'button-selected': formatView === 'list' }">
          <i class="fas fa-list-ul"></i>
        </label>
        <input type="radio" id="chart" value="chart" v-model="formatView" />
        <label
          for="chart"
          :class="{ 'button-selected': formatView === 'chart' }"
        >
          <i class="far fa-chart-bar"></i>
        </label>
      </div>
    </div>

    <div class="shadow ">
      <Chart
        v-if="formatView === 'chart'"
        :maxTotal="statis.maxTotal"
        :statistics="statis.statistics"
        title=""
        @chmage-year="getStatisticsStudent()"
      />
      <AttendanceList
        v-else
        class="rounded"
        title="Lista de presença"
        :attendances="attendancies"
      />
    </div>
  </div>
</template>

<script>
import Chart from '../Chart'
import AttendanceList from './AttendanceList'
import Card from '../CartExtats'

import api from '../../services/api'
import moment from 'moment'

export default {
  name: 'FrequencisDetail',
  components: { Chart, AttendanceList, Card },
  props: ['student_id'],
  data() {
    return {
      formatView: 'chart',
      statis: {
        maxTotal: 0,
        staistics: []
      },
      attendancies: []
    }
  },
  computed: {
    dateFormat() {
      return moment().format('ddd DD/MM')
    }
  },
  created() {
    this.getStatisticsStudent()
    this.getAttendacies()
  },

  methods: {
    async getAttendacies() {
      const startOfMonth = moment().startOf('month').format('YYYY-MM-DD')
      const endOfMonth = moment().endOf('month').format('YYYY-MM-DD')
      try {
        await api
          .get('/attendances/' + this.student_id, {
            params: {
              firstDay: startOfMonth,
              lestDay: endOfMonth
            }
          })
          .then((res) => {
            this.attendancies = res.data
          })
      } catch (err) {
        console.log(err)
      }
    },

    async getStatisticsStudent() {
      try {
        await api
          .get('/statisticsStudent/' + this.student_id, {
            params: {
              min: 1,
              max: 13
            }
          })
          .then((res) => {
            this.formatLabel(res.data.statistics)
            this.statis = res.data
          })
      } catch (err) {
        console.log(err)
      }
    },

    formatLabel(item) {
      if (item) {
        item.map((el) => {
          var date =
            this.yearSelected +
            '-' +
            (el.label > 9 ? '0' + el.label : el.label) +
            '-10'
          el.label = moment(date).format('MMM')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.swith-model-vuew {
  height: 30px;
  width: 80px;
  border-radius: 5px;
  border: 2px solid #7794cc;
  color: #7794cc;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    display: none;
  }
  label {
    width: 38px;
    margin-top: 7px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.button-selected {
  background: #7794cc;
  color: #fff;
}
</style>
