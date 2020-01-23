import clone from 'clone';
import { ReplicantBrowser } from 'nodecg/types/browser';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { Foo } from 'schemas';

Vue.use(Vuex);

// Replicants and their types
const reps: {
  foo: ReplicantBrowser<Foo>;
  [k: string]: ReplicantBrowser<unknown>;
} = {
  foo: nodecg.Replicant('foo'),
};

const defaultFoo: Foo = { bar: "" };

// Types for mutations below
export type ExampleMutation = (arg: any) => void;

const store = new Vuex.Store({
  state: {
    foo: clone(defaultFoo),
  },
  mutations: {
    setState(state, { name, val }): void {
      Vue.set(state, name, val);
    },
    /* Mutations to replicants start */
    exampleMutation(arg): void {
      // You may need to do checks like these, depending on mutation content.
      if (typeof reps.replicantName.value !== 'undefined') {
        reps.replicantName.value = clone(arg);
      }
    },
    /* Mutations to replicants end */
  },
});

Object.keys(reps).forEach((key) => {
  reps[key].on('change', (val) => {
    store.commit('setState', { name: key, val: clone(val) });
  });
});

export default async function (): Promise<Store<{ foo: Foo }>> {
  return NodeCG.waitForReplicants(
    ...Object.keys(reps).map((key) => reps[key]),
  ).then(() => store);
}
