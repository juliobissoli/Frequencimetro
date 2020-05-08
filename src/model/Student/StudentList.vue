<template>
  <div>
    <NewStudent
      v-show="isModalVisible"
      @close="isModalVisible = false"
      @updateApi="updateApi()"
    />
    <BarTop class="mb-2" title="Alunos" :input="false" :btn="false" />
    <div class="row">
      <div class="col-md-7">
        <div class="shadow p-3 mb-5 bg-white rounded">
          <div>
            <BarTop
              class="mb-2"
              @button-clicked="isModalVisible = !isModalVisible"
              :input="true"
              @get-search="getSearch"
              :btn="{
                class: 'btn-outline-dark btn-sm',
                label: 'Cadastrar Aluno'
              }"
              placeholder="Buscar por nome ou id"
            />
          </div>
          <div class="">
            <div
              v-for="(item, index) in students"
              :key="index"
              class="shadow-sm py-1 px-2 mb-2 bg-light line"
              @hover="isHover = !isHover"
            >
              <StudentItem :item="item" @updateApi="updateApi()" />
            </div>
          </div>
          <Pagination
            class="mt-3 mb-0"
            @change-page="changePage"
            :items="students"
            :perPage="perPage"
            :currentPage="currentPage"
            :total="totalData"
          />
        </div>
      </div>
      <div class="col-md-5">
        <StatistcsPanel :chekerApi="chekerApi" />
      </div>
    </div>
  </div>
</template>

<script>
import BarTop from '../../components/BarTop'
import api from '../..//services/api'
import NewStudent from '../Student/NewStudent'
import StudentItem from '../../components/Student/StudentItem'
import Pagination from '../../components/Pagination'
import StatistcsPanel from '../../components/Student/StatisticsPanel'

export default {
  name: 'StudemtList',
  components: {
    BarTop,
    NewStudent,
    StudentItem,
    Pagination,
    StatistcsPanel
  },

  data() {
    return {
      isHover: false,
      perPage: 10,
      currentPage: 1,
      totalData: 1,
      searchEntrys: '',
      students: [],
      attendances: [],
      isModalVisible: false,
      chekerApi: 0
    }
  },
  async created() {
    this.getStudents()
  },
  methods: {
    getStudents() {
      api
        .get('/students', {
          params: {
            perPage: this.perPage,
            currentPage: this.currentPage,
            search: this.searchEntrys
          }
        })
        .then((res) => {
          this.totalData = res.data.total
          this.students = res.data.student
        })
    },
    changePage(page) {
      this.currentPage = page
      this.getStudents()
    },
    getSearch(token) {
      this.searchEntrys = token
      this.currentPage = 1
      // console.log(token);
      this.getStudents()
    },

    updateApi() {
      this.getStudents()
      this.chekerApi++
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  border-radius: 0.5rem;
  background-color: #e1ebf7;
  // background-color: #f5faff;
  font-family: 'Avenir Next W01', 'Lato', 'Karla', 'Proxima Nova W01', 'Rubik',
    -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue',
    Arial, sans-serif;
}
</style>
