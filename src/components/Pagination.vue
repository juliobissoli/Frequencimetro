<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="current_page"
      :total-rows="total"
      :per-page="per_page"
      aria-controls="my-table"
      size="sm"
      @input="changePage()"
    ></b-pagination>
  </div>
</template>

<script>
  export default {
    props: ['items', 'perPage', 'currentPage', 'total'],
    data(){
      return {
        per_page: this.perPage,
        current_page: this.currentPage
      }
    },
    created(){
      this.per_page = this.perPage
      this.current_page = this.currentPage
    },
    methods:{
      changePage(){
        this.$emit('change-page', this.current_page)
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    }
  }
</script>