<script>
import { version } from 'vue';

const isVue3 = version && version.startsWith('3');

export default {
  name: 'VTry',

  props: {
    stopPropagation: Boolean,
  },

  data: () => ({
    error: null,
    // vm: null,
    // info: null,
  }),

  errorCaptured(error /* vm, info */) {
    this.error = error;
    // this.vm = vm
    // this.info = info

    this.$emit('catch', error);

    return !this.stopPropagation;
  },

  render() {
    const { error, $slots } = this;
    let slots = $slots;

    if (!isVue3) {
      slots = this.$scopedSlots;
    }
    if (error && slots.catch) {
      return slots.catch(error);
    }

    return slots.default(error);
  },
};
</script>
