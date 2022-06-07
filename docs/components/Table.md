# Table

**WIP: This component is still in active development. Give it a go, and please consider logging issues or feature requests on GitHub.**

Takes a list of objects and a list of table headers and creates an HTML table with sorting and pagination built in.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VTable/VTable.vue)

Features:

- Manages accessibility attributes for `tabindex`, `role`, `aria-labelledby`, `aria-sort`.
- Supports table sorting.
- Supports pagination.

## Styled Example

```vue live
<template>
  <VTable
    class="styled"
    :items="people"
    :headers="headers"
  />
</template>

<script>
export default {
  data: () => ({
    headers: [
      { key: 'name' },
      {
        key: 'age',
        sort: true,
      },
      {
        key: 'color',
        text: 'Favorite Color',
        sort: (a, b, isAscending) => {
          // Random order
          return Math.random() - .5;
        }
      },
    ],
    people: [
      {
        name: 'Mary',
        age: 33,
        color: 'red'
      },
      {
        name: 'Bob',
        age: 56,
        color: 'green'
      },
      {
        name: 'Ivana',
        age: 12,
        color: 'blue'
      },
      {
        name: 'Jeremy',
        age: 8,
        color: 'orange'
      },
      {
        name: 'Cassie',
        age: 45,
        color: 'purple'
      },
    ],
  }),
};
</script>
```
