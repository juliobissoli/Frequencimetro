<template>
  <div>
    <NewStudent v-show="isModalVisible" @close="isModalVisible = false" />
    <BarTop class="mb-2" title="Alunos" :input="false" :btn="false" />
    <div class="row">
      <div class="col-md-8 shadow p-3 mb-5 bg-white rounded">
        <div class="mb-3">
          <BarTop
            class="mb-2"
            @button-clicked="isModalVisible = !isModalVisible"
            :input="true"
            :btn="{ class: 'btn-outline-dark btn-sm', label: 'Cadastrar Aluno' }"
          />
        </div>
        <div class="">
          <div
            v-for="(item, index) in students"
            :key="index"
            class="shadow-sm py-1 px-2 mb-2 bg-light rounded-3 line"
          >
          <StudentItem :item="item" />
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
import NewStudent from "../Usera/NewUser";
import StudentItem from '../../components/Student/StudentItem'

export default {
  name: "UserList",
  components: { BarTop, NewStudent, StudentItem},
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
    newStudent() {
      this.$router.push({ name: "UserDetail" });
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  // font-size: 18px;
  color: #444;
  border-radius: 0.3rem;
  outline: none;
  cursor: pointer;
  div {
    a{
      color: #444;
    }
    color: #444;
    text-decoration: none;
    :hover {
      // color: #004085
      text-decoration: none;
    }
  }
}
.line:hover {
  // border: 1px solid #6ad943;
  outline: none;
}
</style>
