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
                    <input class="form-control" placeholder="Nome do aluno" />
                  </div>
                </div>

                <div class="form-group col-md-4">
                  <label>CPF</label>
                  <div class="input-group input-group">
                    <input class="form-control" placeholder="CPF" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-8">
                  <label>Email</label>
                  <div class="input-group input-group">
                    <input class="form-control" placeholder="emial" />
                  </div>
                </div>

                <div class="col-md-4 form-group">
                  <label>Telefone</label>
                  <div class="input-group input-group">
                    <input class="form-control" placeholder="(99)99999999" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label>Mpdalidade</label>
                  <select class="form-control">
                    <option>Musculação</option>
                    <option>Pilates</option>
                    <option>Funcional</option>
                  </select>
                </div>

                <div class="col-md-6 form-group">
                  <label>Situação</label>
                  <select class="form-control">
                    <option>Aluno</option>
                    <option>Professor</option>
                    <option>Servidor</option>
                  </select>
                </div>
              </div>

              <legend>
                <span>Horario da Atividade</span>
              </legend>
              <div class="row">
                <div class="form-group col-md-2">
                  <label>Hora</label>
                  <div class="input-group input-group">
                    <input class="form-control" placeholder="Nome do Banco" />
                  </div>
                </div>
                <div class="col-md-10 ">
                    <label>Dias</label>
                  <div class="row bg-light ronded border border-light">
                    <div class="col-2">
                      <span class="col-12">feira</span>
                      <div class="col-12">
                        <input type="checkbox" :value="days[1-1]" />
                      </div>
                    </div>
                    <div class="col-2">
                      <span class="col-12">feira</span>
                      <div class="col-12">
                        <input type="checkbox" :value="days[2-1]" />
                      </div>
                    </div>
                    <div class="col-2">
                      <span class="col-12">feira</span>
                      <div class="col-12">
                        <input type="checkbox" :value="days[3-1]" />
                      </div>
                    </div>
                    <div class="col-2">
                      <span class="col-12">feira</span>
                      <div class="col-12">
                        <input type="checkbox" :value="days[4-1]" />
                      </div>
                    </div>
                    <div class="col-2">
                      <span class="col-12">feira</span>
                      <div class="col-12">
                        <input type="checkbox" :value="days[5-1]" />
                      </div>
                    </div>
                    <div class="col-2">
                      <span class="col-12">feira</span>
                      <div class="col-12">
                        <input type="checkbox" :value="days[6-1]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <router-link :to="{ name: 'Users' }">
              <button
                type="button"
                class="btn-gold"
                @click="close"
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
export default {
  name: "NewUser",
  data() {
    return {
      days: [false, false, false, false, false],
    };
  },
  methods: {
    close() {
      this.reserve = {};
      this.amount = "";
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>

.modal-backdrop {
  position: fixed;
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
  max-height: 670px;
  border-radius: 4px;
  left: auto;
  top: auto;
  overflow-x: auto;
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
