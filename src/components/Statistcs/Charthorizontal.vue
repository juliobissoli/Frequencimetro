<template>
  <div class="chart p-3">
    <div class="title mb-3 d-flex justify-content-between">
      <span>title</span>
      <input class="input" type="date" :value="today" />
    </div>
    <div
      v-for="(item, index) in data"
      :key="index"
      class="row chart-content ml-1"
    >
      <div class="col-md-1 p-0 legend">
        <span>{{ item.label }}</span>
      </div>
      <div class="col-md-9 p-0 ">
        <div class="bar-item">
          <div
            class="bar_success"
            :style="getSizeWidth(maxTotal, item.subTotal)"
          ></div>
          <div
            class="bar_danger"
            :style="getSizeWidth(maxTotal, item.total - item.subTotal)"
          ></div>
        </div>
      </div>
      <div class="col-md-2 p-0 text-right legend">
        <span>{{ item.subTotal }}/{{ item.total }} </span>
      </div>
    </div>
    <div class="row mt-2 legend">
      <div class="col-md-5">
        <i style="color: #7794cc" class="fas fa-circle mr-1"></i>
        <span>Presentes</span>
      </div>
      <div class="col-md-5">
        <i style="color: #e6a7b3" class="fas fa-circle mr-1"></i>
        <span>Matriculados</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "CharHorizoltal",
  data() {
    return {
      today: moment().format("YYYY-MM-DD"),
      maxTotal: 10,
      data: [
        {
          total: 10,
          subTotal: 8,
          label: "7h",
        },
        {
          total: 8,
          subTotal: 1,
          label: "8h",
        },
        {
          total: 9,
          subTotal: 9,
          label: "9h",
        },
      ],
    };
  },
  methods: {
    getSizeWidth(limit, ref) {
      var varRelative;
      limit >= ref ? (varRelative = (ref / limit) * 100) : (varRelative = ref);
      //   console.log('lim->' , limit , 'ref->', ref, 'var->', varRelative)
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
    font-size: 15px;
    font-weight: 100;
    color: #999;
  }

  .chart-content {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    border-top: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-around;

    .bar-item {
      height: 8px;
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
