export default {
  methods: {
    enter(element) {
      element.style.position = "absolute"
      element.style.height = "auto"

      const { height } = getComputedStyle(element)

      element.style.position = null
      element.style.height = 0

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height

      // Trigger the animation.
      // We use `setTimeout` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter(element) {
      element.style.height = "auto"
    },
    leave(element) {
      const { height } = getComputedStyle(element)

      element.style.height = height

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height

      setTimeout(() => {
        element.style.height = 0
      })
    },
  },
}
