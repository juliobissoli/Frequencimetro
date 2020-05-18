<template>
  <div class="row d-flex align-items-center">
    <router-link
      class="col-11 line"
      :to="{ name: 'StudentDetail', params: { item } }"
    >
      <div class="row">
        <div class="col-md-2" style="color: #7794cc;">
          #{{ zeroLeft(item.id) }}
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <span class="mr-1">{{ item.name }}</span>
          <Budge
            v-show="classToday(item)"
            style="widht: 50px;"
            :text="(item.hour * 1).toFixed(0) + 'h'"
            icon="fas fa-calendar-day"
            size="10"
            class="expand"
            :typeClass="classToday(item)"
          />
        </div>
        <div class="col-md-4 d-flex justify-content-end">
          <div v-for="d in lastFiveDays" :key="d" class="dropdown">
            <i
              class="fas fa-circle mr-2 circle"
              :style="'color:' + classCicle(item, d).color"
            ></i>
            <div class="dropdown-content">
              <strong>{{ classCicle(item, d).label }}</strong>
              <span>{{ classCicle(item, d).date }}</span>
            </div>
          </div>
        </div>
      </div>
    </router-link>
    <div class="col-md-1 d-flex justify-content-end">
      <button
        v-if="!presentToday(item)"
        class="btn btn-sm primary"
        @click="createAttendance()"
      >
        <i class="fas fa-heartbeat"></i>
      </button>
      <button
        v-else
        style="border: none;"
        class="btn btn-sm btn-outline-success"
        @click="dropdown = !dropdown"
      >
        <i class="fas fa-check"></i>
      </button>
      <div v-show="dropdown" class="dropdown">
        <div class="dropdown-content p-6">
          <div class="row">
            <div class="col-12 d-flex justify-content-between">
              <span>Desmarcar presensa</span>
              <button
                @click="dropdown = !dropdown"
                class="btn btn-sm text-secondary mb-2"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>

            <button
              @click="
                deletAttendace(getAttedance(item.attendances, dateNow).id)
              "
              style="width: 100%;"
              class="col-12 btn btn-sm btn-outline-secondary"
            >
              Desmarcar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'
import Budge from '../Badge_outline'
import moment from 'moment'
export default {
  name: 'StudentItem',
  components: { Budge },
  props: ['item'],
  data() {
    return {
      dropdown: false
    }
  },
  computed: {
    today() {
      return moment().format('dddd')
    },
    dateNow() {
      return moment().format('YYYY-MM-DD')
    },
    lastFiveDays() {
      const days = []
      var i = 0
      for (var j = 0; j < 5; j++) {
        if (moment().add('day', -i).day() === 0) i += 2
        else if (moment().add('day', -i).day() === 7) i += 1
        days.push(moment().add('day', -i).format('YYYY-MM-DD'))
        i++
      }
      return days.reverse()
    }
  },
  methods: {
    async createAttendance() {
      const body = {
        student_id: this.item.id
      }
      try {
        await api.post('/attendances', body)
        console.log('new attendance')
        this.$emit('updateApi')
      } catch (e) {
        return e
      }
    },
    async deletAttendace(id) {
      console.log('vai remover')
      try {
        await api.delete('/attendances/' + id)
        this.$emit('updateApi')
        this.dropdown = false
      } catch (error) {
        console.log(error)
      }
    },
    printDays(days) {
      const vetDays = days.split(' ')
      var str = ''
      vetDays.length === 5 ? (str += 'Segunda a sexta') : (str += days)
      return str
    },
    zeroLeft(num) {
      if (num < 10) return '000' + num
      if (num < 100) return '00' + num
      if (num < 1000) return '0' + num
      return num
    },
    metchDay(days, today) {
      const mapDays = new Map(
        days.split(' ').map((el) => {
          return [el, true]
        })
      )
      return mapDays.get(today.split('-')[0]) ? true : false
    },
    classToday(item) {
      if (this.metchDay(item.days, this.today)) {
        return !this.presentToday(item) ? 'secondary' : 'primary'
      } else return null
    },
    getAttedance(list, date) {
      const data = new Map(
        list.map((el) => {
          return [el.created_at, el]
        })
      )
      return data.get(date)
    },
    presentToday(item) {
      if (item.attendances.length > 0) {
        const list = item.attendances
        return this.getAttedance(list, this.dateNow) ? true : false
      } else {
        return false
      }
    },
    classCicle(item, day) {
      const list = item.attendances
      const dataFormated ={
        date: moment(day).format('ddd DD/MMM')
      } 
      // const date = moment().add('day', -i).format('YYYY-MM-DD')
      if (this.getAttedance(list, day)) {
        return {...dataFormated, label:'Presente', color: '#4ba179'}
      } else {
        return this.metchDay(item.days, moment(day).format('dddd'))
          ? {...dataFormated,label:'Falta', color: '#cf566c'}
          : {...dataFormated, label:'', color: '#e1ebf7'}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.circle {
  font-size: 12px;
  color: #7794cc;
}
.line {
  color: #444;
  text-decoration: none;
  :hover {
    border: none;
    text-decoration: none;
  }
  .btn {
    z-index: 10;
  }
  .primary {
    color: #7794cc;
    border: none;
  }
}

.dropdown {
  position: relative;
  display: inline-block;
  span {
    font-size: 12px;
  }
  :hover ~ .dropdown-content {
    display: flex;
    flex-direction: column;
  }
}

.dropdown-content {
  position: absolute;
  background-color: #E1EBF7;
  border-radius: 0.6rem;
  font-size: 15px;
  font-weight: 500;
  color: #444;
  top: -14px;
  left: 14px;
  min-width: 100px;
  padding: 12px 16px;
  margin: 5px 5px;
  display: none;
  z-index: 20;
}
</style>
