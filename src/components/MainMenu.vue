<template>
  <div class="menu">
    <div class="header">
      <div class="logo mb-4 mt-2">
        <i class="fas fa-stopwatch" style="font-size: 34px"></i>
        <h6 class="mt-1">Frequncimetro</h6>
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
      </div>
    </div>

    <div class="footer">
      <div class="logo mb-4">
        <Avatar />
        <h6 class="mt-1 text-center">Joze Fernando Amorim</h6>
      </div>
    </div>

    <!-- <div class="side_bar_item">
        <i class="fas fa-money-bill-wave mr-2"></i>
        <span>ADM</span>
    </div>-->
  </div>
</template>

<script>
import Avatar from './Avatar'
export default {
  name: 'MainMenu',
  components: { Avatar }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: stretch;
}
.logo {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  color: #777;
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
  color: #777;
  font-size: 18px;
  text-decoration: none;
  display: flex;
  flex-direction: column;

  .side_bar_item {
    width: 100%;
    color: #777;
    padding: 20px 10px;
    border-top: 1px solid #fff;
    font-family: "Roboto Condensed", sans-serif;
    :hover {
      border: none;
    }
  }
  :hover {
    background-color: #fff;
  }
}
</style>