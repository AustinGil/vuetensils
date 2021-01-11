<template>
  <div>
    <!-- ROUTER LINK -->
    <v-action data-testid="internal" to="/internal-link">
      Internal Link
    </v-action>
    <!-- ANCHOR TAG -->
    <v-action data-testid="external" :data="data">
      External Link
    </v-action>
    <!-- BUTTON -->
    <v-action data-testid="button">
      Button
    </v-action>
  </div>
</template>

<script>
import VAction from '../../../../src/components/VAction/VAction';

export default {
  name: 'VActionStub',
  components: { VAction },
  data() {
    return {
      attrs: {
        href: 'http://example.com/',
      },
    };
  },
};
</script>
