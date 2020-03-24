<template>
  <div class="bar_top ">
    <h3>Alunos</h3>
    <input  type="text" placeholder="Buscar" />
  </div>
</template>

<script>
export default {
  name: "BarTop"
};
</script>

<style lang="scss" scoped>
.bar_top {
    border-bottom: 2px solid #eef1f3;
//   height: 8vh;
//   background-color: #f8f9fa;
//   -webkit-box-shadow: -1px 11px 46px -21px rgba(87, 87, 87, 1);
//   -moz-box-shadow: -1px 11px 46px -21px rgba(87, 87, 87, 1);
//   box-shadow: -1px 4px 41px -20px rgba(87, 87, 87, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #555;
  input {
    border: none;
    border-bottom: 1px solid #ccc;
    background: #f8f9fa;
    width: 25vw;
    height: 30px;
    font-size: 18px;
    padding-left: 10px;
  }
}
</style>