<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
         :class="{ validateError: mensageError  }"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Novo Fatura
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              <i class="fas fa-times"></i>
            </button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <form>
              <FormCharge :date_end="date_end" :year="year" :month="month" />
            </form>
            {{ year }}
            <div v-show="mensageError" class="alert alert-danger mensage_danger" role="alert">
              {{ mensageError }}
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot v-if="mode === 'create'" name="footer">
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="newCharge()"
              aria-label="Close modal"
            >
              Adicionar
            </button>
          </slot>

          <slot v-else name="footer">
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="newCharge()"
              aria-label="Close modal"
            >
              Apagar
            </button>
            <button
              type="button"
              class="btn btn-sm btn-success"
              @click="epdateCharge()"
              aria-label="Close modal"
            >
              Salvar
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import FormCharge from "../../components/Balance/FormCharge";

import api from "../../services/api";
export default {
  name: "NewBalance",
  props: ["mode", "charge"],
  components: { FormCharge },
  data() {
    return {
      mensageError: "",
      data() {
        return {
          month: "",
          year: "",
          date_end: "",
        };
      },
    };
  },
  created() {
    if (this.charge) {
      console.log(this.charge);
      this.month = this.charge.month;
      this.year = this.charge.year;
      this.date_end = this.charge.date_end;
    }
  },
    watch: {
      mensageError() {
        console.log('tempo doisdooodd')
        setTimeout(() => {
        document.querySelector(".mensage_danger").classList.add("vanish")
        }, 2000)

        setTimeout(() => {
        document.querySelector(".mensage_danger").classList.remove("vanish")
        this.mensageError = ''
        }, 2100)


      },
    },
  //   computed: {
  //     monthTrue: {
  //       get() {
  //         if (this.charge) {
  //           let month = this.charge.period.split("/");
  //           return month[0];
  //         } else return "";
  //       },
  //       //   set (date) {
  //       //     this.item.end_date = moment(date).format('YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD')
  //       //   }
  //     },
  //},
  methods: {
    close() {
      this.$emit("close");
    },
    validate() {
      const body = {
        period: this.month + "/" + this.year,
        date_end: this.date_end,
        payment: 0,
      };
      if (body.period != " " && body.date_end !== "") {
        return body;
      } else {
        this.mensageError = "Preencha todos os dados";
      }
    },
    async newCharge() {
      console.log("novo");
      const body = this.validate();
      if (body) {
        try {
          api.post("/charge", body);
          this.$emit("updateApi");
          this.close();
        } catch (err) {
          this.mensageError = err;
        }
      }
    },
    epdateCharge() {
      console.log("Vai atualizar");
      const body = this.validate();
      try {
        api.put("/charge", body);
        this.$emit("updateApi");
        this.close();
      } catch (err) {
        this.mensageError = err;
      }
    },
  },
};
</script>

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
  width: 400px;
  max-height: 400px;
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
