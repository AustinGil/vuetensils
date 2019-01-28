```vue
<template>
  <vts-img
    src="https://source.unsplash.com/random/900x600"
    width="900"
    height="600"
    background="#ddd"
  />
</template>

<script>
export default {}
</script>

<style>
img {
  max-width: 100%;
  height: auto;
}
</style>
```

Supports alt attributes, srcsets, and placeholder images:

```vue
<template>
  <vts-img
    :src="`https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=1080`"
    width="900"
    height="600"
    alt="Always a good idea to add an alt attribute"
    srcset="https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=320 320w,
      https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=480 480w,
      https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=800 800w"
    sizes="(max-width: 320px) 280px,
      (max-width: 480px) 440px,
      (max-width: 800px) 760px,
      1080px"
    placeholder="https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=10"
  />
</template>

<script>
export default {}
</script>

<style>
img {
  max-width: 100%;
  height: auto;
}
</style>
```
