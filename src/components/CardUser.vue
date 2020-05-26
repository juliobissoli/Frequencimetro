<template>
  <div class="card p-1" :class="classColor">
    <div class="row">
      <div class="col-3 p-0 d-flex justify-content-center align-items-center">
        <Avatar />
        <!-- <div class="side_box">
          <i class="far fa-user"></i>
        </div> -->
      </div>
      <div class="col-9 p-1">
        <div class="row">
          <strong class="col-12 describe text-right pr-5">{{ today }} </strong>
          <span class="col-12 title">{{ title }}</span>
          <span class="col-12 sub_title">{{ subTitle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar'
export default {
  name: 'CardExtat',
  props: ['classColor', 'clasIcon', 'title', 'subTitle', 'today'],
  components: { Avatar }
}
</script>

<style lang="scss" scoped>
.card {
  border: none;
  .side_box {
    height: 50%;
    width: 50%;
    background-color: #fff;
    border-radius: 100rem;
    padding: 10%;
  }
}
.darck {
  // background-color: #becef7;
  background-color: #eee;
  // color: #7794cc;
  color: #444;
}
.secondary {
  // background-color: #becef7;
  background-color: #adcdf5;
  // color: #7794cc;
  color: #022069;
}


.title {
  font-size: 18px;
}
.sub_title {
  font-size: 14px;
}
.describe {
  font-size: 11px;
}
</style>
