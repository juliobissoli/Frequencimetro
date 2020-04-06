<template>
  <div>
    <NewStudent v-show="isModalVisible"  @close="isModalVisible = false" />
    <BarTop class="mb-2" title="Alunos" :input="false" :btn="false" />
    <div class="row">
      <div class="col-md-8 shadow p-3 mb-5 bg-white rounded">
        <div class="mb-3">
          <BarTop
            class="mb-2"
            @button-clicked="isModalVisible = !isModalVisible"
            :input="true"
            :btn="{ class: 'btn-outline-success', label: 'Novo Aluno' }"
          />
        </div>
        <div class="">
          <div
            v-for="(item, index) in students"
            :key="index"
            class="shadow-sm p-2 mb-2 bg-light rounded-3 line"
          >
            <router-link :to="{ name: 'UserDetail', params: { item } }">
              <div class="row d-flex align-items-center ">
                <div class="col-md-1">
                  <Avatar />
                </div>
                <div class="col-md-4">{{ item.name }}</div>
                <div class="col-md-4">
                  {{ item.schedules }}
                </div>
                <div class="col-md-3 d-flex justify-content-end">
                  <button class="btn btn-sm btn-outline-primary">
                    Marcar Presença
                  </button>
                </div>
              </div>
            </router-link>
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
import Avatar from "../../components/Avatar";
import BarTop from "../../components/BarTop";
import api from "../..//services/api"
import NewStudent from '../Usera/NewUser';

export default {
  name: "UserList",
  components: { Avatar, BarTop, NewStudent },
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
      console.log("clico");
      this.$router.push({ name: "UserDetail" });
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  font-size: 18px;
  color: #444;
  border-radius: 0.3rem;
outline : none;
  cursor: pointer;
  div {
    color: #444;
    text-decoration: none;
    :hover {
      text-decoration: none;
    }
  }
}
.line:hover {
  border: 1px solid #6ad943;
  outline : none;
}
</style>
