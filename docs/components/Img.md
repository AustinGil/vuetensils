# Img

Drop in replacement for the HTML `<img>` tag which supports lazy-loading. Improves load times by waiting for the image to scroll into view before actually downloading it.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VImg/VImg.vue)

Features:

- Built to behave as close to native `<img>` element as possible.
- Requires `alt` attribute. Sets `role` to `presentation` if empty.
- Provides lazy-loading with more options than native.
- Supports placeholder colors or images.

Note that this site has the following global CSS applied to these examples:

```css
img {
  max-width: 100%;
  height: auto;
}
```

## Default use

```vue live
<template>
  <VImg src="https://source.unsplash.com/random/900x600" alt="some random image from unsplash" />
</template>
```

Pass in the image dimensions to avoid the page jumping when the image loads

```vue live
<template>
  <VImg
    src="https://source.unsplash.com/random/900x550" alt="some random image from unsplash"
    width="900"
    height="550"
  />
</template>
```

## Colored Placeholder

```vue live
<template>
  <VImg
    src="https://source.unsplash.com/random/1000x550" alt="some random image from unsplash"
    width="1000"
    height="550"
    background="#DDD"
  />
</template>
```

## Blurred Thumbnail Placeholder

```vue live
<template>
  <VImg
    src="https://images.unsplash.com/photo-1546094324-7fd2718befe3?w=1080" alt="some random image from unsplash"
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
    src="https://source.unsplash.com/random/900x551" alt="some random image from unsplash"
    width="900"
    height="551"
    background="#DDD"
    transition-duration="1000"
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

This component can accept a `classes` prop to customize the output HTML classes:

```
:classes="{ root: string, placeholder: string, img: string }"
```
