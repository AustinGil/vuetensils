import "./hidden.css";

const NAME = "va11y-hidden";

const Hidden = {
  install(Vue, options) {
    Vue.component(NAME, {
      render: function(create) {
        return create(
          "span",
          {
            class: NAME
          },
          [this.$slots.default]
        );
      }
    });
  }
};

export default Hidden;
