<template>
  <q-page padding class="login">
    <!-- content -->
    <q-card class="my-card q-py-md fixed-center shadow-7">
      <q-card-section class="text-center">
        <div class="text-h4 text-bold">
          Crédit Access - Gestion Administrative
        </div>
        <div class="text-subtitle1">Connectez-vous</div>
      </q-card-section>

      <q-card-section>
        <form @submit="signIn()" class="q-gutter-y-lg">
          <q-input
            color="black"
            v-model="form.email"
            type="email"
            label="Email"
          >
            <template v-slot:prepend>
              <q-icon name="mail" color="black" />
            </template>
          </q-input>

          <q-input
            color="black"
            v-model="form.password"
            :type="isPwd ? 'password' : 'text'"
            label="Mot de passe"
          >
            <template v-slot:prepend>
              <q-icon name="key" color="black" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </form>
        <div class="q-mt-lg">
          <q-btn
            class="full-width text-subtitle1"
            color="brand"
            label="connexion"
            :disable="!isValidForm"
            @click="signIn()"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { useUsersStore } from 'src/stores/users';
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'LoginPage',

  setup() {
    const form = ref({
      email: '',
      password: '',
    });
    const isPwd = ref(true);
    const user = useUsersStore();

    const isValidForm = computed(() => {
      return !!(form.value.email.length && form.value.password);
    });

    const signIn = () => {
      user.signIn(form.value);
    };

    return {
      form,
      isPwd,
      isValidForm,
      signIn,
    };
  },
});
</script>

<style scoped>
.my-card {
  width: 400px;
  /* border: 2px solid black; */
  border-radius: 15px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgb(255, 255, 255, 0.3);
}
.login {
  background-image: radial-gradient(
    circle,
    #e4010e,
    #e53927,
    #e4533d,
    #e26952,
    #df7c68,
    #e18b77,
    #e29a87,
    #e2a898,
    #e9b7a7,
    #f1c6b8,
    #f8d6c8,
    #ffe5da
  );
}
</style>
