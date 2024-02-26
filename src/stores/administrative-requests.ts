import { defineStore } from 'pinia';
import { LocalStorage, Notify } from 'quasar';
import {
  AdministrativeRequest,
  AdministrativeRequestStatus,
} from 'src/components/models';

export const useRequestStore = defineStore('request', {
  state: () => ({
    requests: (LocalStorage.getItem('requests') ||
      []) as AdministrativeRequest[],
  }),

  getters: {
    // allRequests(state) {
    //   return LocalStorage.getItem('requests') as AdministrativeRequest[];
    // },
  },

  actions: {
    saveRequests() {
      LocalStorage.set('requests', this.requests);
    },

    create(data: AdministrativeRequest) {
      this.requests.unshift(data);
      this.saveRequests();
      Notify.create({
        message: 'Votre demande à été envoyé',
        type: 'positive',
        position: 'top-right',
      });
    },

    updateStatus(requestID: number, status: AdministrativeRequestStatus) {
      const request = this.requests.find((el) => el.id === requestID);
      if (request) {
        console.log(this.requests.indexOf(request));
        console.log(this.requests[this.requests.indexOf(request)]);

        this.requests[this.requests.indexOf(request)] = {
          ...request,
          status: status,
        };
        this.saveRequests();
      }
      Notify.create({
        message: 'Le status de la demande à été mis à jour',
        type: 'positive',
        position: 'top-right',
      });
    },
  },
});
