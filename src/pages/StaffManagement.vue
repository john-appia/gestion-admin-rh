<template>
  <q-page padding>
    <!-- content -->
    <section>
      <article class="row justify-between">
        <div>
          <q-chip
            color="brand"
            text-color="white"
            icon="group"
            size="xl"
            label="Gestion du personnel"
          />
        </div>
        <div>
          <q-btn
            @click="isOpenInsertNewStaffMemberModal = true"
            round
            color="brand"
            icon="add"
            size="xl"
          >
            <q-tooltip class="text-bold text-subtitle2 bg-grey-9">
              Ajouter un nouveau collaborateur
            </q-tooltip>
          </q-btn>
        </div>
      </article>
      <article>
        <q-card class="my-card" flat>
          <q-card-section class="bg-brand-light text-dark">
            <div class="text-h4">{{ staffManagement.staff.length }}</div>
            <div class="text-subtitle1">Collaborateurs</div>
          </q-card-section>
        </q-card>
      </article>
    </section>
    <section class="q-mt-xl">
      <q-table
        title=""
        :rows="staffManagement.staff"
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
                <img :src="props.row.photo ? props.row.photo : defaultImage" />
              </q-avatar>
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="job" :props="props">
              {{ props.row.job }}
            </q-td>
            <q-td key="contrat" :props="props">
              {{ props.row.contrat }}
            </q-td>
            <q-td key="actions" :props="props">
              <div>
                <q-btn
                  @click="openStaffMemberCard(props.row)"
                  round
                  flat
                  color="dark"
                  icon="visibility"
                >
                  <q-tooltip class="text-bold text-subtitle2 bg-grey-9">
                    voir le profile
                  </q-tooltip>
                </q-btn>
                <q-btn disable round flat color="dark" icon="edit">
                  <q-tooltip class="text-bold text-subtitle2 bg-grey-9">
                    Modifier le profile
                  </q-tooltip>
                </q-btn>
                <q-btn disable round flat color="negative" icon="archive">
                  <q-tooltip class="text-bold text-subtitle2 bg-grey-9">
                    Archiver le collaborateur
                  </q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </section>

    <!-- INSERT NEW STAFF MEMBER MODAL -->
    <InsertNewStaffMember
      :is-open-modal="isOpenInsertNewStaffMemberModal"
      @close-modal="() => (isOpenInsertNewStaffMemberModal = false)"
    ></InsertNewStaffMember>

    <!-- SEE STAFF MEMBER PROFILE -->
    <StaffMemberCard
      :is-open-modal="isOpenStaffMemberCardModal"
      :staff-member="staffMember"
      @close-modal="() => (isOpenStaffMemberCardModal = false)"
    ></StaffMemberCard>
  </q-page>
</template>

<script lang="ts">
import InsertNewStaffMember from 'src/components/InsertNewStaffMember.vue';
import StaffMemberCard from 'src/components/StaffMemberCard.vue';
import { Staff } from 'src/components/models';
import { useStaffManagementStore } from 'src/stores/staff-management';
import { Ref, defineComponent, ref } from 'vue';

const columns = [
  { name: 'photo', align: 'center', label: 'Photo', field: 'photo' },
  {
    name: 'name',
    align: 'left',
    label: 'Nom & prénoms',
    field: 'name',
    sortable: true,
  },
  { name: 'job', align: 'left', label: 'Poste', field: 'job', sortable: true },
  {
    name: 'contrat',
    align: 'left',
    label: 'Contrat',
    field: 'contrat',
    sortable: true,
  },
  { name: 'actions', label: 'actions', field: 'actions' },
];

export default defineComponent({
  name: 'StaffManagement',
  components: { InsertNewStaffMember, StaffMemberCard },

  setup() {
    const filter = ref('');
    const staffMember: Ref<Staff | undefined> = ref(undefined);
    const isOpenInsertNewStaffMemberModal = ref(false);
    const isOpenStaffMemberCardModal = ref(false);
    const defaultImage = ref(
      'https://static.thenounproject.com/png/4035889-200.png'
    );
    const staffManagement = useStaffManagementStore();

    const openStaffMemberCard = (data: Staff) => {
      staffMember.value = data;
      isOpenStaffMemberCardModal.value = true;
    };

    return {
      columns,
      filter,
      isOpenInsertNewStaffMemberModal,
      isOpenStaffMemberCardModal,
      staffManagement,
      defaultImage,
      staffMember,
      openStaffMemberCard,
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
