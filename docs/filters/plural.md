# plural

```vue live
<template>
  <div>
    <p>{{ "Item" | plural("Items", 0) }}</p>
    <p>{{ "Dog" | plural("Dogs", 1) }}</p>
    <p>{{ "Goose" | plural("Geese", 3) }}</p>
  </div>
</template>
```
