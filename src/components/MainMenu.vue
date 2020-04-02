<template>
  <div class="menu">
    <div class="header">
      <div class="logo mb-4 mt-2">
        <i class="fas fa-stopwatch" style="font-size: 34px"></i>
        <h6 class="mt-1">Frequencimetro</h6>
      </div>

      <div class="side_bar">
        <router-link :to="{ name: 'Users' }" class="side_bar_item">
          <i class="fas fa-users mr-2"></i>
          <span>Usuarios</span>
        </router-link>

        <router-link :to="{ name: 'Balance' }" class="side_bar_item">
          <i class="fas fa-money-bill-wave mr-2"></i>
          <span>Financeiro</span>
        </router-link>
        <div class="side_bar_item dropdown" @click="isVisible = !isVisible">
          <i class="fas fa-cog mr-2" ></i>
          <span>Setings <i v-bind:class="[isVisible ? false : 'fas fa-sort-up' , 'fas fa-sort-down']"></i></span>
          <div v-show="isVisible" class="dropdown-content">
            <div class="line_option mb-2">
              <i class="far fa-edit mr-2"></i>
              <span> Editar</span>
            </div>
            <div class="line_option mb-2" @click="logout()">
              <i class="fas fa-sign-out-alt mr-2"></i>
              <span> Sair</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer dropdown">
    </div>

  </div>
</template>

<script>
// import Avatar from "./Avatar";
import auth from "../utils/auth";

export default {
  name: "MainMenu",
  // components: { Avatar },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    logout() {
      auth.logout();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  display: flex;
  color: #f1f1f1;
  // background: #faa628;_
  // background-color: #69237a;
  background-color: #282733;
  flex-direction: column;
  align-content: stretch;
}
.logo {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 100;
  padding: 5px;
  color: #ffff;
}
.header {
  width: 100%;
  height: 85vh;
}
.footer {
  // width: 100%;
  display: flex;
  align-items: flex-end;
}
.side_bar {
  //   margin: 10px;
  // color: #777;
  font-weight: 100;
  font-size: 15px;
  text-decoration: none;
  display: flex;
  flex-direction: column;

  .side_bar_item {
    width: 100%;
    color: #fff;
    padding: 20px 10px;
    border-top: 1px solid #444;
    font-family: "Roboto Condensed", sans-serif;
  }
  :hover {
    // background-color: #666;
    // border: none;
    text-decoration: none;
  }
}

.line_option {
  font-size: 15px;
  display: flex;
  align-items: center;
  margin-top: 3px;
  span {
    font-size: 14px;
  }
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  // background-color: #f9f9f9;
  color: #777;
  right: 0;
  top: 6vh;
  left: 0;
  min-width: 8vw;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  margin: 5px 5px;
  cursor: pointer;
  z-index: 1;
  :hover {
    // background-color: #f9f9f9;
    color: #fff;
  }
}
</style>
