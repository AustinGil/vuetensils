# VInput

Input component that simplifies accessibility and validation.

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/components/VInput/VInput.vue)

**Features:**

- Enforces including labels.
- Build in validation using [HTML5 form validation API](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).
- Automatic [aria-invalid](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute) attribute.
- Automatic [aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute) attribute.

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VInput } from "vuetensils"

Vue.component("VInput", VInput)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VInput } from "vuetensils"

export default {
  components: {
    VInput,
  },
  // ...
}
</script>
```

## Styled Example

```vue live
<template>
  <form @submit.prevent class="styled">
    <VInput v-model="name" label="Your Name:" />
  </form>
</template>

<script>
export default {
  data: () => ({
    name: "",
  }),
}
</script>
```

```css
.vts-input__text {
  font-size: 14px;
}

.vts-input__input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px;
}
```

## Input Types

Supports all HTML [input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Form_%3Cinput%3E_types) except the `file` type. Additionally accepts `textarea` and `select`.

```vue live
<template>
  <VInput label="text:" name="text" />
</template>
```

```vue live
<template>
  <VInput label="email:" name="email" type="email" />
</template>
```

```vue live
<template>
  <VInput label="textarea:" name="textarea" type="textarea" />
</template>
```

```vue live
<template>
  <VInput label="checkbox" name="checkbox" type="checkbox" />
</template>
```

```vue live
<template>
  <VInput
    type="radio"
    label="radio"
    name="radio"
    :options="['option 1', 'option 2', 'option 3', 'option 4']"
  />
</template>
```

```vue live
<template>
  <VInput
    label="select"
    name="select"
    type="select"
    :options="['option 1', 'option 2', 'option 3', 'option 4']"
  />
</template>
```

```vue live
<template>
  <form @submit.prevent class="styled">
    <VInput
      label="select (multiple)"
      name="select-multi"
      v-model="selected"
      type="select"
      :options="['option 1', 'option 2', 'option 3', 'option 4']"
      multiple
    />
    <pre>{{ selected }}</pre>
  </form>
</template>

<script>
export default {
  data: () => ({
    selected: ["option 2"],
  }),
}
</script>
```

## Hidden Label

Sometimes you may want to hide your label and only show the input. Excluding the label causes an accessibility issue, but you can [visually hide the label text with CSS](https://a11yproject.com/posts/how-to-hide-content/). Note that you will need to add the styles to your project.

```vue live
<template>
  <VInput
    label="Input Label"
    name="features"
    :classes="{ text: 'visually-hidden' }"
  />
</template>

<style>
.visually-hidden {
  position: absolute !important;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
</style>
```

## Description

If you want to add a description to your input, the best practice is to include an `aria-describedby` attribute in combination with an ID on the description element. Fortunately, with this component you can simply use the description slot.

```vue live
<template>
  <VInput label="Features:" name="features">
    <template v-slot:description>
      Are there any other features you would like to see?
    </template>
  </VInput>
</template>
```

## Validation

This component supports [HTML5 input validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation). The input's `invalid` status is provided to the description slot.

Note that client-side validation is never a substitute for server-side validation.

```vue live
<template>
  <VForm>
    <template #default="form">
      <pre>{{ form }}</pre>

      <VInput
        v-model="input"
        label="Username"
        name="username"
        required
        minlength="6"
        class="mb-3"
      >
        <template #description="input">
          <pre>{{ input }}</pre>
        </template>
      </VInput>

      <label>
        Second
        <input name="second" required minlength="6" />
      </label>

      <VInput value="start?" name="third" label="yo" required />
    </template>
  </VForm>
</template>

<script>
export default {
  data: () => ({
    input: "init",
  }),
}
</script>
```

## Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', fieldset: 'fieldset-class', label: 'label-class', text: 'text-class', input: 'input-class', description: 'description-class' }"
```
