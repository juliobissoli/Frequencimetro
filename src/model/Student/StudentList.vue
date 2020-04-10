<template>
  <div>
    <NewStudent v-show="isModalVisible" @close="isModalVisible = false" />
    <BarTop
      class="mb-2"
      title="Alunos"
      :input="false"
      :btn="false"
      placeholder="Buscar por nome ou id"
    />
    <div class="row">
      <div class="col-md-8">
        <div class="shadow p-3 mb-5 bg-white rounded">
          <div class="mb-3">
            <BarTop
              class="mb-2"
              @button-clicked="isModalVisible = !isModalVisible"
              :input="true"
              :btn="{
                class: 'btn-outline-dark btn-sm',
                label: 'Cadastrar Aluno',
              }"
            />
          </div>
          <div class="">
            <div
              v-for="(item, index) in students"
              :key="index"
              class="shadow-sm py-1 px-2 mb-2 bg-light line"
            >
              <StudentItem :item="item" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 ">
        <div class="shadow p-3 mb-5 bg-white rounded"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BarTop from "../../components/BarTop";
import api from "../..//services/api";
import NewStudent from "../Student/NewStudent";
import StudentItem from "../../components/Student/StudentItem";

export default {
  name: "StudemtList",
  components: { BarTop, NewStudent, StudentItem },
  data() {
    return {
      students: [],
      isModalVisible: false,
    };
  },
  async created() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      api.get("students").then((res) => {
        this.students = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.line{
  border-radius: 0.5rem;
  // background-color: #f5faff;
  font-family: "Lato", "Karla", "Avenir Next W01", "Proxima Nova W01", "Rubik",
      -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
      Arial, sans-serif;
  }
</style>