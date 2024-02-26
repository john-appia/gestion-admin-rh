<template>
  <q-dialog v-model="props.isOpenModal" persistent>
    <q-card class="profile-card">
      <section>
        <article class="cover-color"></article>
        <article class="img-card">
          <q-avatar size="150px">
            <img
              :src="
                props.staffMember?.photo
                  ? props.staffMember?.photo
                  : 'https://static.thenounproject.com/png/4035889-200.png'
              "
            />
          </q-avatar>
        </article>
        <article class="info-section">
          <p class="text-h4">{{ props.staffMember?.name }}</p>
          <p class="text-subtitle1">{{ props.staffMember?.job }}</p>
          <small>{{ props.staffMember?.contrat }}</small>

          <q-separator inset color="brand" size="2px" class="q-my-lg" />

          <div class="q-gutter-md">
            <q-chip clickable icon="picture_as_pdf">
              extrait de naissance
            </q-chip>

            <q-chip clickable icon="picture_as_pdf"> CNI </q-chip>

            <q-chip clickable icon="picture_as_pdf">
              Extrait d'acte de mariage
            </q-chip>
          </div>
        </article>
      </section>
      <q-card-actions align="right" class="q-px-lg">
        <q-btn
          @click="closeModal()"
          flat
          label="Fermer"
          color="brand"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { Staff } from './models';
export default defineComponent({
  name: 'StaffMemberCard',
  props: {
    isOpenModal: {
      type: Boolean,
      default: false,
      required: true,
    },
    staffMember: {
      type: Object as PropType<Staff | undefined>,
      required: true,
    },
  },
  emits: ['closeModal'],

  setup(props, { emit }) {
    const closeModal = () => {
      emit('closeModal');
    };

    return {
      props,
      closeModal,
    };
  },
});
</script>

<style scoped>
.my-card {
  width: 100px;
  height: 100px;
}
.cover-color {
  width: 100%;
  height: 250px;
  background-image: linear-gradient(
    to left bottom,
    #e4010e,
    #e40022,
    #e20031,
    #e0003e,
    #dc004a,
    #d80054,
    #d2005d,
    #cc0866,
    #c4136f,
    #ba1c77,
    #af257f,
    #a42c85
  );
  border-radius: 40px;
}
.profile-card {
  border-radius: 40px;
  padding-bottom: 20px;
  width: 500px;
  /* max-width: ; */
}
.img-card {
  text-align: center;
  margin-top: -80px;
}
.info-section {
  text-align: center;
  margin-top: 20px;
  padding: 0px 52px;
  p {
    margin-bottom: 3px;
  }
}
</style>
