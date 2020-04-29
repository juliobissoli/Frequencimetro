<template>
  <div>
    <NewBalance
      v-show="isModalVisible"
      @close="isModalVisible = false"
      @updateApi="changeData++"
      :mode="typeModal"
      :charge="chargeData"
    />
    <div class="row">
      <div class="col-md-6">
        <BarTop class="mb-2" title="Financeiro" :input="false" :btn="false" />
        <div class="shadow p-3 mb-5 bg-white rounded">
          <BarTop
            class="mb-2"
            @button-clicked="newCharge()"
            :input="true"
            @get-search="getSearch"
            :btn="{
              class: 'btn-outline-dark btn-sm',
              label: 'Add Cobrança',
            }"
            placeholder="Buscar data"
          />

          <div>
            <BalanceItem
              :charge="charge"
              :maxNunber="maxTotal"
              @charge-clicked="chargeDetail"
            />
          </div>
          <Pagination
            class="mt-3 mb-0"
            @change-page="changePage"
            :items="charge"
            :perPage="perPage"
            :currentPage="currentPage"
            :total="totalData"
          />
        </div>
      </div>

      <div class="col-md-6">
        <BarTop class="mb-2" title="Abril" :input="false" :btn="false" />
        <div class="row">
          <div class="col-md-4 pr-1">
            <CardBalance
              clasIcon="fas fa-heartbeat"
              title="201"
              subTitle="Pagamentos"
              classColor="primary"
              class="shadow  rounded"
            />
          </div>
          <div class="col-md-4 pl-1">
            <CardBalance
              clasIcon="fas fa-heartbeat"
              title="2145"
              subTitle="Receita"
              classColor="primary"
              class="shadow  rounded"
            />
          </div>
          <div class="col-md-4 pl-1 mb-3">
            <CardBalance
              clasIcon="fas fa-heartbeat"
              title="21"
              subTitle="Pendentes"
              classColor="primary"
              class="shadow  rounded"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="shadow p-3  bg-white rounded">
              <PaymentList title="Pagamentos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarTop from "../../components/BarTop";
import BalanceItem from "../../components/Balance/BalanceItem";
import Pagination from "../../components/Pagination";
import CardBalance from "../../components/CartExtats";
import PaymentList from "../../components/Balance/PaymentList";
import NewBalance from "./NewBalance";

import api from "../../services/api";
export default {
  name: "BalanceList",
  components: {
    BarTop,
    BalanceItem,
    Pagination,
    CardBalance,
    PaymentList,
    NewBalance,
  },
  data() {
    return {
      isModalVisible: false,
      typeModal: "create",
      changeData: 1,
      chargeData: null,
      maxTotal: 22,
      currentPage: 1,
      perPage: 10,
      totalData: 10,
      charge: [],
    };
  },
  created() {
    this.getCharges();
  },
  watch: {
    changeData() {
      console.log(this.changeData);
      this.getCharges();
    },
  },
  methods: {
    getSearch() {
      return "";
    },
    getCharges() {
      api
        .get("/charge", {
          params: {
            perPage: this.perPage,
            currentPage: this.currentPage,
          },
        })
        .then((res) => {
          console.log("ta no ge charge");
          this.totalData = res.data.total;
          this.currentPage = res.data.page;
          this.perPage = res.data.perPage;
          this.charge = res.data.data;
        });
    },
    changePage(page) {
      this.currentPage = page;
      this.getCharges();
    },
    newCharge() {
      this.typeModal = "create";
      this.chargeData = null;
      this.isModalVisible = !this.isModalVisible;
      this.chargeItem = {
        month: "",
        year: "",
        date_end: "",
      };
    },
    chargeDetail(item) {
      this.typeModal = "edit";
      this.isModalVisible = !this.isModalVisible;
      this.chargeData = item;
      let period = item.period.split("/");
      this.chargeItem = {
        month: period[0],
        year: period[1],
        date_end: item.date_end,
      };
    },
  },
};
</script>
