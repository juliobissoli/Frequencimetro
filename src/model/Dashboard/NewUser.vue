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
        <Load v-show="isLoading" />

        <header class="modal-header" id="modalTitle">
          <slot name="header">
            {{ user ? 'Editar Usuário' : 'Novo Usuário' }}
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
                <div class="form-group col-md-8">
                  <label>Nome</label>
                  <div class="input-group input-group">
                    <input type="text" v-model="name" class="form-control" />
                  </div>
                </div>
                <div class="form-group col-md-4">
                  <label>Tipo</label>
                  <select v-model="type" class="form-control">
                    <option value="professor">Professor</option>
                    <option value="servidor">Servidor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div class="form-group col-md-8">
                  <label>Email {{ isLoading }} </label>
                  <div class="input-group input-group">
                    <input type="email" v-model="email" class="form-control" />
                  </div>
                </div>

                <div class="form-group col-md-4">
                  <label>Senha</label>
                  <div class="input-group input-group">
                    <input
                      type="password"
                      v-model="password"
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
          <slot v-if="!user" name="footer">
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="newUser()"
              aria-label="Close modal"
            >
              Adicionar
            </button>
          </slot>

          <slot v-else name="footer">
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="deleteUser()"
              aria-label="Close modal"
            >
              Excluir
            </button>
            <button
              type="button"
              class="btn btn-sm btn-success"
              @click="updateUser()"
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
import api from '../../services/api'
import Load from '../../components/AnimateLoad'
export default {
  name: 'NewBalance',
  props: ['user'],
  components: { Load },
  data() {
    return {
      mensageError: '',
      name: '',
      email: '',
      type: '',
      password: ''
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  watch: {
    user() {
      if (this.user) {
        this.name = this.user.name
        this.email = this.user.email
        this.password = this.user.password
        this.type = this.user.type
      } else {
        this.name = ''
        this.email = ''
        this.password = ''
        this.type = ''
      }
    },
    mensageError() {
      setTimeout(() => {
        document.querySelector('.mensage_danger').classList.add('vanish')
      }, 2000)

      setTimeout(() => {
        document.querySelector('.mensage_danger').classList.remove('vanish')
        this.mensageError = ''
      }, 2100)
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    validate() {
      const body = {
        name: this.name,
        email: this.email,
        type: this.type,
        password: this.password
      }
      console.log(body)
      if (body.name !== '' && body.password.length > 5) {
        return body
      } else {
        this.mensageError = 'Preencha todos os dados'
      }
    },
    async newUser() {
      const body = this.validate()
      if (body) {
        this.$store.commit('loading')

        try {
          await api.post('/users', body)
          await this.$store.commit('setUserList')
          this.close()
        } catch (err) {
          this.mensageError = err
        }
        this.$store.commit('notLoading')
      }
    },
    async updateUser() {
      const body = this.validate()
      this.$store.commit('loading')
      try {
        await api.put('/user/' + this.user.id, body)
        // this.$emit('updateApi')
        this.$store.commit('setUserList')
        this.close()
      } catch (err) {
        this.mensageError = err
      }
      this.$store.commit('notLoading')
    },
    async deleteUser() {
      console.log(this.user.id)
      this.$store.commit('loading')
      try {
        await api.delete('/user/' + this.user.id)
        this.$store.commit('setUserList')
        // this.$emit('updateApi')
        this.close()
      } catch (err) {
        this.mensageError = err
      }
      this.$store.commit('notLoading')
    }
  }
}
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
  background: #9f9b78;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;

  margin-right: 0.5rem;

  font-family: 'Avenir Next W01', 'Proxima Nova W01', 'Rubik', -apple-system,
    system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
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
