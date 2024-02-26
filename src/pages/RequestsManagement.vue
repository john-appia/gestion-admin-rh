<template>
  <q-page padding>
    <!-- content -->
    <section>
      <article class="row">
        <div>
          <q-chip
            color="brand"
            text-color="white"
            icon="task"
            size="xl"
            label="Gestion des demandes"
          />
        </div>
      </article>
      <article class="q-mt-lg">
        <q-card class="my-card" flat>
          <q-card-section class="bg-brand-light text-dark">
            <div class="text-h4">{{ requestStore.requests.length }}</div>
            <div class="text-subtitle1">
              {{ requestStore.requests.length > 1 ? 'Demandes' : 'Demande' }}
            </div>
          </q-card-section>
        </q-card>
      </article>
    </section>
    <section class="q-mt-xl">
      <q-table
        title=""
        :rows="requestStore.requests"
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
            <q-td key="photo" :props="props">
              <q-avatar>
                <img
                  :src="
                    props.row.user.photo
                      ? props.row.user.photo
                      : 'https://static.thenounproject.com/png/4035889-200.png'
                  "
                />
              </q-avatar>
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.user.name }}
            </q-td>
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
            <q-td key="status" :props="props">
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
                <q-btn
                  @click="validateRequest(props.row.id)"
                  round
                  flat
                  color="positive"
                  icon="check_circle"
                >
                  <q-tooltip class="text-bold text-subtitle2 bg-grey-9">
                    Valider la demande
                  </q-tooltip>
                </q-btn>
                <q-btn
                  @click="rejectedRequest(props.row.id)"
                  round
                  flat
                  color="negative"
                  icon="block"
                >
                  <q-tooltip class="text-bold text-subtitle2 bg-grey-9">
                    Rejeté la demande
                  </q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </section>
  </q-page>
</template>

<script lang="ts">
import { date } from 'quasar';
import { useRequestStore } from 'src/stores/administrative-requests';
import { defineComponent, ref } from 'vue';

const columns = [
  { name: 'photo', align: 'center', label: 'Photo', field: 'photo' },
  {
    name: 'name',
    align: 'left',
    label: 'Nom & prénoms',
    field: 'name',
    sortable: true,
  },
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
  name: 'RequestsManagement',

  setup() {
    const requestStore = useRequestStore();
    const filter = ref('');

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

    const validateRequest = (requestID: number) => {
      requestStore.updateStatus(requestID, 'VALIDÉ');
    };

    const rejectedRequest = (requestID: number) => {
      requestStore.updateStatus(requestID, 'REJETÉ');
    };

    return {
      columns,
      filter,
      requestStore,
      formatStringToDate,
      validateRequest,
      rejectedRequest,
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
