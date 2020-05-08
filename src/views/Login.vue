<template>
  <div>
    <div class="row login-page p-0 m-0">
      <div class="col-lg-4">
        <div class="left-area p-4 bg-whigt">
          <div class="my-5">
            <h1 class="mt-3">
              Bem-vindo ;)
            </h1>
            <span>
              Frequencímetro sua plataforma de gerenciamneto de frequencias
              personalizadas.
            </span>
          </div>

          <form class="mt-5">
            <div class="form-group">
              <!-- <label for="input-email rounded">E-mail</label> -->
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
              <!-- <label for="input-password">Senha</label> -->
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
                  Esqueci a senha
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
        <div class="row p-0 mt-3 mb-5 mx-0 d-flex logo justify-content-center">
          <img src="../assets/logo.svg" class="logo_img" />
          <span>
            Frequencímetro
          </span>
        </div>
        <div class="m-5  p-5">
          <AnimateArea />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import auth from '../utils/auth'
import AnimateArea from '../components/AnimatedAreaLogin'
export default {
  components: {AnimateArea},
  data() {
    return {
      email: '',
      password: '',
      isLogged: false,
      mensagemError: ''
    }
  },

  methods: {
    async login() {
      console.log(auth.loggedIn())
      const isLogeed = await auth.login(this.email, this.password)
      if (isLogeed) {
        if (this.$route.query && this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push({ name: 'Students' })
        }
      } else {
        this.mensagemError = 'Erro na altenticação :('
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
