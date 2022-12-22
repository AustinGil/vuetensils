<script>
import { isVue3 } from 'vue-demi';

export default {
  name: 'VTry',

  props: {
    propagate: Boolean,
  },

  data: () => ({
    error: null,
  }),

  errorCaptured(error) {
    this.error = error;

    this.$emit('catch', error);

    return this.propagate;
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
