# useForm WIP

```vue
<template>
  <form ref="formRef">
    <!-- inputs and stuff -->
    {{ form }}
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useForm } from 'vuetensils/src/composables'

export default defineComponent(() => {
  const fromRef = ref()
  const form = useForm(form);
  
  return {
    formRef,
    form,
  };
});
</script>
```