<template>
  <div>
    <ModalDelete
      v-show="modalDeleteVisible"
      :item="student"
      @close="modalDeleteVisible = false"
    />
    <BarTop
      class="mb-2"
      :title="'Aluno: ' + student.name"
      @button-clicked="isEdtiMode = !isEdtiMode"
      :btn="
        !isEdtiMode
          ? { class: 'btn-outline-dark btn-sm', label: 'Editar' }
          : { class: 'btn-outline-danger btn-sm', label: 'Cancelar' }
      "
    />
    <div class="row">
      <div class="col-md-6">
        <div class="shadow p-3 mb-1 bg-white rounded">
          <form>
            <FormStudent :student="student" :isEdtiMode="isEdtiMode" />
            <div v-show="isEdtiMode" class="row">
              <div class="col-12 d-flex justify-content-between">
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="modalDeleteVisible = true"
                >
                  Remover aluno
                </button>
                <button class="btn btn-primary btn-sm" @click="updateStudent()">
                  Salvar alterações
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6 ">
        <div class="row">
          <div class="col-md-12 p-3 ">
            <div class="d-flex justify-content-between">
              <h4>Frequencia</h4>
              <div class="d-flex swith-model-vuew">
                <input
                  type="radio"
                  id="list"
                  value="list"
                  v-model="formatView"
                />
                <label
                  for="list"
                  :class="{ 'button-selected': formatView === 'list' }"
                >
                  <i class="fas fa-list-ul"></i>
                </label>
                <input
                  type="radio"
                  id="chart"
                  value="chart"
                  v-model="formatView"
                />
                <label
                  for="chart"
                  :class="{ 'button-selected': formatView === 'chart' }"
                >
                  <i class="far fa-chart-bar"></i>
                </label>
              </div>
            </div>

            <div class=" shadow rounded ">
              <Chart
                v-if="formatView === 'chart'"
                :maxTotal="statis.maxTotal"
                :statistics="statis.statistics"
                title="Frenquencia anual"
                @chmage-year="getStatisticsStudent()"
              />

              <AttendanceList
                v-else
                title="Lista de presença"
                :attendances="attendancies"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 p-3">
            <h4>
              Mensalidades
            </h4>
            <div class="p-3 shadow bg-white "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Multiselect from "vue-multiselect";
import FormStudent from "../../components/Student/FormStudent";
import api from "../../services/api";
import BarTop from "../../components/BarTop";
import ModalDelete from "../../components/Student/ModalDelit";
import Chart from "../../components/Chart";
import AttendanceList from "../../components/Student/AttendanceList";
import moment from 'moment'
export default {
  name: "StudentDetail",
  props: ["item"],
  components: { BarTop, ModalDelete, FormStudent, Chart, AttendanceList },
  data() {
    return {
      attendancies: [],
      formatView: "chart",
      modalDeleteVisible: false,
      isEdtiMode: false,
      statis: {
        maxTotal: 0,
        staistics: [],
      },
      mensageError: "",
      student: {
        name: "",
        cpf: "",
        email: "",
        address: "",
        telephone: "",
        modality: "",
        situation: "",
        hour: "",
        daysActvities: [],
      },
    };
  },
  created() {
    this.student = this.item;
    this.getStatisticsStudent();
    this.getAttendacies();
  },
  methods: {
    close() {
      this.reserve = {};
      this.amount = "";
      this.$emit("close");
    },
    updateStudent() {
      if (this.student) {
        const validator = require("email-validator");
        const validarCpf = require("validar-cpf");

        if (!validator.validate(this.student.email))
          return (this.mensageError = "Emai-l errado");
        if (!validarCpf(this.student.cpf))
          return (this.mensageError = "CPF errado");
        const body = {
          ...this.student,
          days: this.monuntDays(this.student.daysActvities),
        };
        this.putStudent(body);
      }
    },
    monuntDays(days) {
      if (!days) return this.student.days;
      return days
        .map((el) => el.name)
        .reduce((a, b) => {
          return a + " " + b;
        });
    },
    async putStudent(body) {
      console.log(body);
      try {
        await api.put("/students/" + this.item.id, body);
        this.$router.push({ name: "Students" });
      } catch (e) {
        return e;
      }
    },
    formatLabel(item) {
      if (item) {
        item.map((el) => {
          var date =  this.yearSelected + "-" + (el.label > 9 ? "0" + el.label : el.label) + "-10";
          el.label = moment(date).format("MMM");
        });
      }
    },
    async getAttendacies() {
      try {
        await api
          .get("/attendances/" + this.item.id, {
            params: {
              firstDay: "2020-04-01",
              lestDay: "2020-04-23",
            },
          })
          .then((res) => {
            this.attendancies =  res.data;
          });
      } catch (err) {
        console.log(err);
      }
    },
    async getStatisticsStudent() {
      try {
        await api
          .get("/statisticsStudent/" + this.item.id, {
            params: {
              min: 1,
              max: 13,
            },
          })
          .then((res) => {
            this.formatLabel(res.data.statistics);
            this.statis = res.data;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.swith-model-vuew {
  height: 30px;
  width: 80px;
  border-radius: 5px;
  border: 2px solid #9f9b78;
  color: #9f9b78;
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
  background: #9f9b78;
  color: #fff;
}
</style>
