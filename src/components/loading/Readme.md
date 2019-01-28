```vue
<template>
  <div style="max-width: 200px;">
    <label>
      Loading Type:
      <select v-model="loadingType">
        <option
          v-for="type in loadingTypes"
          :key="type"
          :value="type"
        >{{ type }}</option>
      </select>
    </label>
    <br />
    <label>
      Fill Color:
      <select v-model="fill">
        <option
          v-for="color in colors"
          :key="color"
          :value="color"
        >{{ color }}</option>
      </select>
    </label>
    <br />
    <label>
      Stroke Color:
      <select v-model="stroke">
        <option
          v-for="color in colors"
          :key="color"
          :value="color"
        >{{ color }}</option>
      </select>
    </label>
    <vts-loading
      :name="loadingType"
      :fill="fill"
      :stroke="stroke"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    loadingType: "",
    loadingTypes: ["dual-ring", "bars", "ring", "ripple"],
    stroke: "currentColor",
    fill: "none",
    colors: ["none", "currentColor", "red", "#bada55", "rgba(0, 0, 0, 0.5)"]
  })
}
</script>
```
