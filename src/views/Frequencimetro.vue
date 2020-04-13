<template>
  <div class="app">
    <div class="menu">
      <MainMenu />
    </div>
    <div class="main activitie-area">
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
  background-color: #f5faff;
}
.main {
  width: 90vw;
  max-height: 100vh;
}
.menu {
  width: 8vw;
  height: 96vh;
  border-right: 1px solid #f1f1f1;
  border-radius: 1rem;
  margin-left: 3px;
  margin-top: 1vh;
}
.activitie-area {
  overflow-x: auto;
}
</style>
