<template>
  <div class="row p-3">
    <div class="col-lg-6 pr-1">
      <div class="shadow p-4 mb-5 area-animate">
        <div class="row  d-flex aligner-items-center" v-for="(i, k) in 4" :key="k" >
          <div class="col-md-10 lien_list"></div>
          <div class="col-md-2 circle">
            <i class=" fas fa-circle mr-1"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 pl-1">
      <div class="shadow p-3 mb-5 area-animate">
        charge
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.area-animate {
  // background-color: #7794cc;
  background-color: #e1ebf7;
  border-radius: 0.4rem;
  .lien_list {
    background-color: #e6a7b3;
    height: 20px;
    border-radius: 0.4rem;
  }
  .circle {
    color: #e6a7b3;
    font-size: 20px;
    border-radius: 1rem;
  }
}
</style>
