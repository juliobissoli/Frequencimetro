<template>
  <div>
    <BarTop class="mb-2" title="Financeiro" :input="false" :btn="false" />
    <div class="row">
      <div class="col-md-6">
        <div class="shadow p-3 mb-5 bg-white rounded">
          <BarTop
            class="mb-2"
            @button-clicked="isModalVisible = !isModalVisible"
            :input="true"
            @get-search="getSearch"
            :btn="{
              class: 'btn-outline-dark btn-sm',
              label: 'Add Cobrança',
            }"
            placeholder="Buscar data"
          />

          <div>
            <BalanceItem :statistics="charge" :maxNunber="maxTotal" />
          </div>
          <Pagination />
        </div>
      </div>
      <div class="col-md-6">
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
          <div class="col-md-4 pl-1 mb-2">
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
            <div class="shadow p-2 mb-5 bg-white rounded">
             <PaymentList />
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
import PaymentList from '../../components/Balance/PaymentList'
export default {
  name: "BalanceList",
  components: { BarTop, BalanceItem, Pagination, CardBalance, PaymentList },
  data() {
    return {
      isModalVisible: false,
      maxTotal: 22,
      charge: [
        {
          label: "Abril 2020",
          total: 20,
          subTotal: 17,
        },
        {
          label: "Março 2020",
          total: 20,
          subTotal: 19,
        },
        {
          label: "Janeiro 2020",
          total: 20,
          subTotal: 17,
        },
      ],
    };
  },
  methods: {
    getSearch() {
      return "";
    },
  },
};
</script>
