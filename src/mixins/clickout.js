export default {
  mounted() {
    if (typeof document !== "undefined") {
      document.documentElement.addEventListener("click", this._clickOutListener);
      this.$once("hook:beforeDestroy", () => {
        document.removeEventListener("click", this._clickOutListener);
      });
    }
  },
  methods: {
    _clickOutListener(e) {
      if (this.$el === e.target || this.$el.contains(e.target)) {
        return;
      }
      this.onClickOut && this.onClickOut();
    }
  }
};
