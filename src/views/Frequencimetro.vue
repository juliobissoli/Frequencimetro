<template>
  <div class="app">
    <div class="menu">
      <MainMenu />
    </div>
    <div class="main bg-light activitie-area">
      <div class="p-4 ">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MainMenu from "../components/MainMenu";
export default {
  name: "Frequencimentro",
  components: { MainMenu },
};
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
.activitie-area {
  overflow-x: auto;
}
</style>
