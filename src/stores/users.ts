import { defineStore } from 'pinia';
import { LocalStorage, Notify } from 'quasar';
import { LoginData, User } from 'src/components/models';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [
      {
        email: 'jorge.roger@creditaccess.ci',
        name: 'jorge roger',
        username: 'jroger',
        password: '12345678#',
        role: 'ADMIN',
        photo: 'https://randomuser.me/api/portraits/men/87.jpg',
      },
      {
        email: 'elias.legrand@creditaccess.ci',
        name: 'elias legrand',
        username: 'elegrand',
        password: '12345678#',
        role: 'USER',
        photo: 'https://randomuser.me/api/portraits/men/58.jpg',
      },
      {
        email: 'john.doe@creditaccess.ci',
        name: 'john doe',
        username: 'jdoe',
        password: '12345678#',
        role: 'USER',
        photo: 'https://randomuser.me/api/portraits/men/59.jpg',
      },
    ] as User[],
    userAuthenticate: LocalStorage.getItem('user') as User | null,
  }),

  getters: {
    userAuthenticateRole(state) {
      return state.userAuthenticate ? state.userAuthenticate.role : null;
    },
  },

  actions: {
    signIn(data: LoginData) {
      const user = this.users.find((el) => el.email === data.email);
      if (user) {
        if (user.password === data.password) {
          LocalStorage.set('user', user);
          this.router.go(0);
          Notify.create({
            message: 'Bienvenue ' + user.username,
            type: 'positive',
            position: 'top-right',
          });
          return;
        }
        LocalStorage.remove('user');
        return Notify.create({
          message: 'Identifiants incorrect',
          type: 'negative',
          position: 'bottom',
        });
      }
      LocalStorage.remove('user');
      return Notify.create({
        message: 'Identifiants incorrect',
        type: 'negative',
        position: 'bottom',
      });
    },

    logout() {
      LocalStorage.remove('user');
      this.router.push({ name: 'login' });
    },
  },
});
