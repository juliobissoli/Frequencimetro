<template>
  <div class="row d-flex align-items-center ">
    <router-link
      class="col-11 line"
      :to="{ name: 'StudentDetail', params: { item } }"
    >
      <div class="row">
        <div class="col-md-2" style="color:#7794cc;">#{{zeroLeft(item.id) }}</div>
        <div class="col-md-6">
          {{ item.name }}
        </div>
        <div class="col-md-4 d-flex justify-content-end">
          <div v-for="i in 5" :key="i" class="">
            <i class="fas fa-circle mr-2 circle text-secundary"></i>
          </div>
        </div>
      </div>
    </router-link>
    <div class="col-md-1 d-flex justify-content-end">
      <button
        v-if="item.attendances.length < 1"
        class="btn btn-sm  primary"
        @click="createAttendance()"
      >
        <i class="fas fa-heartbeat"></i>
      </button>
      <button
        v-else
        style="border:none"
        class="btn btn-sm btn-outline-success"
        @click="dropdown = !dropdown"
      >
        <i class="fas fa-check"></i>
      </button>
      <div v-show="dropdown" class="dropdown">
        <div class="dropdown-content p-6">
          <div class="row">
            <div class="col-12 d-flex justify-content-between">
              <span>Desmarcar presensa</span>
              <button
                @click="dropdown = !dropdown"
                class="btn btn-sm  text-secondary mb-2"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>

            <button
              @click="deletAttendace(item.attendances[0].id)"
              style="width:100%"
              class="col-12 btn btn-sm btn-outline-secondary"
            >
              Desmarcar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  name: "StudentItem",
  props: ["item"],
  data() {
    return {
      dropdown: false,
    };
  },
  methods: {
    async createAttendance() {
      const body = {
        student_id: this.item.id,
      };
      try {
        await api.post("/attendances", body);
        console.log("new attendance");
        this.$emit("updateApi");
      } catch (e) {
        return e;
      }
    },
    async deletAttendace(id) {
      console.log("vai remover");
      try {
        await api.delete("/attendances/" + id);
        this.$emit("updateApi");
        this.dropdown = false;
      } catch (error) {
        console.log(error);
      }
    },
    printDays(days) {
      const vetDays = days.split(" ");
      var str = "";
      vetDays.length === 5 ? (str += "Segunda a sexta") : (str += days);
      return str;
    },
    zeroLeft(num){
      if(num < 10)  return '000' + num
      if (num < 100) return '00' + num 
      if (num < 1000) return '0' + num
      return num
}
  },
};
</script>

<style lang="scss" scoped>
.circle{
  font-size: 12px;
  color: #7794cc;
}
.line {
  color: #444;
  text-decoration: none;
  :hover {
    border: none;
    text-decoration: none;
  }
  .btn {
    z-index: 10;
  }
  .primary {
    color: #7794cc;
    border: none;
  }
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  color: #777;
  right: 0;
  top: 0;
  border: none;
  left: 10px;
  min-width: 20vw;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  margin: 5px 5px;
  cursor: pointer;
  z-index: 1;
}
</style>
