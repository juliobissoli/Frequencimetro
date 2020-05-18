<template>
  <div class="swith_tabs ml-3">
    <div class="">
      <input type="radio" id="frequenci" value="frequenci" v-model="selected" />
      <label
        for="frequenci"
        class="mb-0 p-2 px-3"
        :class="{ 'button-selected': selected === 'frequenci' }"
      >
        <span>Frequência</span>
      </label>
    </div>
    <div class="">
      <input type="radio" id="charges" value="charges" v-model="selected" />
      <label
        for="charges"
        class="mb-0 p-2 px-3"
        :class="{ 'button-selected': selected === 'charges' }"
      >
        <span>Mensalidades</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwiyhTabs',
  data(){
      return {
          selected: 'frequenci'
      }
  },
  watch: {
      selected(){
          this.$emit('change-selected', this.selected)
      }
  }
}
</script>

<style lang="scss" scoped>
.swith_tabs {
  display: flex;
  align-items: flex-end;
  input {
    display: none;
  }
  span {
    font-size: 20px;
    color: #444;
  }
}
.button-selected {
  background-color: #e1ebf7;
  border-radius: 0.4rem 0.4rem 0 0;
  span {
    // border-bottom: solid 1px #fff;
    // color: #022069
  }
}
</style>
