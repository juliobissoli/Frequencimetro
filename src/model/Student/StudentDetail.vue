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
        <div class="shadow p-3 mb-5 bg-white rounded">
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
      <div class="col-md-6">
        <div class="shadow rounded">
          <Chart />
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
import Chart from '../../components/Chart'

export default {
  name: "StudentDetail",
  props: ["item"],
  components: { BarTop, ModalDelete, FormStudent, Chart},
  data() {
    return {
      modalDeleteVisible: false,
      isEdtiMode: false,
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
    deleteStudent() {},
    async putStudent(body) {
      console.log(body);
      try {
        await api.put("/students/" + this.item.id, body);
        this.$router.push({ name: "Students" });
      } catch (e) {
        return e;
      }
    },
  },
};
</script>
