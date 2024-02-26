<template>
  <div>
    <apexchart :options="options" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import { useStaffManagementStore } from 'src/stores/staff-management';
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'GenderChart',

  setup() {
    const options = ref({
      chart: {
        width: 350,
        height: 'auto',
        type: 'pie',
        id: 'gender-chart',
      },
      dataLabels: {
        enable: false,
      },
      labels: ['Homme', 'Femme'],
      colors: ['#2196f3', '#e91e63'],
    });

    const staffStore = useStaffManagementStore();

    const series = computed(() => {
      const men = staffStore.staff.filter((el) => el.gender === 'M');
      const women = staffStore.staff.filter((el) => el.gender === 'F');

      return [men.length, women.length];
    });

    return {
      options,
      series,
    };
  },
});
</script>
