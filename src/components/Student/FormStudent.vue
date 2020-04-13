<template>
  <div>
    <div class="row">
      <div class="form-group col-md-8">
        <label>Nome</label>
        <div class="input-group input-group">
          <input
            v-model="student.name"
            class="form-control"
            placeholder="Nome do aluno"
            :readonly="!isEdtiMode"
          />
        </div>
      </div>

      <div class="form-group col-md-4">
        <label>CPF</label>
        <div class="input-group input-group">
          <input
            v-model="student.cpf"
            class="form-control"
            placeholder="CPF"
            :readonly="!isEdtiMode"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-8">
        <label>Email</label>
        <div class="input-group input-group">
          <input
            v-model="student.email"
            class="form-control"
            placeholder="emial"
            :readonly="!isEdtiMode"
          />
        </div>
      </div>

      <div class="col-md-4 form-group">
        <label>Telefone</label>
        <div class="input-group input-group">
          <input
            v-model="student.telephone"
            class="form-control"
            placeholder="(99)99999999"
            :readonly="!isEdtiMode"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-8">
        <label>Endereço</label>
        <div class="input-group input-group">
          <input
            v-model="student.address"
            class="form-control"
            placeholder="Ex: Rua nume,bairro Cidade-XX"
            :readonly="!isEdtiMode"
          />
        </div>
      </div>

      <div class="col-md-4 form-group">
        <label>Situação</label>
        <select
          v-if="isEdtiMode"
          v-model="student.situation"
          class="form-control"
        >
          <option>Aluno</option>
          <option>Professor</option>
          <option>Servidor</option>
        </select>

        <div v-else class="input-group input-group">
          <input v-model="student.situation" class="form-control" readonly />
        </div>
      </div>
    </div>

    <h5>
      Atividade:
    </h5>
    <div class="row">
      <div class="form-group col-md-4">
        <label>Hora</label>
        <div class="input-group input-group">
          <input
            v-model="student.hour"
            type="number"
            min="7"
            max="23"
            class="form-control"
            :readonly="!isEdtiMode"
          />
        </div>
      </div>
      <div class="col-md-8">
        <div>
          <label class="typo_label">Dias</label>
          <multiselect
            v-if="isEdtiMode"
            v-model="student.daysActvities"
            :options="options"
            :multiple="true"
            group-values="libs"
            group-label="days"
            :close-on-select="false"
            :group-select="true"
            placeholder="Selecione os dias de atividades"
            track-by="name"
            label="name"
          >
            <span slot="noResult"> </span>
          </multiselect>

          <div v-else class="input-group input-group">
            <input v-model="student.days" class="form-control" readonly />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <label>Modalidade</label>
        <select
          v-if="isEdtiMode"
          v-model="student.modality"
          class="form-control"
        >
          <option>Musculação</option>
          <option>Pilates</option>
          <option>Funcional</option>
        </select>

        <div v-else class="input-group input-group">
          <input v-model="student.modality" class="form-control" readonly />
        </div>
      </div>
      <div class="form-group col-md-6">
        <label>Mensalidade</label>
        <div class="input-group input-group">
          <input
            v-model="student.payment"
            class="form-control"
            type="number"
            min="0"
            placeholder=""
            :readonly="!isEdtiMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "FormStudent",
  props: ["student", "isEdtiMode"],
  components: { Multiselect },
  data() {
    return {
      value: [],
      options: [
        {
          days: "Todos os dias",
          libs: [
            { name: "Segunda" },
            { name: "Terça" },
            { name: "Quarta" },
            { name: "Quinta" },
            { name: "Sexta" },
          ],
        },
      ],
    };
  },
};
</script>
