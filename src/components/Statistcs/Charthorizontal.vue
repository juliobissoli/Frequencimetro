<template>
  <div class="chart p-3">
    <div class="title mb-3 d-flex justify-content-between">
      <span>{{ title }}</span>
      <input class="input" type="date" :value="today" />
    </div>
    <div
      v-for="(item, index) in statistics"
      :key="index"
      class="row chart-content ml-1"
    >
      <div class="col-md-6 p-0">
        <div class="legend">
          <span>As {{ item.label }} horas</span>
        </div>
      </div>
      <div class="col-md-6 p-0 d-flex justify-content-end legend">
        <span class="value_primary mr-1">{{ item.subTotal }} Presentes</span>
        /
        <span class="value-danger ml-1"> {{ item.total }} Matriculados</span>
      </div>

      <div class="col-md-12 p-0">
        <div class="bar-item">
          <div
            class="bar_success"
            :style="getSizeWidth(maxNunber, item.subTotal)"
          ></div>
          <div
            class="bar_danger"
            :style="
              getSizeWidth(
                maxNunber,
                item.total > item.subTotal
                  ? item.total - item.subTotal
                  : item.total
              )
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharHorizoltal",
  props: ["title", "today", "statistics", "maxNunber"],
  data() {
    return {
      data: this.statistics,
      maxTotal: this.maxNunbe,
    };
  },
  methods: {
    getSizeWidth(limit, ref) {
      var varRelative = 0;

      limit >= ref
        ? (varRelative = ((ref * 1) / limit) * 1 * 100)
        : (varRelative = ref * 1);
      return "width:" + varRelative.toFixed(0) + "%;";
    },
  },
};
</script>
<style lang="scss" scoped>
.chart {
  //   background-color: #f5f6fd;
  background-color: #ffffff;
  color: #000529;
  border-radius: 0.4rem;
  .title {
    width: 100%;
    font-size: 20px;
    font-weight: 100;
  }
  .input {
    border-radius: 0.4rem;
    border: none;
    background-color: #e1ebf7;
    width: 12vw;
    height: 30px;
    font-size: 15px;
    color: #7794cc;
  }
  .legend {
    font-size: 11px;
    font-weight: 100;
    color: #999;
  }
  // .value_primary {
  //   font-size: 15px;
  //   color: #7794cc;
  //   font-weight: 300;
  // }
  // .value-danger {
  //   font-size: 12px;
  //   color: #e6a7b3;
  //   font-weight: 300;
  // }

  .chart-content {
    width: 100%;
    height: 30px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    // border-top: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-around;

    .bar-item {
      height: 6px;
      background-color: #ddd;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: 4rem;
      .bar_success {
        height: 100%;
        // border-radius: 0 4rem 4rem 0;
        border-radius: 4rem;
        background-color: #7794cc;
      }
      .bar_danger {
        height: 100%;
        //border-radius: 4rem 0 0 4rem;
        border-radius: 4rem;
        background-color: #e6a7b3;
      }
    }
  }
}
</style>
