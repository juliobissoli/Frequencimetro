<template>
  <div>
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
      <div class="col-md-6 shadow p-3 mb-5 bg-white rounded">
        <form>
          <div class="row">
            <div class="form-group col-md-8">
              <label>Nome</label>
              <div class="input-group input-group">
                <input
                  v-model="student.name"
                  class="form-control"
                  placeholder="Nome do aluno"
                  :readonly="!isEdtiMode"
                />
              </div>
            </div>

            <div class="form-group col-md-4">
              <label>CPF</label>
              <div class="input-group input-group">
                <input
                  v-model="student.cpf"
                  class="form-control"
                  placeholder="CPF"
                  :readonly="!isEdtiMode"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-8">
              <label>Email</label>
              <div class="input-group input-group">
                <input
                  v-model="student.email"
                  class="form-control"
                  placeholder="emial"
                  :readonly="!isEdtiMode"
                />
              </div>
            </div>

            <div class="col-md-4 form-group">
              <label>Telefone</label>
              <div class="input-group input-group">
                <input
                  v-model="student.telephone"
                  class="form-control"
                  placeholder="(99)99999999"
                  :readonly="!isEdtiMode"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-8">
              <label>Endereço</label>
              <div class="input-group input-group">
                <input
                  v-model="student.address"
                  class="form-control"
                  placeholder="Ex: Rua nume,bairro Cidade-XX"
                  :readonly="!isEdtiMode"
                />
              </div>
            </div>

            <div class="col-md-4 form-group">
              <label>Situação</label>
              <select
                v-if="isEdtiMode"
                v-model="student.situation"
                class="form-control"
              >
                <option>Aluno</option>
                <option>Professor</option>
                <option>Servidor</option>
              </select>

              <div v-else class="input-group input-group">
                <input
                  v-model="student.situation"
                  class="form-control"
                  readonly
                />
              </div>
            </div>
          </div>

          <h5>
            Atividade:
          </h5>
          <div class="row">
            <div class="form-group col-md-4">
              <label>Hora</label>
              <div class="input-group input-group">
                <input
                  v-model="student.hour"
                  type="number"
                  min="7"
                  max="23"
                  class="form-control"
                  :readonly="!isEdtiMode"
                />
              </div>
            </div>
            <div class="col-md-8">
              <div>
                <label class="typo_label">Dias</label>
                <multiselect
                  v-if="isEdtiMode"
                  v-model="student.daysActvities"
                  :options="options"
                  :multiple="true"
                  group-values="libs"
                  group-label="days"
                  :close-on-select="false"
                  :group-select="true"
                  placeholder="Selecione os dias de atividades"
                  track-by="name"
                  label="name"
                >
                  <span slot="noResult"> </span>
                </multiselect>

                <div v-else class="input-group input-group">
                  <input v-model="student.days" class="form-control" readonly />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label>Modalidade</label>
              <select
                v-if="isEdtiMode"
                v-model="student.modality"
                class="form-control"
              >
                <option>Musculação</option>
                <option>Pilates</option>
                <option>Funcional</option>
              </select>

              <div v-else class="input-group input-group">
                <input
                  v-model="student.modality"
                  class="form-control"
                  readonly
                />
              </div>
            </div>
            <div class="form-group col-md-6">
              <label>Mensalidade</label>
              <div class="input-group input-group">
                <input
                  v-model="student.payment"
                  class="form-control"
                  type="number"
                  min="0"
                  placeholder=""
                  :readonly="!isEdtiMode"
                />
              </div>
            </div>
          </div>
          <div v-show="isEdtiMode" class="row">
            <div class="col-12 d-flex justify-content-between">
              <button class="btn btn-outline-danger btn-sm">
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
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import api from "../../services/api";
import BarTop from "../../components/BarTop";

export default {
  name: "UserDetail",
  props: ["item"],
  components: { Multiselect, BarTop },
  data() {
    return {
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
      options: [
        {
          days: "Todos os dias",
          libs: [
            { name: "Segunda" },
            { name: "Terça" },
            { name: "Quarta" },
            { name: "Quinta" },
            { name: "Sexta" },
          ],
        },
      ],
      value: [],
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
      if (!days) return this.student.days
      if(days.length == 5) return 'Segunda a sexta'
      return days
        .map((el) => el.name)
        .reduce((a, b) => {
          return a + ", " + b;
        });
    },

    async putStudent(body) {
      console.log(body);
      try {
        await api.put("/students/" + this.item.id, body);
         this.$router.push({ name: "Users" });
      } catch (e) {
        return e;
      }
    },
  },
};
</script>
