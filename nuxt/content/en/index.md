---
title: Vuetensils
# description: Empower your NuxtJS application with this awesome module.
position: 1
category: Introduction
# fullscreen: true
---

<CodePreview :code="`<template>
      <VForm>
        <template #default='form'>
          <input name='one'>
          <input v-if='on' required name='two'>
          <button @click='on = !on' type='button'>Toggle</button>
          {{ form }}
        </template>
      </VForm>
    </template>
    <script>
    export default {
      data: () => ({
        on: false
      })
    }
    </script>`"></CodePreview>

<img src="/logo.svg" alt="Vuetensils" width="225" height="300" class="block mx-auto">

A "naked" component library for Vue.js focused on being:

- Accessible
- Semantic
- Light weight
- Extensible

Links:

- [Docs](https://vuetensils.stegosource.com/)
- [NPM](https://www.npmjs.com/package/vuetensils)
- [GitHub](https://github.com/AustinGil/vuetensils)
- [Updates](https://austingil.com/newsletter)
