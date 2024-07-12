import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { HomepageService } from './homepage.service';

type HomepageState = {
  callState: 'init' | 'loading' | 'loaded' | { error: string };
};

const initialState: HomepageState = {
  callState: 'init',
};

export const HomepageStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withMethods((state) => {
    const homepageService = inject(HomepageService);

    return {
      init: async () => {
        homepageService.init();

        patchState(state, { callState: 'loaded' });
      },
    };
  }),

  withHooks({
    onInit({ init }) {
      init();
    },
  })
);
