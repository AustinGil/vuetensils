# VForm

Form wrapper that provides better security practices and automatic input validation based on [HTML5 form validation API](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).

**Important**: Every input should have a [`name`](https://www.w3schools.com/TAGS/att_input_name.asp). This is important for HTML forms, in general, but also helps VForm keep track. If none is provided, it will still work though.

This component is under active development. Consider copy/pasting from the source to avoid any breaking changes.

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/components/VForm/VForm.vue)

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VForm } from "vuetensils"

Vue.component("VForm", VForm)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VForm } from "vuetensils"

export default {
  components: {
    VForm,
  },
  // ...
}
</script>
```

## Styled Example

```vue live
<template>
  <VForm class="styled" @submit.prevent>
    <template #default="form">
      <label>
        Name:
        <small>(required)</small>
        <input name="name" required />
      </label>

      <label>
        Email:
        <small>(required, type="email")</small>
        <input name="email" type="email" required />
      </label>

      <label>
        Password:
        <small>(required, minlength="6")</small>
        <input name="password" type="password" required minlength="6" />
      </label>

      <button type="submit" :disabled="form.invalid">Submit</button>
    </template>
  </VForm>
</template>

<style>
.vts-form input {
  width: 100%;
  margin-bottom: 1rem;
}

.vts-form input,
.vts-form button {
  border-radius: 4px;
  padding: 0.5rem;
}

.vts-form input {
  border: 1px solid darkgray;
}

.vts-form button {
  border: 0;
}

.vts-form:not(.vts-form--invalid) button {
  color: #fff;
  background: seagreen;
}
</style>
```

## Form Status

The form provides the following status:

- `invalid`: Returns `true` if any contained input is invalid based on its [HTML5 validation attributes](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).
- `dirty`: Returns `true` if any contained input has triggered its `blur` event.
- `error`: Returns `true` if the form is `invalid` and `dirty`.

```vue live
<template>
  <VForm @submit.prevent>
    <template #default="form">
      <label>
        Name:
        <input name="name" required />
      </label>

      <button type="submit" :disabled="form.invalid">Submit</button>

      <pre>{{ form }}</pre>
    </template>
  </VForm>
</template>
```

## Clearing Inputs

Sometimes we need to clear our forms. HTML provides us with a [`reset input`](https://www.w3schools.com/tags/att_input_type_reset.asp) and a reset button, but those only clear the form if the form was originally cleared to begin with.

Fortunately, VForm provides a `clear()` method.

```vue live
<template>
  <VForm @submit.prevent>
    <template #default="form">
      <label>
        Text Input:
        <input name="text" value="inital value" />
      </label>
      <br />

      <label>
        Textarea:
        <textarea>inital value</textarea>
      </label>
      <br />

      <button type="reset">Reset</button>

      <button @click="form.clear" type="button">Clear</button>
    </template>
  </VForm>
</template>
```

## Classes

- `vts-form`: The root form class.
- `vts-form--invalid`: Added to the form whenever the status `invalid` is `true`.
- `vts-form--dirty`: Added to the form whenever the status `dirty` is `true`.
- `vts-form--error`: Added to the form whenever the status `error` is `true`.

## Security

By default, the form will set the [`method` attribute](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data) to `POST`. This is SLIGHTLY more secure to avoid adding sensitive data to a query string.

Note that this security benefit is only applicable for server-side rendering AND if JavaScript fails.

To overright the method, simply provide `method="GET"` to the VForm component.
