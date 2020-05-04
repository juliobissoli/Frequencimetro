<template>
  <div class="card p-1" :class="classColor">
    <div class="row">
      <div class="col-5 d-flex justify-content-center align-items-center">
        <div class="side_box">
          <i :class="clasIcon"></i>
        </div>
      </div>
      <div class="col-7 p-1">
        <div class="row">
          <strong class="col-12 describe text-right pr-5"
            >{{ today }}
          </strong>
          <span class="col-12 title">{{ title }}</span>
          <span class="col-12 sub_title">{{ subTitle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardExtat',
  props: ['classColor', 'clasIcon', 'title', 'subTitle', 'today']
}
</script>

<style lang="scss" scoped>
.card{
  border: none;
   .side_box {
    background-color: #fff;
    border-radius: 0.8rem;
  }
}
.primary {
  // background-color: #becef7;
  background-color: #3f67cc;
  // color: #7794cc;
  color: #022069;
}

.secondary {
  // background-color: #e6a7b3;
  // color: #b36089;
  background-color: #ff4f6f;
  color: #800b21;
}

.success {
  background-color: #9fefc9;
  color: #4ba179 ;
}

.danger{
  background-color: #cf4444;
  color: #811919;
}

.warning{
  background-color: #f0d160;
  color: #9c8841;
}

.side_box {
  padding: 25% 28%;
}
.title {
  font-size: 30px;
}
.sub_title {
  font-size: 14px;
}
.describe {
  font-size: 11px;
}
</style>
