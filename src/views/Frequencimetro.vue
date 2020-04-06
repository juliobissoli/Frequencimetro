<template>
  <div class="app">
    <div class="menu">
        <MainMenu />
    </div>
    <div class="main bg-light">
      <!-- <div class="bar_top p-2">
        <input type="text" placeholder="Buscar" />
        <div class="m-2 bg-light">
          <span>Marcelo Frerreira</span>
         <i class="ml-2 far fa-user-circle" style="font-size:24px"></i>
        </div>
      
      </div> -->
      <div class="p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MainMenu from '../components/MainMenu'
export default {
    name: 'Frequencimentro',
components: {MainMenu}
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;
}
.main {
  width: 90vw;
  height: 100vh;
}
.menu {
  width: 10vw;
  height: 100vh;
  // background-color:#eef1f3;
  // background-color: #69237a
  border-right: 1px solid #f1f1f1;
//   -webkit-box-shadow: -1px 11px 46px -21px rgba(87, 87, 87, 1);
//   -moz-box-shadow: -1px 11px 46px -21px rgba(87, 87, 87, 1);
//   box-shadow: 23px 23px 23px 23px rgba(87, 87, 87, 1);
}
.bar_top {
  height: 6vh;
  width: 90vw;
  background-color: #f8f9fa;
  -webkit-box-shadow: -1px 11px 46px -21px rgba(87, 87, 87, 1);
  -moz-box-shadow: -1px 11px 46px -21px rgba(87, 87, 87, 1);
  box-shadow: -1px 4px 41px -20px rgba(87, 87, 87, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #555;
  input {
    border: none;
    border-bottom: 1px solid #ccc;
    background: #f8f9fa;
    width: 20vw;
  }
}
</style>