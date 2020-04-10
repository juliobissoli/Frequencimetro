<template>
  <div class="row d-flex align-items-center ">
    <router-link
      class="col-11 line"
      :to="{ name: 'StudentDetail', params: { item } }"
    >
      <div class="row">
        <div class="col-md-1" style="color:#7794cc;">#{{ item.id }}</div>
        <div class="col-md-6">
          {{ item.name }}
        </div>
        <div class="col-md-5">
          {{ (item.hour * 1).toFixed(0) }}h , {{ item.days }}
        </div>
      </div>
    </router-link>
    <div class="col-md-1 d-flex justify-content-end">
      <button class="btn btn-sm btn-outline-primary">
        <i class="fas fa-heartbeat"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentItem",
  props: ["item"],
};
</script>

<style lang="scss" scoped>
.line {
  color: #444;
  text-decoration: none;
  :hover {
    border: none;
    text-decoration: none;
  }
  .btn {
    z-index: 10;
  }
}
</style>
