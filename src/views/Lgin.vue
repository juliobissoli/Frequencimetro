<template>
  <div class="container-fluid login-page">
    <div class="row">
      <div class="col-md-9 bg-conceptho"></div>
      <div class="col-md-3 login-container d-flex align-items-center">
        <div class="login-form">
          <form>
            <div class="form-group">
              <label for="input-email">E-mail</label>
              <input type="email" v-model="email" class="form-control" id="input-email" aria-describedby="emailHelp">
              <small id="emailHelp" class="form-text text-danger d-none">Aqui pode aparecer uma mensagem de erro de login</small>
            </div>
            <div class="form-group">
              <label for="input-password">Password</label>
              <input type="password"  v-model='password' class="form-control" id="input-password">
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="input-check-keep-logged">
              <label class="form-check-label" for="input-check-keep-logged">Manter conectado</label>
            </div>
            <button  @click.prevent="login" class="btn btn-secondary btn-block">Entrar</button>
          </form>
          <div v-show="mensagemError" class="alert alert-danger mt-3" role="alert">
            Falha no login!!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import auth from '../utils/auth'

export default {
  data () {
    return {
      email: '',
      password: '',
      isLogged: false,
      mensagemError: false
    }
  },
  methods: {
      login(){
          console.log('clico')
      }
//     async login () {
//       this.isLogged = await auth.login(this.email, this.password)
//       if (this.isLogged) {
//         if (this.$route.query && this.$route.query.redirect) {
//           this.$router.push(this.$route.query.redirect)
//         } else {
//           this.$router.push({ name: 'Campaign' })
//         }
//       } else this.mensagemError = true
//     }
//   }
}
</script>
<style lang="scss">
// @import "../assets/styles/bootstrap";
.login-page {
  background-color: #f7f7f7;
}
.bg-conceptho {
//   background-image: url("../assets/img/bg-conceptho.jpg");
  background-size: cover;
  background-position: center center;
  height: 100vh;
  filter: grayscale(25%) blur(0);
  transition: filter 3s;
  &:hover {
    filter: grayscale(100%) blur(3px);
  }
}
.login-container {
  height: 100vh;
}
.login-form {
  @extend .p-4;
  width: 100%;
  label {
    @extend .text-muted;
  }
  input {
    border-radius: 0;
    background-color: rgba(255, 255, 255, 0);
  }
  button {
    &[type=submit] {
      @extend .px-5;
    }
  }
}
</style>
