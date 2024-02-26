<template>
  <q-page padding>
    <section class="row wrap q-col-gutter-lg">
      <q-card class="my-card" flat>
        <q-card-section class="bg-brand-light text-dark">
          <div class="text-h4">{{ StaffLength }}</div>
          <div class="text-subtitle1">Collaborateurs</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section class="bg-brand-light text-dark">
          <div class="text-h4">{{ requestsLength }}</div>
          <div class="text-subtitle1">
            {{ requestsLength > 1 ? 'Demandes' : 'Demande' }}
          </div>
        </q-card-section>
      </q-card>
    </section>
    <section class="row q-mt-xl q-col-gutter-lg">
      <article class="col-12 col-sm-6 col-md-4">
        <div class="bg-grey-11 q-pa-md">
          <p class="text-subtitle1 text-bold">Collaborateurs</p>
          <gender-chart></gender-chart>
        </div>
      </article>
      <article class="col-12 col-sm-6 col-md-4">
        <div class="bg-grey-11 q-pa-md">
          <p class="text-subtitle1 text-bold">Détails des demandes</p>
          <requests-chart></requests-chart>
        </div>
      </article>
    </section>
  </q-page>
</template>

<script lang="ts">
import GenderChart from 'src/components/GenderChart.vue';
import RequestsChart from 'src/components/RequestsChart.vue';
import { useRequestStore } from 'src/stores/administrative-requests';
import { useStaffManagementStore } from 'src/stores/staff-management';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { GenderChart, RequestsChart },
  setup() {
    const staffStore = useStaffManagementStore();
    const requestStore = useRequestStore();

    const StaffLength = computed(() => {
      return staffStore.staff.length;
    });

    const requestsLength = computed(() => {
      return requestStore.requests.length;
    });

    return { StaffLength, requestsLength };
  },
});
</script>

<style>
.my-card {
  width: 100%;
  max-width: 250px;
  border-radius: 14px;
}
</style>
