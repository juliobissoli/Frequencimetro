<template>
  <div>
    <div class="row login-page p-0 m-0">
      <div class="col-lg-4 p-0">
        <Loading v-show="isLoading" />
        <div class="left-area p-4 bg-whigt">
          
          <div class="my-5">
            <h1 class="mt-5">
              
              Bem-vindo ;)
            </h1>
          </div>

          <form class="mt-5 pt-5">
            <div class="form-group">
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                class="form-control"
                id="input-email"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group my-4">
              <input
                type="password"
                v-model="password"
                class="form-control"
                placeholder="Senha"
                id="input-password"
              />
            </div>
            <button @click.prevent="login" class="btn btn-block">
              Entrar
            </button>
            <div class="row mt-3">
              <div class="col-lg-6">
                <input type="checkbox" />
                <span class="ml-2">Lembrar-me</span>
              </div>
              <div class="col-lg-6 text-right">
                <span class="text-danger">
                  Esqueci minha senha
                </span>
              </div>
            </div>
          </form>
          <div
            v-show="mensagemError"
            class="alert alert-danger mt-3"
            role="alert"
          >
            {{ mensagemError }}
          </div>
        </div>
      </div>
      <div class="col-lg-8 p-0 m-0 reght-area">
        <div class="row p-0 mt-3 mb-3 mx-0 d-flex logo justify-content-center">
          <img src="../assets/logo.svg" class="logo_img" />
          <span>
            Frequencímetro
          </span>
        </div>
        <div class="row logo p-0 m-0">
          <span
            style="font-size: 22px;"
            class="col-md-12 p-3 d-flex justify-content-center"
          >
            Sua plataforma de gerenciamento de frequências personalizada.
          </span>
        </div>

        <div class="mx-5 px-5">
          <AnimateArea />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import auth from '../utils/auth'
import AnimateArea from '../components/AnimatedAreaLogin'
import Loading from '../components/AnimateLoad'
export default {
  components: { AnimateArea, Loading },
  data() {
    return {
      email: '',
      password: '',
      isLogged: false,
      mensagemError: ''
    }
  },
  computed: {
    isLoading(){
      return this.$store.state.isLoading
    }
  },
  methods: {
    async login() {
      this.$store.commit('loading')
      console.log(auth.loggedIn())
      const isLogeed = await auth.login(this.email, this.password)
      if (isLogeed) {
        if (this.$route.query && this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$store.commit('setUser')
          this.$store.commit('notLoading')
          this.$router.push({ name: 'Students' })
        }
      } 
      else {
        this.$store.commit('notLoading')
        this.mensagemError = 'Erro na autenticação :('
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// @import "../assets/styles/bootstrap";
.left-area {
  padding: 0;
  height: 100vh;
  h1 {
    color: #333dca;
  }
  span {
    color: #3f67cc;
    font-size: 13px;
    // color: #022069
  }
  .btn {
    background-color: #3f67cc;
    border-radius: 0.6rem !important;
    color: #ffffff;
  }
}
.reght-area {
  padding: 0;
  background-color: #333dca;
  height: 100vh;
}
.login-page {
  // background-color: #f8f9fa;
  height: 100vh;
  width: 100vw;
  // font-family: 'Avenir Next W01', 'Lato', 'Karla', 'Proxima Nova W01', 'Rubik',
  //   -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue',
  //   Arial, sans-serif;
  .form-control {
    border-radius: 0.6rem !important;
    border: 1px solid #3f67cc;
    input {
      ::placeholder {
        color: #333dca;
      }
    }
  }
  // background-color: #282733;
}
.logo {
  display: flex;
  justify-content: center;
  img {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  span {
    display: flex;
    align-items: center;
    font-size: 35px;
    font-weight: 300;
    color: #7794cc;
  }
}
</style>
