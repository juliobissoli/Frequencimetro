<template>
  <div>
    <BarTop class="mb-2" />
    <div class="line">
      <div class="shadow-sm p-2 mb-1 bg-white rounded ">
        <div class="row d-flex align-items-center ">
          <div class="col-md-1">
            <Avatar />
          </div>
          <div class="col-md-6">Jão Paulo Amorim</div>
          <div class="col-md-3">
            <span class="badge badge-primary">Em Dia</span>
          </div>
          <div class="col-md-2 d-flex justify-content-end">
            <button class="btn btn-success">Marcar Presença</button>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import Avatar from "../../components/Avatar";
import BarTop from "../../components/BarTop";

export default {
  name: "UserList",
  components: { Avatar, BarTop }
};
</script>

<style lang="scss" scoped>
.line{
  font-size: 20px;
  color: #444;
  font-family:-apple-system, Roboto, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  :hover{
    // border: 3px solid #CCC 
  }
}
</style>

