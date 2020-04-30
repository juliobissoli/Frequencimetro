<template>
  <div>
    <ModalDelete
      v-show="modalDeleteVisible"
      :item="student"
      @close="modalDeleteVisible = false"
    />
    <div class="row">
      <div class="col-md-6">
        <BarTop
          class="mb-2"
          :title="'Aluno: ' + student.name"
          @button-clicked="isEdtiMode = !isEdtiMode"
          :btn="
            !isEdtiMode
              ? { class: 'btn-outline-dark btn-sm', label: 'Editar' }
              : { class: 'btn-outline-danger btn-sm', label: 'Cancelar' }
          "
        />
        <div class="shadow p-3 mb-1 bg-white rounded">
          <form>
            <FormStudent :student="student" :isEdtiMode="isEdtiMode" />
            <div v-show="isEdtiMode" class="row">
              <div class="col-12 d-flex justify-content-between">
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="modalDeleteVisible = true"
                >
                  Remover aluno
                </button>
                <button class="btn btn-primary btn-sm" @click="updateStudent()">
                  Salvar alterações
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <div class="abas_select">
          <SwithTabs
            class="p-0"
            @change-selected="changeFormatView"
          />
        </div>
        <div class="abas_are rounded mt-0 p-3">
          <div  v-if="swithSelected === 'frequenci'"  class="row">
            <FrenquenciDetail
              :student_id="item.id"
             />
          </div>
          <div v-else class="row">
            <ChargeDetail :item="item"/>
            <!-- <div class="col-md-12">
              <h4>
                Mensalidades
              </h4>
              <div class="p-3 shadow bg-white rounded">
                <PaymentList
                  :payments="paymentList"
                  title="Mensalidades"
                  :monthly_payment="item.payment"
                  :student_id="item.id"
                  @updateApi="getPayments()"
                />
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="rew">
      <div class="col-md-6"></div>
    </div>
  </div>
</template>

<script>

import SwithTabs from '../../components/SwithTabs'
import FormStudent from '../../components/Student/FormStudent'
import api from '../../services/api'
import BarTop from '../../components/BarTop'
import ModalDelete from '../../components/Student/ModalDelit'
import FrenquenciDetail from '../../components/Student/FrequencisDetail'
// import PaymentList from '../../components/Balance/PaymentList'
import ChargeDetail from '../../components/Student/ChargesDetail'


export default {
  name: 'StudentDetail',
  props: ['item'],
  components: {
    BarTop,
    ModalDelete,
    FormStudent,
    SwithTabs,
    FrenquenciDetail,
    ChargeDetail
  },
  data() {
    return {
      swithSelected: 'frequenci',
      formatView: 'chart',
      modalDeleteVisible: false,
      isEdtiMode: false,
      paymentList: [],
      mensageError: '',
      student: {
        name: '',
        cpf: '',
        email: '',
        address: '',
        telephone: '',
        modality: '',
        situation: '',
        hour: '',
        daysActvities: []
      }
    }
  },
  created() {
    this.student = this.item
    this.getPayments()
  },
  methods: {
    close() {
      this.reserve = {}
      this.amount = ''
      this.$emit('close')
    },
    updateStudent() {
      if (this.student) {
        const validator = require('email-validator')
        const validarCpf = require('validar-cpf')

        if (!validator.validate(this.student.email))
          return (this.mensageError = 'Emai-l errado')
        if (!validarCpf(this.student.cpf))
          return (this.mensageError = 'CPF errado')
        const body = {
          ...this.student,
          days: this.monuntDays(this.student.daysActvities)
        }
        this.putStudent(body)
      }
    },
    monuntDays(days) {
      if (!days) return this.student.days
      return days
        .map((el) => el.name)
        .reduce((a, b) => {
          return a + ' ' + b
        })
    },
    async putStudent(body) {
      console.log(body)
      try {
        await api.put('/students/' + this.item.id, body)
        this.$router.push({ name: 'Students' })
      } catch (e) {
        return e
      }
    },
    async getPayments() {
      try {
        await api.get('/charge/' + this.item.id).then((res) => {
          this.paymentList = res.data
        })
      } catch (error) {
        console.log(error)
      }
    },
    changeFormatView(el) {
      console.log(`selected  ${el}`)
      this.swithSelected = el
    }
  }
}
</script>

<style lang="scss" scoped>

.abas_are {
  background-color: #e1ebf7;
}
.abas_select {
  span {
    font-size: 24px;
    color: #444;
  }
}

</style>
