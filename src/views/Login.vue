<template>
  <div class="login-page">
    <div class="d-flex align-items-center justify-content-center">
      <div class="col-md-3 login-container p-0">
        <div class="row logo mb-3">
          <img src="../assets/logo.svg" class="logo_img" />
          <span class="col-12 text-center">Frequencimetro</span>
        </div>
        <div class="login-form p-3">
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
            <button @click.prevent="login" class="btn btn-success btn-block">
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
      console.log(auth.loggedIn());
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
<style lang="scss" scoped>
// @import "../assets/styles/bootstrap";
.login-page {
  // background-color: #f8f9fa;
  height: 100vh;
  background-color: #282733;

}
.logo {
  display: flex;
  justify-content: center;
  color: #fff;
  font-weight: 100;
  img {
    margin-top: 10px;
    height: 100px;
    width: 100px;
  }
  span {
    font-size: 20px;
  }
}

.login-container {
  margin-top: 5vh;
  background-color: #282733;
   border-radius: 0.25rem;
   border: 1px solid #6AD943;
}
.login-form {
  width: 100%;
  // background-color: #fff;
  
  label {
    color: #fff;
  }
  input {
    border-radius: 0;
    color: #fff;
    background-color: rgba(255, 255, 255, 0);
  }
  button {
    &[type="submit"] {
    }
  }
}
</style>
