# number

Formats a string number to a user friendly number using the browser's [Intl object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). Note that the format will default to the user's browser locale settings based on [navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language).

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/filters/index.js)

## Installation

Global install:

```js
import Vue from 'vue';
import { number } from 'vuetensils/src/filters';

Vue.filter('number', number);
```

Local install:

```html
<script>
  import { number } from 'vuetensils/src/filters';

  export default {
    filters: {
      number,
    },
  };
</script>
```

## Example

```vue live
<template>
  <div>
    {{ '1234.567' | number }}
  </div>
</template>
```

## Custom Locale

You can specify the locale formatting by passing the filter your target [ISO Language Code](http://www.lingoes.net/en/translator/langcode.htm).

```vue live
<template>
  <div>
    {{ '1234.567' | number('de-DE') }}
  </div>
</template>
```

## Custom Default Locale

You can specify your own default locale formatting by extending the filter and providing your target [ISO Language Code](http://www.lingoes.net/en/translator/langcode.htm).

```js
import Vue from 'vue';
import { number } from 'vuetensils/src/filters';

const customNumber = str => number(str, 'de-DE');

Vue.filter('number', customNumber);
```
