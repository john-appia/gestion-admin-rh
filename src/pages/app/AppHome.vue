<template>
  <q-page padding>
    <section class="row wrap q-col-gutter-lg">
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
          <p class="text-subtitle1 text-bold">Détails des demandes</p>
          <user-requests-chart></user-requests-chart>
        </div>
      </article>
    </section>
  </q-page>
</template>

<script lang="ts">
import UserRequestsChart from 'src/components/UserRequestsChart.vue';
import { useRequestStore } from 'src/stores/administrative-requests';
import { useUsersStore } from 'src/stores/users';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'AppHome',
  components: { UserRequestsChart },
  setup() {
    const requestStore = useRequestStore();
    const userStore = useUsersStore();

    const requestsLength = computed(() => {
      let length = 0;
      if (userStore.userAuthenticate) {
        length = requestStore.requests.filter(
          (el) => el.user.email === userStore.userAuthenticate?.email
        ).length;
      }
      return length;
    });

    return { requestsLength };
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
