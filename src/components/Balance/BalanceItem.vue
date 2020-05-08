<template>
  <div class="chart">
    <div class="row ml-1 py-2 px-2 mb-2">
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
    <div class="clikable ml-4 " v-for="(item, index) in charge" :key="index">
      <div
        class="row line chart-content bg-light mb-2 shadow-sm"
        :class="{ lineSelected: chargeSelected === index }"
        @click="chargeSelected = index"
      >
        <div class="col-md-2 p-0">
          <div class="">
            <span>{{ item.period }}</span>
          </div>
        </div>
        <div class="col-md-3 p-0">
          {{ date(item.date_end) }}
        </div>
        <div class="col-md-3 p-0 pl-1">
          <div>
            <div class="bar-item">
              <div
                class="bar_success"
                :style="getSizeWidth(item.payment)"
              ></div>
              <div
                class="bar_danger"
                :style="
                  getSizeWidth(item.payment > 0 ? 100 - item.payment : 100)
                "
              ></div>
            </div>
          </div>
        </div>
        <div class="col-md-2 p-0 d-flex justify-content-end legend">
          <span class="value_primary mr-1"
            >{{ (item.payment * 1).toFixed(0) }}% Recebido
          </span>
        </div>
        <div class="col-md-1 pl-2 p-0 d-flex justify-content-end">
          <button
            class="btn btn-sm btn-outline-secondary p-1"
            style="border: none;"
            @click="editClick(item)"
          >
            <i class="far fa-edit"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'CharHorizoltal',
  props: ['title', 'today', 'charge'],
  data() {
    return {
      data: this.statistics,
      maxTotal: this.maxNunbe,
      chargeSelected: 0
    }
  },
  watch: {
    chargeSelected() {
      this.$emit('change-select-cherge', this.charge[this.chargeSelected])
    }
  },
  methods: {
    getSizeWidth(payment) {
      return 'width:' + (payment * 1).toFixed(0) + '%;'
    },
    date(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    editClick(item) {
      this.$emit('charge-clicked', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.line {
  border-radius: 0.4rem;
}
.chart {
  // background-color: #ffffff;
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
    font-size: 11px;
    font-weight: 100;
    color: #999;
  }
  .lineSelected {
    // border: 1px solid #adcdf5;
    background-color: #c1d7f1 !important;
    transform: scale(1.05);
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
        background-color: #54b889;
      }
      .bar_danger {
        height: 100%;
        //border-radius: 4rem 0 0 4rem;
        border-radius: 4rem;
        background-color: #cf566c;
      }
    }
  }
}
</style>
