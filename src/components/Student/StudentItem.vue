<template>
  <div class="row d-flex align-items-center ">
    <div class="col-md-1" style="color:#6ad943;">
      <!-- <Avatar /> -->
      #{{ item.id }}
    </div>

    <div class="col-md-4">
      <router-link :to="{ name: 'UserDetail', params: { item } }">
        {{ item.name }}
      </router-link>
    </div>

    <div class="col-md-5">
      {{ (item.hour * 1).toFixed(0) }}h , {{item.days}} 
    </div>
    <div class="col-md-2 d-flex justify-content-end">
      <button class="btn btn-sm btn-primary">
        <i class="fas fa-heartbeat"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentItem",
  props: ["item"],
  methods: {
    montSchedule(hour, days) {
      if (!days || !hour) return "";
      const d = days.split(" ");
      const week = new Map([
        ["0", "domingo"],
        ["1", "segunda"],
        ["2", "terça"],
        ["3", "quarta"],
        ["4", "quinta"],
        ["5", "sexta"],
        ["6", "sabado"],
      ]);
      hour += "h ";
      if (d.langht >= 5) {
        hour += " segunda a sexta";
      } else {
        for (var i in d) {
          hour += ", " + week.get(d[i]);
        }
      }
      return hour;
    },
  },
};
</script>
