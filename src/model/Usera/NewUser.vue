<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Novo Aluno
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <form>
              <div class="row">
                <div class="form-group col-md-8">
                  <label>Nome</label>
                  <div class="input-group input-group">
                    <input
                      v-model="student.name"
                      class="form-control"
                      placeholder="Nome do aluno"
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
                      placeholder=""
                    />
                  </div>
                </div>

                <div class="col-md-4 form-group">
                  <label>Situação</label>
                  <select v-model="student.situation" class="form-control">
                    <option>Aluno</option>
                    <option>Professor</option>
                    <option>Servidor</option>
                  </select>
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
                      min="0"
                      max="23"
                      class="form-control"
                      placeholder="Ex: 8"
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <div>
                    <label class="typo_label">Dias</label>
                    <multiselect
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
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label>Modalidade</label>
                  <select v-model="student.modality" class="form-control">
                    <option>Musculação</option>
                    <option>Pilates</option>
                    <option>Funcional</option>
                  </select>
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
                    />
                  </div>
                </div>
              </div>
            </form>
            <div v-show="mensageError" class="alert alert-danger" role="alert">
              {{ mensageError }}
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <router-link :to="{ name: 'Users' }">
              <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="newStudent"
                aria-label="Close modal"
              >
                Cadastrar
              </button>
            </router-link>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import Multiselect from "vue-multiselect";
import api from "../../services/api";

export default {
  name: "NewUser",
  components: { Multiselect },
  data() {
    return {
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
  methods: {
    close() {
      this.reserve = {};
      this.amount = "";
      this.$emit("close");
    },
    newStudent() {
      if (this.student) {
        const validator = require("email-validator");
        const validarCpf = require("validar-cpf");

        if (!validator.validate(this.student.email))
          return (this.mensageError = "Emai-l errado");
        if (!validarCpf(this.student.cpf))
          return (this.mensageError = "CPF errado");
        if (this.student.hour < 6 || this.student.hour > 21)
          return (this.mensageError = "Horario deve esta entre 7 e 20 horas");
        if (
          !this.student.name ||
          !this.student.daysActvities ||
          !this.student.situation ||
          !this.student.modality ||
          !this.student.telephone
        ) {
          this.mensageError = "Preecha todos os campos";
        } else {
          const body = {
            ...this.student,
            days: this.montDays(this.student.daysActvities),
          };
          this.createStudent(body);
        }
      }
    },
    montDays(days) {
      if (!days) return " ";
      if (days.length === 5) return "Segunda a sexta";
      return days
        .map((el) => el.name)
        .reduce((a, b) => {
          return a + " " + b;
        });
    },
    async createStudent(body) {
      try {
        await api.post("/students", body);
        this.close();
      } catch (e) {
        return e;
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  background: #9bda84;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  display: flex;
  flex-direction: column;
  width: 650px;
  max-height: 700px;
  border-radius: 4px;
  left: auto;
  top: auto;
  overflow: auto;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  //   color: #9f9b78;
  color: #444;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 5% 30px 0px;
  display: flex;
  flex-direction: column;
}

.btn-close {
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #444;
  background: transparent;
}

.btn-gold {
  color: black;
  background: #9f9b78;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;

  margin-right: 0.5rem;

  font-family: "Avenir Next W01", "Proxima Nova W01", "Rubik", -apple-system,
    system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
    sans-serif;
  font-weight: 400;
  outline: none;
  line-height: 1;
  text-align: center;
  vertical-align: middle;
  padding: 0.375rem 0.75rem;
  font-size: 0.9rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

.btn-gold:hover {
  color: white;
}
</style>
