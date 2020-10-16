### Styled Example

```vue
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
};
</script>

<style>
.vts-input__text {
  font-size: 14px;
}

.vts-input__input {
  display: block;
  width: 100%;
  padding: 5px;
  border: 1px solid #CCC;
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
export default {};
</script>
```

```vue
<template>
  <VInput label="email:" type="email" />
</template>

<script>
export default {};
</script>
```

```vue
<template>
  <VInput label="textarea:" type="textarea" />
</template>

<script>
export default {};
</script>
```

```vue
<template>
  <VInput label="checkbox" type="checkbox" />
</template>

<script>
export default {};
</script>
```

```vue
<template>
  <VInput
    type="radio"
    label="radio"
    :options="['option 1', 'option 2', 'option 3', 'option 4']"
  />
</template>

<script>
export default {};
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
export default {};
</script>
```

### Description

If you want to add a description to your input, the best practice is to include an `aria-describedby` attribute in combination with an ID on the description element. Fortunately, with this component you can simply use the description slot.

```vue
<template>
  <VInput label="Features:">
    <template v-slot:description>
      Are there any other features you would like to see?
    </template>
  </VInput>
</template>

<script>
export default {};
</script>
```

### Validation

This component supports [HTML5 input validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation). The input's `invalid` status is provided to the description slot.

Note that client-side validation is never a substitute for server-side validation.

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
    <template v-slot:description="state">
      <ul v-if="state.dirty && state.anyInvalid">
        <template v-for="(isInvalid, key) in state.invalid">
          <li v-if="key === 'required' && isInvalid" :key="key">
            This field is required
          </li>
          <li v-if="key === 'minLength' && isInvalid" :key="key">
            Must be at least 2 characters
          </li>
          <li v-if="key === 'pattern' && isInvalid" :key="key">
            Must be a 4 digit number
          </li>
        </template>
      </ul>
      <br />
      <p>Validation state:</p>
      <pre>{{ state }}</pre>
    </template>
  </VInput>
</template>

<script>
export default {
  data: () => ({
    value: "",
  }),
};
</script>
```

### Custom Classes

This component can accept a `classes` prop to customize the output HTML classes:

```
:classes="{ root: 'root-class', fieldset: 'fieldset-class', label: 'label-class', text: 'text-class', input: 'input-class', description: 'description-class' }"
```
