<script>
import svgs from "../data/svgs"

const NAME = "vts-loading"

export default {
  name: NAME,
  /**
   * TODO
   * size: width / height
   * stroke: color / width / dasharray
   * animation: timing
   */
  props: {
    name: {
      type: String,
      default: "ring"
    },
    width: {
      type: String | Number
    },
    height: {
      type: String | Number
    },
    fill: {
      type: String,
      default: "none"
    },
    stroke: {
      type: String,
      default: "currentColor"
    }
  },
  render: function(create, context) {
    return create("svg", {
      class: NAME,
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 100 100",
        fill: this.fill,
        stroke: this.stroke,
        width: this.width,
        height: this.height
      },
      domProps: {
        innerHTML: svgs[this.name || "ring"]
      }
    })
  }
}
</script>
