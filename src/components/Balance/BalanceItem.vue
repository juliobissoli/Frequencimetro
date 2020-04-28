<template>
  <div class="chart ">
    <div class="row  ml-1  py-1 px-2 mb-2 ">
      <div class="col-md-3">
        <strong class="">
          Período
        </strong>
      </div>
      <div class="col-md-4">
        <strong class="">
          Vencimento
        </strong>
      </div>
      <div class="col-md-5">
        <strong class="">
          Pagamentos
        </strong>
      </div>
    </div>
    <div
      v-for="(item, index) in statistics"
      :key="index"
      class="row chart-content ml-1 shadow-sm py-1 px-2 mb-2 bg-light line"
    >
      <div class="col-md-3 p-0">
        <div class="">
          <span>{{ item.label }}</span>
        </div>
      </div>
      <div class="col-md-3 p-0">
        20/02/2020
      </div>
      <div class="col-md-3 p-0 pl-1">
        <div>
          <div class="bar-item ">
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
      <div class="col-md-2 p-0 d-flex justify-content-end legend">
        <span class="value_primary mr-1">{{ item.subTotal }}% Pago </span>
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
.line {
  border-radius: 0.5rem;
  background-color: #e1ebf7;
  // background-color: #f5faff;
  font-family: "Avenir Next W01", "Lato", "Karla", "Proxima Nova W01", "Rubik",
    -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
    Arial, sans-serif;
}
.chart {
  //   background-color: #f5f6fd;
  background-color: #ffffff;
  // color: #000529;
  border-radius: 0.4rem;
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
    font-size: 13px;
    font-weight: 100;
    color: #999;
  }

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
        background-color: #9fefc9;
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
