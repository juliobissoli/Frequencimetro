<template>
  <div class="bar_top">
    <h3 v-show="title" :style="{ fontSize: font ? font + 'px' : '26px' }">
      {{ title }}
    </h3>
    <div v-show="input" class="search-input mb-3">
      <input
        v-debounce:500ms="serach"
        type="text"
        :placeholder="placeholder"
        class="form-control"
        v-model="serachTocken"
      />
    </div>
     <button
      v-show="btn"
      @click="$store.state.user.isAdmin ? btnClicked() : ''"
      class="btn mb-3"
      :style="'opacity:'+ ($store.state.user.isAdmin ? '0.9': '0.3')"
      :class="btn.class"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'BarTop',

  props: ['title', 'input', 'btn', 'placeholder', 'font'],
  data() {
    return {
      serachTocken: null
    }
  },
  methods: {
    btnClicked() {
      this.$emit('button-clicked')
    },
    serach() {
      this.$emit('get-search', this.serachTocken)
    }
  }
}
</script>

<style lang="scss" scoped>
.bar_top {
  border-bottom: 2px solid #eef1f3;
  //   height: 8vh;
  //   background-color: #f8f9fa;
  //   -webkit-box-shadow: -1px 11px 46px -21px rgba(87, 87, 87, 1);
  //   -moz-box-shadow: -1px 11px 46px -21px rgba(87, 87, 87, 1);
  //   box-shadow: -1px 4px 41px -20px rgba(87, 87, 87, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #555;

  .title {
    // font-size: 20px;
  }

  .search-input {
    position: relative;
    margin-bottom: 5px;
    input {
      border: none;
      //   height: 30px;
      //   padding-right: 25px;
      //   color: #f1f1f1f1;
      // background-color: rgba(33, 37, 41, 0.1);
      background-color: #e1ebf7;
      border-radius: 0.4rem;
      // border: 1px solid #ccc;
      width: 25vw;
      height: 30px;
      font-size: 15px;
      padding-left: 10px;
    }
    ::placeholder {
      color: #7794cc;
    }
    &:after {
      position: absolute;
      font-family: 'Font Awesome 5 Free';
      content: '\f002';
      font-weight: 900;
      right: 13px;
      top: 3px;
      color: #7794cc;
    }
  }
}
</style>
