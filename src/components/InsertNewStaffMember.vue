<template>
  <q-dialog v-model="props.isOpenModal" persistent>
    <q-card class="my-card">
      <q-card-section class="row q-col-gutter-lg q-mb-lg">
        <div class="col-6">
          <q-input v-model.trim="form.lastName" label="Nom" />
        </div>
        <div class="col-6">
          <q-input v-model.trim="form.firstName" label="Prénoms" />
        </div>
        <div class="col-12">
          <q-input v-model.trim="form.job" label="Poste" />
        </div>
        <div class="col-6">
          <q-select
            v-model="form.contrat"
            :options="contratOptions"
            label="Contrat"
          />
        </div>
        <div class="col-6">
          <q-select
            v-model="form.gender"
            :options="genderOptions"
            label="Genre"
          />
        </div>
        <div class="col-2">
          <q-avatar>
            <img :src="form.imageUrl ? form.imageUrl : defaultImage" />
          </q-avatar>
        </div>
        <div class="col-10">
          <q-input v-model="form.imageUrl" label="Url image" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Annuler"
          color="brand"
          v-close-popup
          @click="closeModal()"
        />
        <q-btn
          @click="addNewStaffMember()"
          label="Enregistrer"
          color="brand"
          :disable="!isValidForm"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { Contrat, Gender, Staff } from './models';
import { useStaffManagementStore } from 'src/stores/staff-management';

const contratOptions = ['CDI', 'CDD', 'STAGE', 'CONSULTANCE', 'INTERIM'];
const genderOptions = ['M', 'F'];

export default defineComponent({
  name: 'InsertNewStaffMember',
  props: {
    isOpenModal: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ['closeModal'],

  setup(props, { emit }) {
    const form = ref({
      lastName: '',
      firstName: '',
      job: '',
      contrat: '' as Contrat,
      imageUrl: '',
      gender: '' as Gender,
    });
    const defaultImage = ref(
      'https://static.thenounproject.com/png/4035889-200.png'
    );
    const staffManagement = useStaffManagementStore();

    const isValidForm = computed(() => {
      return !!(
        form.value.firstName.length &&
        form.value.firstName.length >= 2 &&
        form.value.lastName.length &&
        form.value.lastName.length >= 2 &&
        form.value.job.length &&
        form.value.job.length >= 2 &&
        form.value.contrat.length &&
        form.value.gender.length
      );
    });

    const addNewStaffMember = () => {
      let newMember: Staff = {
        name: form.value.firstName + ' ' + form.value.lastName,
        job: form.value.job,
        contrat: form.value.contrat,
        photo: form.value.imageUrl,
        gender: form.value.gender,
        status: true,
      };
      staffManagement.create(newMember);
      closeModal();
    };

    const closeModal = () => {
      emit('closeModal');
      form.value = {
        lastName: '',
        firstName: '',
        job: '',
        contrat: '' as Contrat,
        imageUrl: '',
        gender: '' as Gender,
      };
    };

    return {
      props,
      form,
      contratOptions,
      genderOptions,
      isValidForm,
      defaultImage,
      closeModal,
      addNewStaffMember,
    };
  },
});
</script>

<style scoped>
.my-card {
  min-width: 300px;
}
</style>
