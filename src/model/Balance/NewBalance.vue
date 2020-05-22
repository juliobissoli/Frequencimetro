<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        :class="{ validateError: mensageError }"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Nova Fatura
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
              <div class="row">
                <div class="form-group col-md-6">
                  <label>Mês</label>
                  <select v-model="month" class="form-control">
                    <option v-for="i in 12" :key="i" :value="formatMonth(i)">
                      {{ formatMonth(i) }}
                    </option>
                  </select>
                </div>

                <div class="form-group col-md-6">
                  <label>Ano</label>
                  <div class="input-group input-group">
                    <select v-model="year" class="form-control">
                      <option v-for="i in 10" :key="i" :value="2019 + i">
                        {{ 2019 + i }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <label>Vencimento</label>
                  <div class="input-group input-group">
                    <input
                      v-model="date_end"
                      type="date"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div
              v-show="mensageError"
              class="alert alert-danger mensage_danger"
              role="alert"
            >
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
              @click="deleteCharge()"
              aria-label="Close modal"
            >
              Excluir
            </button>
            <button
              type="button"
              class="btn btn-sm btn-success"
              @click="updateCharge()"
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
import api from "../../services/api";
import moment from "moment";
export default {
  name: "NewBalance",
  props: ["mode", "charge"],

  data() {
    return {
      mensageError: "",
      month: "",
      year: "",
      date_end: "",
    };
  },
  watch: {
    charge() {
      if (this.mode !== "create") {
        let date = this.charge.period.split("/");
        this.month = date[0];
        this.year = date[1];
        this.date_end = this.charge.date_end;
      } else {
        this.month = "";
        this.year = "";
        this.date_end = "";
      }
    },
    mensageError() {
      setTimeout(() => {
        document.querySelector(".mensage_danger").classList.add("vanish");
      }, 2000);

      setTimeout(() => {
        document.querySelector(".mensage_danger").classList.remove("vanish");
        this.mensageError = "";
      }, 2100);
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    formatMonth(item) {
      if (item) {
        var date =
          this.yearSelected + "-" + (item > 9 ? "0" + item : item) + "-10";
        return moment(date).format("MMM");
      }
    },
    validate() {
      const body = {
        period: this.month + "/" + this.year,
        date_end: this.date_end,
        payment: 0,
      };
      if (body.period !== " " && body.date_end !== "") {
        let date_end_split = this.date_end.split("/");

        if (date_end_split[2] < this.year) {
          this.mensageError = "Data de vencimentro invalida";
        }

        return body;
      } else {
        this.mensageError = "Preencha todos os dados";
      }
    },
    async newCharge() {
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
    updateCharge() {
      const body = this.validate();
      try {
        api.put("/charge/" + this.charge.id, body);
        this.$emit("updateApi");
        this.close();
      } catch (err) {
        this.mensageError = err;
      }
    },
    deleteCharge() {
      try {
        api.delete("/charge/" + this.charge.id);
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
  // background: #9bda84;
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
  justify-content: space-between;
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
  // transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
  //   border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
  //   -webkit-box-shadow 0.15s ease-in-out;
}

.btn-gold:hover {
  color: white;
}
</style>
