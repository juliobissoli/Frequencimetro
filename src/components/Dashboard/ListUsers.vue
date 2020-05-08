<template>
  <div class="list_are rounded p-3">
    <BarTop
      class="mb-2"
      title="Ususarios"
      font="20"
      :input="false"
      @button-clicked="$emit('btn-clicked')"
      :btn="{ class: 'btn-outline-dark btn-sm', label: '+ Ususario' }"
    />
    <div class="row">
      <div class="col-md-12 p-2">
        <CardUser
          today="Você"
          title="Julio Bissoli"
          subTitle="Adm"
          classColor="secondary"
          class="shadow rounded"
        />
        <div v-for="(item, index) in listUser" :key="index">
          <div class="col-md-12 mt-2 px-3" style="cursor: pointer" @click="$emit('update-user', item)">
            <CardUser
              :title="item.name"
              :subTitle="item.type"
              classColor="darck"
              class="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardUser from '../CardUser'
import BarTop from '../BarTop'

import api from '../../services/api'

export default {
  name: 'ListiUsers',
  props: ['check_api'],
  components: {
    CardUser,
    BarTop
  },
  data: () => ({
    listUser: []
  }),
  watch: {
    check_api(){
      this.getUsers()
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      api.get('/listUser').then((res) => {
        this.listUser = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list_are {
  background-color: #e1ebf7;
}
</style>
