/**
 * Copies a string of text to the user's clipboard
 * @param {String} content The content within the downloaded file
 */
function copyToClipboard(content) {
  const activeEl = document.activeElement

  const textarea = document.createElement("textarea")
  textarea.style.maxHeight = "0"
  textarea.style.height = "0"
  textarea.style.opacity = "0"
  textarea.value = content
  document.body.appendChild(textarea)
  textarea.select()

  if (richHtml) {
    const listener = e => {
      e.preventDefault()

      if (e.clipboardData) {
        e.clipboardData.setData("text/html", content)
        e.clipboardData.setData("text/plain", content)
      }
    }

    document.addEventListener("copy", listener)
    document.execCommand("copy")
    document.removeEventListener("copy", listener)
  } else {
    document.execCommand("copy")
  }

  document.body.removeChild(textarea)

  activeEl && activeEl.focus()
}

export default {
  bind(el, binding, vnode) {
    binding.handler = () => copyToClipboard(binding.value)

    el.addEventListener("click", binding.handler)
  },
  unbind(el, binding) {
    el.removeEventListener("click", binding.handler)
  },
}
