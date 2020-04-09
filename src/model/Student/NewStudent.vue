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
              <FormStudent :student="student" :isEdtiMode="true" />
            </form>
            <div v-show="mensageError" class="alert alert-danger" role="alert">
              {{ mensageError }}
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            
              <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="newStudent()"
                aria-label="Close modal"
              >
                Cadastrar
              </button>

          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import api from "../../services/api";
import FormStudent from "../../components/Student/FormStudent";

export default {
  name: "NewStudent",
  components: { FormStudent },
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
    };
  },
  methods: {
    close() {
      this.reserve = {};
      this.amount = "";
      this.$emit("close");
    },
    isValidate() {
      if (this.student) {
      console.log('ta na validação', this.student)

        const validator = require("email-validator");
        const validarCpf = require("validar-cpf");

        if (!validator.validate(this.student.email)) {
           (this.mensageError = "Emai-l errado");
           console.log('paro aqui')
          return 0;
        }
        if (!validarCpf(this.student.cpf)) {
          this.mensageError = "CPF errado";
          return 0;
        }
        if (this.student.hour < 6 || this.student.hour > 21) {
          this.mensageError = "Horario deve esta entre 7 e 20 horas";
          return 0;
        }
        if (
          !this.student.name ||
          !this.student.daysActvities ||
          !this.student.situation ||
          !this.student.modality ||
          !this.student.telephone
        ) {
          this.mensageError = "Preecha todos os campos";
          return 0;
        }
        return 1
      }
      else return 0
    },
    newStudent() {
      console.log('vai cadatra')
      if (this.isValidate() === 1) {
        const body = {
          ...this.student,
          days: this.montDays(this.student.daysActvities),
        };
        console.log('o body da vez->',body)
        this.createStudent(body);
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
        // this.close();
        console.log('passa por aqui!!!')
        this.close
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
