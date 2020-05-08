<template>
  <div class="row p-3">
    <div class="col-lg-6 pr-1">
      <div class="shadow p-4 mb-5 area-animate">
        <div
          class="row line"
          v-for="(i, k) in 6"
          :key="k"
        >
          <div class="col-md-10 lien_list"></div>
          <div class="col-md-2 circle">
            <i class="fas fa-circle mr-1"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 pl-1">
      <div class="row mb-2">
        <div class="col-6 pr-1">
          <div
            class="shadow p-4 area-animate"
            style="background-color: #e6a7b3;"
          ></div>
        </div>
        <div class="col-6 pl-1">
          <div
            class="shadow p-4 area-animate"
            style="background-color: #7794cc;"
          ></div>
        </div>
      </div>
      <div class="shadow  area-animate">
        <Chart :maxTotal="maxTotal" :statistics="statistics" bgColor="#b0c9e9" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from './Chart'
export default {
  name: 'Animatelogin',
  components: { Chart },
  data() {
    return {
      maxTotal: 10,
      statistics: [
        {
          total: 10,
          subTotal: 8
        },
        {
          total: 8,
          subTotal: 4
        },
        {
          total: 9,
          subTotal: 7
        },
        {
          total: 10,
          subTotal: 3
        },
        {
          total: 6,
          subTotal: 3
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.area-animate {
  // background-color: #7794cc;
  // background-color: #e1ebf7;
  background-color: #b0c9e9;
  border-radius: 0.4rem;
  .line{
    display: flex;
    align-items: center;
  }
  .lien_list {
    background-color: #e6a7b3;
    height: 20px;
    border-radius: 0.4rem;
  }
  .circle {
    color: #e6a7b3;
    font-size: 20px;
    border-radius: 1rem;
  }
}
</style>
