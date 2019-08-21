### Use

```html
<script>
  import { VInput } from "vuetensils"
  export default VInput
</script>

<style>
  /** Your custom styles here */
</style>
```

### Styled Example

```vue
<template>
  <div class="styled">
    <form @submit.prevent>
      <VInput v-model="name" label="Your Name:" />
    </form>
    <p v-if="name">Hello {{ name }}!</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: ""
  })
}
</script>

<style>
.styled .vts-input__text {
  font-size: 14px;
}

.vts-input__input {
  display: block;
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>
```

### Input Types

Supports all HTML [input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Form_%3Cinput%3E_types) except the `file` type. Additionally accepts `textarea` and `select`.

```vue
<template>
  <VInput label="text:" />
</template>

<script>
export default {}
</script>
```

```vue
<template>
  <VInput label="email:" type="email" />
</template>

<script>
export default {}
</script>
```

```vue
<template>
  <VInput label="textarea:" type="textarea" />
</template>

<script>
export default {}
</script>
```

```vue
<template>
  <VInput label="checkbox" type="checkbox" />
</template>

<script>
export default {}
</script>
```

```vue
<template>
  <VInput type="radio" :options="['option 1', 'option 2', 'option 3', 'option 4']" />
</template>

<script>
export default {}
</script>
```

```vue
<template>
  <VInput
    label="select"
    type="select"
    :options="['option 1', 'option 2', 'option 3', 'option 4']"
  />
</template>

<script>
export default {}
</script>
```

### Description

If you want to add a description to your input, the best way to do that is to include an `aria-describedby` attribute. With this component, you can simply use the description slot.

```vue
<template>
  <VInput label="email" type="email">
    <template #slot:description>
      Please provide your email.
    </template>
  </VInput>
</template>

<script>
export default {}
</script>
```

### Validation

```vue
<template>
  <VInput
    v-model="value"
    label="test"
    required
    min="1"
    max="2"
    minlength="2"
    maxlength="20"
    pattern="[0-9]{4}"
  >
    <template v-slot:description="invalid">
      Here's a description of the input, and I also have access to the validation state object.
      <pre>{{ invalid }}</pre>
      Which I can transform into an error list:
      <ul>
        <li
          v-for="invalid in Object.keys(invalid).filter(
            key => invalid[key] && key !== 'anyInvalid'
          )"
        >
          {{ errorText(invalid) }}
        </li>
      </ul>
    </template>
  </VInput>
</template>

<script>
export default {
  data: () => ({
    value: ""
  }),

  methods: {
    errorText(error) {
      const map = {
        required: "This field is required",
        minLength: "Must be at least 2 characters",
        pattern: "Must be a 4 digit number"
      }
      return map[error]
    }
  }
}
</script>
```
