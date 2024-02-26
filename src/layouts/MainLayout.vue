<template>
  <q-layout view="hHh lpR lff">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Crédit Access | Administration RH </q-toolbar-title>

        <q-avatar class="cursor-pointer">
          <img
            :src="
              userStore.userAuthenticate
                ? userStore.userAuthenticate.photo
                : 'https://static.thenounproject.com/png/4035889-200.png'
            "
          />
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item class="text-bold text-subtitle2">
                <q-item-section>{{
                  userStore.userAuthenticate.username
                }}</q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item clickable v-close-popup>
                <q-item-section>Mon profile</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="userStore.logout()">
                <q-item-section>Déconnexion</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="350"
      :breakpoint="500"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item
            clickable
            active-class="text-brand"
            v-ripple
            :to="{ name: 'home' }"
            exact=""
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item
            clickable
            active-class="text-brand"
            v-ripple
            :to="{ name: 'staff' }"
            exact=""
          >
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>

            <q-item-section> Gestion du personnel </q-item-section>
          </q-item>

          <q-item
            clickable
            active-class="text-brand"
            v-ripple
            :to="{ name: 'requests' }"
            exact=""
          >
            <q-item-section avatar>
              <q-icon name="task" />
            </q-item-section>

            <q-item-section> Gestion des demandes </q-item-section>
          </q-item>

          <q-item
            clickable
            active-class="text-brand"
            v-ripple
            :to="{ name: 'expenseReport' }"
            disable
            exact
          >
            <q-item-section avatar>
              <q-icon name="credit_score" />
            </q-item-section>

            <q-item-section>
              <p class="" style="text-wrap: wrap">
                Gestion des notes de frais de mission
                <q-badge rounded align="middle" color="brand" label="Bientôt" />
              </p>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            active-class="text-brand"
            v-ripple
            to="#"
            disable
            exact
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>
              <p>
                Paramètres
                <q-badge rounded align="middle" color="brand" label="Bientôt" />
              </p>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-transparent text-black">
      <p class="text-center">2024 - John Appia</p>
    </q-footer>
  </q-layout>
</template>

<script>
import { useUsersStore } from 'src/stores/users';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const leftDrawerOpen = ref(true);
    const miniState = ref(true);
    const userStore = useUsersStore();
    const router = useRouter();

    onBeforeMount(() => {
      if (userStore.userAuthenticate?.role !== 'ADMIN') {
        router.replace({ name: 'userHome' });
      }
    });

    return {
      leftDrawerOpen,
      miniState,
      userStore,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
