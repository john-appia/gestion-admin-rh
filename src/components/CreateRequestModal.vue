<template>
  <q-dialog v-model="props.isOpenModal" persistent>
    <q-card class="my-card">
      <div class="text-h5 text-brand text-center q-my-lg q-px-lg text-bold">
        Faire une nouvelle demande
      </div>
      <q-card-section class="row q-col-gutter-lg q-mb-lg">
        <div class="col-12">
          <q-select
            v-model="form.type"
            :options="requestType"
            label="Type de demande"
          />
        </div>
        <div v-if="form.type == 'CONGÉ'" class="col-12">
          <q-date v-model="form.period" range color="brand" />
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
import {
  AdministrativeRequest,
  AdministrativeRequestType,
  User,
} from './models';
import { useUsersStore } from 'src/stores/users';
import { useRequestStore } from 'src/stores/administrative-requests';

const requestType = ['CERTIFICAT DE TRAIVAIL', 'CONGÉ', 'BULLETIN DE SALAIRE'];

export default defineComponent({
  name: 'CreateRequestModal',
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
      type: '' as AdministrativeRequestType,
      period: null,
    });

    const userStore = useUsersStore();
    const requestStore = useRequestStore();

    const isValidForm = computed(() => {
      return !!form.value.type.length;
    });

    const addNewStaffMember = () => {
      let newRequest: AdministrativeRequest = {
        id: Date.now(),
        user: userStore.userAuthenticate as User,
        type: form.value.type,
        period: form.value.period,
        status: 'EN COURS',
      };
      console.log(newRequest);
      requestStore.create(newRequest);
      closeModal();
    };

    const closeModal = () => {
      emit('closeModal');
      form.value = {
        type: '' as AdministrativeRequestType,
        period: null,
      };
    };

    return {
      props,
      form,
      requestType,
      userStore,
      isValidForm,
      requestStore,
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
