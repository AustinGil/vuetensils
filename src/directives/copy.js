/**
 * Copies a string of text to the user's clipboard
 * @param {String} content The content within the downloaded file
 * @param {Boolean} [richHtml=false]
 */
function copyToClipboard(content, richHtml = false) {
  if (!richHtml && navigator.clipboard) {
    return navigator.clipboard.writeText(content)
  }

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

  activeEl && activeEl.focus()

  document.body.removeChild(textarea)
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
