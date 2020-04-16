<template>
  <div>
    <NewStudent
      v-show="isModalVisible"
      @close="isModalVisible = false"
      @updateApi="getStudents()"
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
                label: 'Cadastrar Aluno',
              }"
              placeholder="Buscar por nome ou id"
            />
          </div>
          <div class="">
            <div
              v-for="(item, index) in students"
              :key="index"
              class="shadow-sm py-1 px-2 mb-2 bg-light line"
            >
              <StudentItem :item="item" @updateApi="getStudents()" />
            </div>
          </div>
          <Pagination
            class="mt-3"
            @change-page="changePage"
            :items="students"
            :perPage="perPage"
            :currentPage="currentPage"
            :total="totalData"
          />
        </div>
      </div>
      <div class="col-md-5 ">
        <div class="row">
          <div class="col-6 pr-1">
            <CardEstats
              clasIcon="fas fa-heartbeat"
              title="23"
              subTitle="Presentes"
              classColor="primary"
              class="shadow  rounded"
            />
          </div>
          <div class="col-6 pl-1">
            <CardEstats
              clasIcon="fas fa-calendar-day"
              title="33"
              subTitle="Matriculasdos"
              class="shadow  rounded"
              classColor="secondary"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <div class="shadow rounded">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarTop from "../../components/BarTop";
import Chart from "../../components/Statistcs/Charthorizontal";
import api from "../..//services/api";
import NewStudent from "../Student/NewStudent";
import StudentItem from "../../components/Student/StudentItem";
import Pagination from "../../components/Pagination";
import CardEstats from "../../components/CartExtats";

export default {
  name: "StudemtList",
  components: {
    BarTop,
    NewStudent,
    StudentItem,
    Pagination,
    Chart,
    CardEstats,
  },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      totalData: 1,
      searchEntrys: '',
      students: [],
      attendances: [],
      isModalVisible: false,
    };
  },
  async created() {
    this.getStudents();
    this.getAttendance();
  },
  methods: {
    getStudents() {
      api
        .get("/students", {
          params: { perPage: this.perPage, currentPage: this.currentPage, search: this.searchEntrys },
        })
        .then((res) => {
          this.totalData = res.data.total;
          this.students = res.data.student;
        });
    },
    getAttendance() {
      api.get("attendances").then((res) => {
        this.attendances = res.data;
      });
    },
    changePage(page) {
      this.currentPage = page;
      this.getStudents();
    },
    getSearch(token){
      this.searchEntrys = token
      this.currentPage = 1
      console.log(token)
      this.getStudents();

    }
  },
};
</script>

<style lang="scss" scoped>
.line {
  border-radius: 0.5rem;
  // background-color: #f5faff;
  font-family: "Avenir Next W01", "Lato", "Karla", "Proxima Nova W01", "Rubik",
    -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
    Arial, sans-serif;
}
</style>
