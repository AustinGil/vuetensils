import "./styles.css"

const NAME = "vts-dropdown"

export default {
  name: NAME,

  props: {
    text: {
      type: String,
      default: ""
    },
    position: {
      type: String
    },
    transition: {
      type: String
    }
  },

  data: () => ({
    isHovered: false,
    isFocused: false
  }),

  methods: {
    onClickout(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    }
  },

  mounted() {
    document.addEventListener("click", this.onClickout)
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("click", this.onClickout)
    })
  },

  render(create) {
    const button = create(
      "button",
      {
        attrs: {
          "aria-haspopup": true,
          "aria-expanded": this.isHovered || this.isFocused ? "true" : "false"
        },
        on: {
          click: () => {
            this.isFocused = !this.isFocused
          }
        }
      },
      this.text
    )

    let content = create(false)
    if (this.isHovered || this.isFocused) {
      let contentClass = `${NAME}__content`
      if (!!this.position) {
        contentClass += ` ${NAME}__content--${this.position}`
      }

      content = create(
        "transition",
        {
          props: { name: this.transition, appear: true }
        },
        [create("div", { class: contentClass }, [this.$slots.default])]
      )
    }

    return create(
      "div",
      {
        class: NAME,
        on: {
          mouseover: () => {
            this.isHovered = true
          },
          mouseleave: () => {
            this.isHovered = false
          },
          focusout: event => {
            if (!this.$el.contains(event.relatedTarget)) {
              this.isFocused = false
            }
          }
        }
      },
      [button, content]
    )
  }
}
