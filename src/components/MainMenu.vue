<template>
  <div class="menu">
    <div class="header">
      <div class="logo mb-4 mt-2">
        <img src="../assets/logo.svg" class="logo_img" />
        <!-- <span class="mt-1">Frequencimetro</!-->
      </div>

      <div class="side_bar">
        <router-link :to="{ name: 'Students' }" class="side_bar_item">
          <i class="fas fa-users"></i>
          <span>Alunos</span>
        </router-link>

        <router-link :to="{ name: 'Balance' }" class="side_bar_item">
          <i class="fas fa-money-bill-wave"></i>
          <span>Balanço</span>
        </router-link>
        <router-link :to="{ name: 'Dashboard' }" class="side_bar_item">
          <i class="fas fa-th-large"></i>
          <span>Painel</span>
        </router-link>
      </div>
    </div>

    <div class="footer side_bar">
      <div class="side_bar_item" @click="logout()">
        <i class="fas fa-sign-out-alt"></i>
        <span> Sair</span>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../utils/auth'
export default {
  name: 'MainMenu',
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    logout() {
      auth.logout()
      this.$store.commit('cleanStores')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  display: flex;
  color: #f1f1f1;
  // background: #faa628;_
  // background-color: #69237a;
  // background-color: #282733;
  background-color: #333dca;
  flex-direction: column;
  align-content: stretch;
  padding: 8px;
}
.logo_img {
  height: 6vh;
  width: 6vw;
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
  font-size: 15px;
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
  margin: 8px;
  font-weight: 100;
  font-size: 15px;
  text-decoration: none;
  display: flex;
  flex-direction: column;

  .side_bar_item {
    width: 100%;
    padding: 11px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border-top: 0.1rem solid #7794CC;
    border: solid 1px #333dca;
    color: #7794cc;
    border-radius: 1rem;

    font-family: 'Roboto Condensed', sans-serif;
    i {
      font-size: 24px;
      border: none;
    }
    span {
      // visibility: hidden;
      border: none;

      font-size: 12px;
    }
  }
  :hover {
    border: solid 1px #7794cc;
    // border: none;
    text-decoration: none;
    span {
      // display: block;
      visibility: visible;
    }
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
// .dropdown {
//   position: relative;
//   display: inline-block;
//   span {
//     font-size: 12px;
//   }
// }

// .dropdown-content {
//   position: absolute;
//   background-color: #f9f9f9;
//   color: #777;
//   right: 0;
//   top: 9vh;
//   border: none;
//   left: 0;
//   min-width: 8vw;
//   box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
//   padding: 12px 16px;
//   margin: 5px 5px;
//   cursor: pointer;
//   z-index: 1;
//   :hover {
//     // background-color: #f9f9f9;
//     color: #fff;
//   }
// }
</style>
