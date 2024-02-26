<template>
  <q-page padding>
    <!-- content -->
    <section>
      <article class="row justify-between">
        <div>
          <q-chip
            color="brand"
            text-color="white"
            icon="task"
            size="xl"
            label="Demande administrative"
          />
        </div>
        <div>
          <q-btn
            @click="isOpenCreateRequestModal = true"
            round
            color="brand"
            icon="add"
            size="xl"
          >
            <q-tooltip class="text-bold text-subtitle2 bg-grey-9">
              Faire une nouvelle demande
            </q-tooltip>
          </q-btn>
        </div>
      </article>
      <article>
        <q-card class="my-card" flat>
          <q-card-section class="bg-brand-light text-dark">
            <div class="text-h4">{{ currentUserRequest.length }}</div>
            <div class="text-subtitle1">
              {{ currentUserRequest.length > 1 ? 'demandes' : 'demande' }}
            </div>
          </q-card-section>
        </q-card>
      </article>
    </section>

    <section class="q-mt-xl">
      <q-table
        title=""
        :rows="currentUserRequest"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input
            color="brand"
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="type" :props="props">
              <p>{{ props.row.type }}</p>
              <span
                v-if="props.row.type === 'CONGÉ'"
                class="text-bold text-grey-8"
              >
                du {{ formatStringToDate(props.row.period.from) }} au
                {{ formatStringToDate(props.row.period.to) }}</span
              >
            </q-td>
            <q-td key="status" :props="props" class="text-subtitle2">
              <q-badge
                v-if="props.row.status === 'EN COURS'"
                color="amber-8"
                class="text-subtitle2"
              >
                {{ props.row.status }}
              </q-badge>
              <q-badge
                v-if="props.row.status === 'VALIDÉ'"
                color="positive"
                class="text-subtitle2"
              >
                {{ props.row.status }}
              </q-badge>
              <q-badge
                v-if="props.row.status === 'REJETÉ'"
                color="negative"
                class="text-subtitle2"
              >
                {{ props.row.status }}
              </q-badge>
            </q-td>
            <q-td key="actions" :props="props">
              <div>
                <q-btn disable round flat color="black" icon="edit">
                  <q-tooltip class="text-bold text-subtitle2 bg-grey-9">
                    Modifier ma demande
                  </q-tooltip>
                </q-btn>
                <q-btn disable round flat color="negative" icon="cancel">
                  <q-tooltip class="text-bold text-subtitle2 bg-grey-9">
                    Annuler ma demande
                  </q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </section>

    <!-- CREATE REQUEST MODAL -->
    <CreateRequestModal
      :is-open-modal="isOpenCreateRequestModal"
      @close-modal="() => (isOpenCreateRequestModal = false)"
    ></CreateRequestModal>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import CreateRequestModal from 'src/components/CreateRequestModal.vue';
import { useRequestStore } from 'src/stores/administrative-requests';
import { date } from 'quasar';
import { useUsersStore } from 'src/stores/users';

const columns = [
  {
    name: 'type',
    align: 'center',
    label: 'Type de demande',
    field: 'type',
    sortable: true,
  },
  {
    name: 'status',
    align: 'left',
    label: 'Status',
    field: 'status',
    sortable: true,
  },
  { name: 'actions', label: 'actions', field: 'actions' },
];

export default defineComponent({
  name: 'AdministrativeRequests',
  components: { CreateRequestModal },

  setup() {
    const filter = ref('');
    const isOpenCreateRequestModal = ref(false);
    const requestStore = useRequestStore();
    const userStore = useUsersStore();

    const currentUserRequest = computed(() => {
      if (userStore.userAuthenticate) {
        return requestStore.requests.filter(
          (el) => el.user.email === userStore.userAuthenticate?.email
        );
      }
      return [];
    });

    const formatStringToDate = (dateString: string) => {
      return date.formatDate(dateString, 'ddd DD MMM YYYY', {
        daysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        monthsShort: [
          'Jan',
          'Fev',
          'Mars',
          'Avr',
          'Mai',
          'Juin',
          'Juil',
          'Août',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      });
    };

    return {
      isOpenCreateRequestModal,
      requestStore,
      filter,
      columns,
      currentUserRequest,
      formatStringToDate,
    };
  },
});
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  border-radius: 14px;
}
</style>
