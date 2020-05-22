<template>
  <div>
    <NewBalance
      v-show="isModalVisible"
      @close="isModalVisible = false"
      @updateApi="getCharges()"
      :mode="typeModal"
      :charge="chargeData"
    />
    <div class="row">
      <div class="col-md-6">
        <BarTop class="mb-2" title="Financeiro" :input="false" :btn="false" />
        <div class="shadow p-3 mb-5 bg-white rounded">
          <BarTop
            class="mb-2"
            @button-clicked="newCharge()"
            :input="true"
            @get-search="getSearch"
            :btn="{
              class: 'btn-outline-dark btn-sm',
              label: '+ Cobrança'
            }"
            placeholder="Buscar data"
          />

          <div>
            <BalanceItem
              :charge="charge"
              @charge-clicked="chargeDetail"
              @change-select-cherge="changeCharge"
            />
          </div>
          <Pagination
            class="mt-3 mb-0"
            @change-page="changePage"
            :items="charge"
            :perPage="perPage"
            :currentPage="currentPage"
            :total="totalData"
          />
        </div>
      </div>

      <div class="col-md-6">
        <BarTop
          class="mb-2"
          :title="(chargeSelected ? chargeSelected.period: 'Todos')"
          :input="false"
          :btn="false"
        />
        <div class="row mb-3">
          <div class="col-md-6 pr-1">
            <CardBalance
              :today="dateForPeriod(chargeSelected)"
              clasIcon="fas fa-heartbeat"
              :title="`R$ ${income}`"
              subTitle="Receita"
              classColor="success"
              class="shadow rounded"
            />
          </div>
          <div class="col-md-6 pl-1">
            <CardBalance
              :today="dateForPeriod(chargeSelected)"
              clasIcon="fas fa-heartbeat"
              title="21"
              subTitle="Pendentes"
              classColor="warning"
              class="shadow rounded"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="shadow p-3 bg-white rounded">
              <PaymentList
                @updateApi="getCharges()"
                title="Pagamentos"
                :payments="payments"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ count }}
    <button @click="teteCount"> teste</button> -->
  </div>
</template>

<script>
import BarTop from '../../components/BarTop'
import BalanceItem from '../../components/Balance/BalanceItem'
import Pagination from '../../components/Pagination'
import CardBalance from '../../components/CartExtats'
import PaymentList from '../../components/Balance/PaymentList'
import NewBalance from './NewBalance'

import moment from 'moment'
import api from '../../services/api'
export default {
  name: 'BalanceList',
  components: {
    BarTop,
    BalanceItem,
    Pagination,
    CardBalance,
    PaymentList,
    NewBalance
  },
  data() {
    return {
      isModalVisible: false,
      typeModal: 'create',
      chargeData: null,
      maxTotal: 22,
      currentPage: 1,
      perPage: 10,
      totalData: 10,
      charge: [],
      payments: [],
      totalPayments: 0,
      income: 0,
      chargeSelected: null
    }
  },
  watch: {
    count() {
      console.log('mudo')
    }
  },
  created() {
    this.$store.commit('setUser')
    this.getCharges()
  },
  computed: {
    today() {
      return moment().format('ddd DD/MM')
    },
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    getSearch() {
      return ''
    },
    getCharges() {
      api
        .get('/charge', {
          params: {
            perPage: this.perPage,
            currentPage: this.currentPage
          }
        })
        .then((res) => {
          this.totalData = res.data.total
          this.currentPage = res.data.page
          this.perPage = res.data.perPage
          this.charge = res.data.data
          this.getPayments(res.data.data[0].id)
          this.chargeSelected = res.data.data[0]
        })
    },

    getPayments(charge_id) {
      console.log(charge_id)
      try {
        api.get('payment', { params: { charge_id } }).then((res) => {
          this.totalPayments = res.data.length
          this.payments = res.data
          this.income = this.countIncome(res.data)
        })
      } catch (error) {
        console.error(error)
      }
    },
    changePage(page) {
      this.currentPage = page
      this.getCharges()
    },
    newCharge() {
      this.typeModal = 'create'
      this.chargeData = null
      this.isModalVisible = !this.isModalVisible
      this.chargeItem = {
        month: '',
        year: '',
        date_end: ''
      }
    },
    chargeDetail(item) {
      this.typeModal = 'edit'
      this.isModalVisible = !this.isModalVisible
      this.chargeData = item
      let period = item.period.split('/')
      this.chargeItem = {
        month: period[0],
        year: period[1],
        date_end: item.date_end
      }
    },

    countIncome(list) {
      return list
        .map((el) => {
          return parseInt(el.value)
        })
        .reduce((acc, i) => {
          return acc + i
        })
    },
    changeCharge(item) {
      this.chargeSelected = item
      this.getPayments(item.id)
    },
    dateForPeriod(item) {
      if (item) {
        const startOfMonth = moment(item.date_end).startOf('month').format('DD')
        const endOfMonth = moment(item.date_end)
          .endOf('month')
          .format('DD MMM/YYYY')
        return `De ${startOfMonth} a ${endOfMonth}`
      } else return this.today
    }
  }
}
</script>
