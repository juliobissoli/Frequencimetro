<template>
  <div>
    <NewUser
      v-show="isModalVisible"
      @close="isModalVisible = !isModalVisible"
      :user="userSelected"
    />
    <BarTop class="mb-2" title="Painel" :input="false" :btn="false" />
    <div class="row">
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-4 pr-1">
            <CardStatis
              today="20/20/20"
              clasIcon="fas fa-heartbeat"
              :title="$store.state.isAdmin"
              subTitle="Receita"
              classColor="success"
              class="shadow rounded"
            />
          </div>
          <div class="col-md-4 px-1">
            <CardStatis
              today="20/20/20"
              clasIcon="fas fa-heartbeat"
              title="21"
              subTitle="Pendentes"
              classColor="warning"
              class="shadow rounded"
            />
          </div>
          <div class="col-md-4 pl-1">
            <CardStatis
              today="20/20/20"
              clasIcon="fas fa-heartbeat"
              title="21"
              subTitle="Pendentes"
              classColor="danger"
              class="shadow rounded"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <div class="shadow p-3 mb-5 bg-white rounded">
              <Chart
                title="Frequência Média"
                :maxTotal="maxTotal"
                :statistics="statistics"
                formatValue='relative'
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <ListUsers
          :check_api="update_api"
          @btn-clicked="createUser"
          @card-clicked="updateUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BarTop from '../../components/BarTop'
import CardStatis from '../../components/CartExtats'
import NewUser from './NewUser'
import Chart from '../../components/Chart'
// import CardUser from '../../components/CardUser'
import ListUsers from '../../components/Dashboard/ListUsers'

export default {
  name: 'DashboardList',
  components: {
    BarTop,
    CardStatis,
    ListUsers,
    NewUser,
    Chart
  },
  created(){
    this.$store.commit('setUser')
  },

  data: () => ({
    isEdtiMode: false,
    isModalVisible: false,
    userSelected: null,
    update_api: 0,
    maxTotal: 10,
    statistics: [
      { total: 10, subTotal: 8, label: '7h' },
      { total: 10, subTotal: 7, label: '8h' },
      { total: 6, subTotal: 4, label: '9h' },
      { total: 4, subTotal: 3, label: '10h' },
      { total: 3, subTotal: 3, label: '11h' },
      { total: 10, subTotal: 7, label: '12h' },
      { total: 10, subTotal: 9, label: '15h' },
      { total: 8, subTotal: 5, label: '16h' },
      { total: 4, subTotal: 2, label: '17h' },
      { total: 5, subTotal: 4, label: '18h' }
    ]
  }),
  methods: {
    updateUser(item) {
      console.log('ta np update')
      this.userSelected = item
      this.isModalVisible = true
    },
    createUser() {
      this.userSelected = null
      this.isModalVisible = true
    }
  }
}
</script>
