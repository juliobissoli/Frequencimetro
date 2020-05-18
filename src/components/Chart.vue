<template>
  <div
    class="chart p-3"
    :style="bgColor ? 'background-color:' + bgColor : 'background-color: white'"
  >
    <div class="title mb-3 d-flex justify-content-between">
      <span>{{ title }}</span>
      <input
        v-show="year"
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
          <span v-if="formatValue === 'relative'"
            >{{ item.subTotal }} / {{ item.total }}</span
          >
          <span v-else>{{ item.subTotal }}</span>
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
      <div v-for="(item, index) in legend" :key="index" class="col-md-5">
        <i :style="{ color: item.color }" class="fas fa-circle mr-1"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'Chart',
  props: [
    'maxTotal',
    'statistics',
    'title',
    'year',
    'legend',
    'formatValue',
    'bgColor'
  ],
  data() {
    return {
      hover: false,

      yearSelected: moment().format('YYYY')
    }
  },
  watch: {
    yearSelected: function () {}
  },
  methods: {
    getPercent(limit, ref) {
      var varRelative
      limit >= ref ? (varRelative = (ref / limit) * 100) : (varRelative = ref)
      // console.log("--lim->", limit, "ref->", ref, "var->", varRelative);

      return 'height:' + varRelative.toFixed(0) + '%;'
    },
    changeYear() {
      this.$emit('chmage-year')
    }
  }
}
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
  // background-color: white;
  font-family: 'Avenir Next W01', 'Lato', 'Karla', 'Proxima Nova W01', 'Rubik',
    -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue',
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
  height: 40vh;
  width: 100%;
  border-radius: 0.5rem;
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
    // transition: height 1s;
    // overflow: hidden;
    // height: 0;
    // background-color: #fd2;
    .label {
      height: 20px;
      font-size: 14px;
      color: #ccc;
    }
    .value {
      font-size: 12px;
      color: #ccc;
      display: none;
      // visibility: hidden;
    }
    @keyframes suavizedBar {
      0% {
        transform: translateY(0%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    .bar_success {
      // width: 20px;
      // animation: suavizedBar 300ms;
      // height: auto;
      margin: 1px 0;
      width: 100%;
      border-radius: 0.4rem;
      background-color: #7794cc;
    }
    .bar_danger {
      // width: 20px;
      // height: auto;
      margin: 1px 0;
      width: 100%;
      border-radius: 0.4rem;
      background-color: #e6a7b3;
    }
  }

  .bar-item:hover .value {
    display: block;
    color: #444;
  }
}
</style>
