# Img

Drop in replacement for the HTML `<img>` tag which supports lazy-loading. Improves load times by waiting for the image to scroll into view before actually downloading it.

Features:

- Built to behave as close to native `<img>` element as possible.
- Provides lazy-loading with more options than native.
- Supports placeholder colors or images.

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/components/VImg/VImg.vue)

Note that this site has the following global CSS which is applied to examples:

```css
img {
  max-width: 100%;
  height: auto;
}
```

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VImg } from "vuetensils"

Vue.component("VImg", VImg)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VImg } from "vuetensils"

export default {
  components: {
    VImg,
  },
  // ...
}
</script>
```

For IE 11 support, you may want to add the following polyfill:

`<script src='https://cdn.polyfill.io/v2/polyfill.js?features=IntersectionObserver'></script>`

## Default use

```vue live
<template>
  <VImg src="https://source.unsplash.com/random/900x600" />
</template>
```

Pass in the image dimensions to avoid the page jumping when the image loads

```vue live
<template>
  <VImg
    src="https://source.unsplash.com/random/900x550"
    width="900"
    height="550"
  />
</template>
```

## Colored Placeholder

```vue live
<template>
  <VImg
    src="https://source.unsplash.com/random/1000x550"
    width="1000"
    height="550"
    background="#ddd"
  />
</template>
```

## Blurred Thumbnail Placeholder

```vue live
<template>
  <VImg
    src="https://images.unsplash.com/photo-1546094324-7fd2718befe3?w=1080"
    width="1080"
    height="864"
    placeholder="https://images.unsplash.com/photo-1546094324-7fd2718befe3?w=30"
  />
</template>
```

## Custom Transition Duration

If you don't like the default transition duration (300ms), you can pass a custom duration in miliseconds.

```vue live
<template>
  <VImg
    src="https://source.unsplash.com/random/900x551"
    width="900"
    height="551"
    background="#ddd"
    transitionDuration="1000"
  />
</template>
```

## Misc

Don't forget all the other best practices such as `srcset` attribute and `alt` text

```vue live
<template>
  <VImg
    :src="`https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=1080`"
    width="900"
    height="600"
    placeholder="https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=30"
    srcset="https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=320 320w,
        https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=480 480w,
        https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=800 800w"
    sizes="(max-width: 320px) 280px,
        (max-width: 480px) 440px,
        (max-width: 800px) 760px,
        1080px"
    alt="Beautiful forest"
  />
</template>
```

## Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', placeholder: 'placeholder-class', img: 'img-class' }"
```
