<template>
  <router-view :search="search" />
</template>

<script>
export default {
  name: 'Users',
  props: ['search']
}
</script>
