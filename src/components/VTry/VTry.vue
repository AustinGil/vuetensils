<script>
import { safeSlot } from '../../utils';

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

  render(h) {
    const { error, $scopedSlots } = this;

    if (error && $scopedSlots.catch) {
      return safeSlot(h, $scopedSlots.catch(error));
    }

    return safeSlot(h, $scopedSlots.default(error));
  },
};
</script>
