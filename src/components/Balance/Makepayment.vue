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
            Registrar Pagamento
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
          <form>
            <div class="row">
              <div class="form-group col-md-6">
                <label>Periodo</label>
                <div class="input-group input-group">
                  <input class="form-control" placeholder="CPF" />
                </div>
              </div>

              <div class="form-group col-md-6">
                <label>Valor</label>
                <div class="input-group input-group">
                  <input class="form-control" placeholder="CPF" />
                </div>
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-sm btn-primary"
              aria-label="Close modal"
              @click="close"
            >
              Cancelar
            </button>

            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="deletStudent"
              aria-label="Close modal"
            >
              Remover
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import api from "../../services/api";

export default {
  name: "MakePayment",
  props: ["item"],
  methods: {
    close() {
      this.reserve = {};
      this.amount = "";
      this.$emit("close");
    },

    async deletStudent() {
      try {
        await api.post("/paymenst");
      } catch (e) {
        return e;
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
  width: 500px;
  max-height: 300px;
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
