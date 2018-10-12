import Hidden from "../hidden/hidden";
import "../../styles/shared.css";
import "./alert.css";

const NAME = "va11y-alert";

export default {
  name: NAME,
  components: {
    Hidden
  },

  props: {
    visible: {
      type: [Boolean, Number],
      default: false
    },
    dismissible: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: "visible",
    event: "change"
  },

  data: () => ({
    timerId: null
  }),

  methods: {
    show() {
      this.$emit("show");
      this.$emit("change", true);
    },
    hide() {
      this.$emit("hide");
      if (typeof this.visible === "number") {
        this.$emit("timer-update", 0);
        this.$emit("change", 0);
      } else {
        this.$emit("change", false);
      }
      this.clearTimer();
    },
    toggle() {
      this.$emit("toggle", this.visible);
      this.$emit("change", this.visible);
    },
    clearTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    }
  },

  destroyed() {
    this.clearTimer();
  },

  render: function(create) {
    if (!this.visible) return create(false);

    let closeButton = create(false);

    if (this.dismissible) {
      let closeContent = this.$slots["close"];
      if (!closeContent) {
        closeContent = create(
          "span",
          {
            attrs: { "aria-label": "Close" }
          },
          "x"
        );
      }

      closeButton = create(
        "button",
        {
          class: `${NAME}__close va11y-btn--plain`,
          on: {
            click: e => {
              this.hide(e);
            }
          }
        },
        [closeContent]
      );
    }

    return create(
      "div",
      {
        class: [`${NAME}`, this.dismissible ? `${NAME}--dismissible` : ""]
      },
      [this.$slots.default, closeButton]
    );
  }
};
