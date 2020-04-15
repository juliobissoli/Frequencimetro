<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="current_page"
      total-rows="30"
      :per-page="per_page"
      aria-controls="my-table"
      size="sm"
    ></b-pagination>
  </div>
</template>

<script>
  export default {
    props: ['items', 'perPage', 'currentPage'],
    data(){
      return {
        per_page: null,
        current_page: null
      }
    },
    created(){
      this.per_page = this.perPage
      this.current_page = this.currentPage

    },
    computed: {
      rows() {
        return this.items.length
      }
    }
  }
</script>