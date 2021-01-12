<template>
  <div>
    <!-- ROUTER LINK -->
    <v-action data-testid="internal" to="/internal-link">
      Internal Link
    </v-action>
    <!-- ANCHOR TAG -->
    <!-- TEST WONT PASS -->
    <v-action data-testid="external-data" :data="data">
      External Link
    </v-action>
    <!-- TEST WONT PASS -->
    <v-action data-testid="external-attrs" :attrs="attrs">
      External Link
    </v-action>
    <!-- TEST WILL PASS -->
    <v-action data-testid="external-href" :href="attrs.href">
      External Link
    </v-action>
    <!-- BUTTON -->
    <v-action data-testid="button">
      Button
    </v-action>
  </div>
</template>

<script>
// TURNS OFF ERROR IN CONSOLE for UNIT TEST
import { RouterLinkStub } from '@vue/test-utils';
const RouterLink = RouterLinkStub;
import VAction from '../../../../src/components/VAction/VAction.vue';

export default {
  name: 'VActionStub',
  components: { 
    VAction, 
    // eslint-disable-next-line vue/no-unused-components
    RouterLink
  },
  data() {
    return {
      attrs: {
        href: 'http://example.com/',
      },
    };
  },
};
</script>
