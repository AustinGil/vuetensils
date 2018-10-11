import "./hidden.css";

const NAME = "va11y-hidden";

export default {
  name: NAME,
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
};
