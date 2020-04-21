<template>
  <div class="chart p-3">
    <div class="title mb-3 d-flex justify-content-between">
      <span>{{ title }}</span>
      <input
        class="input"
        type="number"
        min="2020"
        :value="yearSelected"
        v-debounce:500ms="changeYear"
      />
    </div>
    <div class="chart-content">
      <div v-for="(item, index) in statistics" :key="index" class="bar-item">
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

        <div class="label">{{ item.label }}h</div>
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
  name: "Chart",
  props: ["maxTotal", "statistics", "title"],
  data() {
    return {
      yearSelected: moment().format("YYYY"),
    };
  },
  watch: {
    yearSelected: function() {
      console.log("mudo");
    },
  },
  methods: {
    getPercent(limit, ref) {
      var varRelative;
      limit >= ref ? (varRelative = (ref / limit) * 100) : (varRelative = ref);
      console.log("--lim->", limit, "ref->", ref, "var->", varRelative);

      return "height:" + varRelative.toFixed(0) + "%;";
    },
    getMonth(month) {
      var date =
        this.yearSelected + "-" + (month > 9 ? "0" + month : month) + "-10";
      return moment(date).format("MMM");
    },
    changeYear() {
      this.$emit("chmage-year");
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  border-radius: 0.4rem;
  border: none;
  background-color: #e1ebf7;
  width: 8vw;
  height: 30px;
  text-align: center;
  font-size: 15px;
  color: #7794cc;
}
.chart {
  // background-color: #f5f6fd;
  background-color: white;
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
    width: 2vw;
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
      // visibility: hidden;
      display: none;
    }
    .bar_success {
      // width: 20px;
      margin: 1px 0;
      width: 100%;
      border-radius: 0.4rem;
      background-color: #7794cc;
    }
    .bar_danger {
      // width: 20px;
      margin: 1px 0;
      width: 100%;
      border-radius: 0.4rem;
      background-color: #e6a7b3;
    }
  }
}
</style>
