# currency

Formats a string number to a currency number using the browser's [Intl object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). Currency codes are based on [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/filters/index.js)

## Installation

Global install:

```js
import Vue from 'vue';
import { currency } from 'vuetensils/src/filters';

Vue.filter('currency', currency);
```

Local install:

```html
<script>
  import { currency } from 'vuetensils/src/filters';

  export default {
    filters: {
      currency,
    },
  };
</script>
```

## Example

```vue live
<template>
  <div>
    {{ '1234' | currency('USD') }}
  </div>
</template>
```

## Custom Locale

You can specify the locale formatting by passing the filter your target [ISO Language Code](http://www.lingoes.net/en/translator/langcode.htm).

```vue live
<template>
  <div>
    {{ '1234' | currency('EUR', 'de-DE') }}
  </div>
</template>
```

## Custom Default Formatting

You can specify your own default currency and/or locale formatting by extending the filter and providing your target [currency](https://en.wikipedia.org/wiki/ISO_4217) and [ISO Language Code](http://www.lingoes.net/en/translator/langcode.htm).

```js
import Vue from 'vue';
import { currency } from 'vuetensils/src/filters';

const usd = str => currency(str, 'USD');
const euro = str => currency(str, 'EUR', 'de-DE');

Vue.filter('usd', usd);
Vue.filter('euro', euro);
```
