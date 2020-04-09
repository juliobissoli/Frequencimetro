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
      <div class="p-4 activitie-area">
        <router-view class="" />
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
  max-height: 100vh;
}
.menu {
  width: 10vw;
  height: 100vh;
  border-right: 1px solid #f1f1f1;
}
.activitie-area{
  overflow-x: auto;
}
</style>