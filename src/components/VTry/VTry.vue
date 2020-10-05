<script>
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
    const { error, $scopedSlots } = this;

    if (error && $scopedSlots.catch) {
      return $scopedSlots.catch(error);
    }

    return $scopedSlots.default(error);
  },
};
</script>
