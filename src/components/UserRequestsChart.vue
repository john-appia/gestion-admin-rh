<template>
  <div>
    <apexchart :options="options" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import { useRequestStore } from 'src/stores/administrative-requests';
import { useUsersStore } from 'src/stores/users';
import { computed, defineComponent, ref } from 'vue';
import { AdministrativeRequest } from './models';
export default defineComponent({
  name: 'UserRequestsChart',

  setup() {
    const options = ref({
      chart: {
        width: '100%',
        height: 350,
        type: 'donut',
        id: 'user-requests-chart',
      },
      labels: ['En cours', 'Validé', 'Rejeté'],
      colors: ['#ffa000', '#21BA45', '#C10015'],
    });

    const requestStore = useRequestStore();
    const userStore = useUsersStore();

    const series = computed(() => {
      let data: AdministrativeRequest[] = [];
      if (userStore.userAuthenticate) {
        data = requestStore.requests.filter(
          (el) => el.user.email === userStore.userAuthenticate?.email
        );
      }
      const pending = data.filter((el) => el.status === 'EN COURS');
      const validate = data.filter((el) => el.status === 'VALIDÉ');
      const rejected = data.filter((el) => el.status === 'REJETÉ');

      return [pending.length, validate.length, rejected.length];
    });

    return {
      options,
      series,
    };
  },
});
</script>
