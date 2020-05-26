<template>
  <div class="area_badge">
    <span
      class="rounded d-flex align-items-center"
      :class="typeClass"
      v-bind:style="{ fontSize: size + 'px' }"
    >
      <i class="mr-1" :class="icon"></i>
      {{ text }}</span
    >
  </div>
</template>
<script>
export default {
  name: 'Badge',
  props: ['text', 'icon', 'size', 'typeClass']
}
</script>
<style lang="scss" scoped>
.area_badge {
  // width: 50px;

  .rounded {
    border-radius: 0.4rem !important;
  }
}
.success {
  background-color: #c5f0c0;
  color: #166e0c;
}
.secondary {
  background-color: #e6a7b3;
  color: #852b3b;
  // border: 1px solid #ff4f6f;
  padding: 0 5px;
  font-weight: 300;
}
.primary {
  padding: 0 5px;
  font-weight: 300;
  color: #0a4079;
  background-color: #7794cc;
}

.danger {
  padding: 0 5px;
  font-weight: 300;
  color: #dc3545;
  border-color: #ec7d88;
  background-color: #f3c9cd;
}
</style>
