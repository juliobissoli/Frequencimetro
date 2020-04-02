<template>
  <div class="login-page">
    <div class="d-flex align-items-center justify-content-center">
      <div class="col-md-3 login-container">
        <div class="row logo mb-3">
          <i class="col-12 far fa-clock text-center"></i>
          <span class="col-12 text-center">Frequncimetro</span>
        </div>
        <div class="login-form p-4">
          <form>
            <div class="form-group">
              <label for="input-email">E-mail</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="input-email"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label for="input-password">Senha</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="input-password"
              />
            </div>
            <button @click.prevent="login" class="btn btn-secondary btn-block">
              Entrar
            </button>
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
    </div>
  </div>
</template>
<script>
import auth from "../utils/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      isLogged: false,
      mensagemError: ""
    };
  },

  methods: {
    async login() {
      console.log(auth.loggedIn())
      const isLogeed = await auth.login(this.email, this.password);
      if (isLogeed) {
        if (this.$route.query && this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.$router.push({ name: "Users" });
        }
      } else {
        this.mensagemError = "Erro na altenticação :(";
      }
    }
  }
};
</script>
<style lang="scss">
// @import "../assets/styles/bootstrap";
.login-page {
  background-color: #f8f9fa;
  height: 100vh;
}
.logo {
  i {
    font-size: 35px;
  }
  span {
    font-size: 20px;
  }
  color: #666;
  font-family: -apple-system, Roboto, BlinkMacSystemFont, "Segoe UI", Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
// .bg-conceptho {
// //   background-image: url("../assets/img/bg-conceptho.jpg");
//   background-size: cover;
//   background-position: center center;
//   height: 100vh;
//   filter: grayscale(25%) blur(0);
//   transition: filter 3s;
//   &:hover {
//     filter: grayscale(100%) blur(3px);
//   }
// }
.login-container {
  margin-top: 20vh;
}
.login-form {
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  label {
  }
  input {
    border-radius: 0;
    background-color: rgba(255, 255, 255, 0);
  }
  button {
    &[type="submit"] {
    }
  }
}
</style>
