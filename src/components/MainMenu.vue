<template>
  <div>
    <div class="logo mb-4">
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
      <!-- <div class="side_bar_item">
        <i class="fas fa-money-bill-wave mr-2"></i>
        <span>ADM</span>
      </div>-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  color: #777;
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