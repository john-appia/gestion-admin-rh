import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { Staff } from 'src/components/models';

export const useStaffManagementStore = defineStore('staffManagement', {
  state: () => ({
    staff: [
      {
        photo: 'https://randomuser.me/api/portraits/med/men/83.jpg',
        name: 'Malik Patel',
        job: 'Manager',
        contrat: 'CDI',
        status: true,
        gender: 'M',
      },
      {
        photo: 'https://randomuser.me/api/portraits/med/men/55.jpg',
        name: 'Shane Peterson',
        job: 'Directeur commercial',
        contrat: 'CDI',
        status: true,
        gender: 'M',
      },
      {
        photo: 'https://randomuser.me/api/portraits/med/men/20.jpg',
        name: 'Bakhshi Shenoy',
        job: 'Commercial',
        contrat: 'CDD',
        status: true,
        gender: 'M',
      },
      {
        photo: 'https://randomuser.me/api/portraits/med/men/96.jpg',
        name: 'Appia Jaures',
        job: 'Développeur frontend',
        contrat: 'CDI',
        status: true,
        gender: 'M',
      },
      {
        photo: 'https://randomuser.me/api/portraits/med/women/47.jpg',
        name: 'Luana Dias',
        job: 'Développeuse backend',
        contrat: 'STAGE',
        status: true,
        gender: 'F',
      },
      {
        photo: 'https://randomuser.me/api/portraits/women/42.jpg',
        name: 'Ana María',
        job: 'Infographiste',
        contrat: 'STAGE',
        status: true,
        gender: 'F',
      },
      {
        photo: 'https://randomuser.me/api/portraits/men/65.jpg',
        name: 'Clinton Sliva',
        job: 'Tech lead',
        contrat: 'CDI',
        status: true,
        gender: 'M',
      },
      {
        photo: 'https://randomuser.me/api/portraits/women/88.jpg',
        name: 'Brielle gagnon',
        job: "Chef d'agence",
        contrat: 'CDI',
        status: true,
        gender: 'F',
      },
    ] as Staff[],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    create(newMember: Staff) {
      this.staff.unshift(newMember);
      Notify.create({
        message: 'Un nouveau collaborateur a été ajouté avec success',
        type: 'positive',
        position: 'top-right',
      });
    },

    getAll() {
      return this.staff;
    },

    getOne(name: string) {
      this.staff.forEach((el) => {
        if (el.name === name) return el;
      });
    },
  },
});
