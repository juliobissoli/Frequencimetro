<template>
  <div class="chart p-3">
    <div class="title mb-3">
      <span>{{title}}</span>
    </div>
    <div class="chart-content">
      <div v-for="(item, index) in data" :key="index" class="bar-item">
        <div class="value">
          <span>{{ item.subTotal }} / {{ item.total }}</span>
        </div>
        <div
          class="bar_danger"
          :style="getPercent(maxTotal, item.total - item.subTotal)"
        ></div>
        <div
          class="bar_success"
          :style="getPercent(maxTotal, item.subTotal)"
        ></div>
        <div class="label">{{ item.label }}</div>
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
export default {
  name: "Chart",
  data() {
    return {
      maxTotal: 20,
      title: 'Frequencia',
      data: [
        {
          total: 20,
          subTotal: 19,
          label: "7h",
        },
        {
          total: 15,
          subTotal: 2,
          label: "8h",
        },
        {
          total: 8,
          subTotal: 0,
          label: "9h",
        },
        {
          total: 7,
          subTotal: 3,
          label: "10h",
        },
        {
          total: 3,
          subTotal: 1,
          label: "11h",
        },
        {
          total: 9,
          subTotal: 10,
          label: "12h",
        },
        {
          total: 9,
          subTotal: 8,
          label: "13h",
        },
        {
          total: 12,
          subTotal: 10,
          label: "14h",
        },
        {
          total: 11,
          subTotal: 8,
          label: "15h",
        },
        {
          total: 15,
          subTotal: 10,
          label: "16h",
        },
        {
          total: 18,
          subTotal: 18,
          label: "17h",
        },
      ],
    };
  },
  methods: {
    getPercent(limit, ref) {
      var varRelative;
      limit >= ref ? (varRelative = (ref / limit) * 100) : (varRelative = ref);
      return "height:" + varRelative.toFixed(0) + "%;";
    },
  },
};
</script>
<style lang="scss" scoped>
.chart {
  background-color: #f5f6fd;
  font-family: "Avenir Next W01", "Lato", "Karla", "Proxima Nova W01", "Rubik",
    -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
    Arial, sans-serif;
  color: #000529;
  border-radius: 0.4rem;
  .title {
    width: 100%;
    font-size: 20px;
    font-weight: 100;
  }
  .legend {
    font-size: 14px;
    font-weight: 100;
  }
}
.chart-content {
  height: 30vh;
  width: 100%;
  border-radius: 0.5rem;
  //   background-color: #f5faff;
  //   background-color: #e1ebf7;
  //   background-color: #f8f9fa !important;

  display: flex;
  justify-content: space-around;

  .bar-item {
    height: 100%;
    // width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    align-self: flex-end;
    // background-color: #fd2;
    .label {
      height: 20px;
      font-size: 14px;
      color: #ccc;
    }
    .value {
      font-size: 12px;
      color: #ccc;
    }
    .bar_success {
      width: 6px;
      border-radius: 0 0 4rem 4rem;

      background-color: #7794cc;
      border-radius: none;
    }
    .bar_danger {
      // width: 4px;
      width: 6px;
      border-radius: 4rem 4rem 0 0;
      background-color: #e6a7b3;
    }
  }
}
</style>
