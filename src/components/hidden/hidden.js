import "./hidden.css";

const NAME = "va11y-hidden";

const Hidden = {
  install(Vue, options) {
    Vue.component(NAME, {
      functional: true,
      render: function(create, context) {
        return create(
          "span",
          {
            class: NAME
          },
          [context.children]
        );
      }
    });
  }
};

export default Hidden;
