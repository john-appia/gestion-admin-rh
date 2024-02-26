<template>
  <div>
    <apexchart :options="options" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import { useRequestStore } from 'src/stores/administrative-requests';
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'RequestsChart',

  setup() {
    const options = ref({
      chart: {
        width: '100%',
        height: 350,
        type: 'donut',
        id: 'requests-chart',
      },
      labels: ['En cours', 'Validé', 'Rejeté'],
      colors: ['#ffa000', '#21BA45', '#C10015'],
    });

    const requestStore = useRequestStore();

    const series = computed(() => {
      const pending = requestStore.requests.filter(
        (el) => el.status === 'EN COURS'
      );
      const validate = requestStore.requests.filter(
        (el) => el.status === 'VALIDÉ'
      );
      const rejected = requestStore.requests.filter(
        (el) => el.status === 'REJETÉ'
      );

      return [pending.length, validate.length, rejected.length];
    });

    return {
      options,
      series,
    };
  },
});
</script>
