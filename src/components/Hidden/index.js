import "./styles.css";

const NAME = "vts-hidden";

export default {
  name: NAME,
  functional: true,
  render: function (create, context) {
    return create(
      "span",
      {
        class: NAME
      },
      [context.children]
    );
  }
};
