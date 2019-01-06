<template>
  <section class="container">
    <div v-html="readmeContent"></div>

    <hr>

    <h3>
      <code>&lt;vts-drawer&gt;</code>
    </h3>

    <pre><code>// Example.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;vts-drawer v-model="show"&gt;
      My drawer content
    &lt;/vts-drawer&gt;

    &lt;button @click=&quot;show = !show&quot;&gt;Toggle Drawer&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  data: () =&gt; ({
    show: true
  })
}
&lt;/script&gt;
</code></pre>

    <vts-drawer v-model="showDrawer">
      My drawer content
    </vts-drawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>

    <hr>

    <h3>
      <code>&lt;vts-dropdown&gt;</code>
    </h3>

    <pre><code>// Example.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;vts-dropdown&gt;
      &lt;a href=&quot;#&quot;&gt;link&lt;/a&gt;
      &lt;a href=&quot;#&quot;&gt;link&lt;/a&gt;
      &lt;a href=&quot;#&quot;&gt;link&lt;/a&gt;
    &lt;/vts-dropdown&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre>

    <vts-dropdown>
      <a href="#">link</a>
      <a href="#">link</a>
      <a href="#">link</a>
    </vts-dropdown>

    <hr>

    <h3>
      <code>&lt;vts-fetch&gt;</code>
    </h3>

    <pre><code>// Example.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;vts-fetch :url=&quot;`https://jsonplaceholder.typicode.com/users/${userId}`&quot;&gt;
      &lt;div slot-scope=&quot;{ loading, error, response, send }&quot;&gt;
        &lt;p v-if=&quot;loading&quot;&gt;Loading...&lt;/p&gt;

        &lt;p v-else-if=&quot;error&quot;&gt;There was an error&lt;/p&gt;

        &lt;template v-else&gt;
          &lt;p&gt;JSON response:&lt;/p&gt;
          &lt;code&gt;{ { response } }&lt;/code&gt;
          &lt;br&gt;
        &lt;/template&gt;

        &lt;button @click=&quot;send(`https://jsonplaceholder.typicode.com/users/${userId++}`)&quot;&gt;Get next user&lt;/button&gt;
        &lt;button @click=&quot;send(`https://httpstat.us/500`)&quot;&gt;Get a 500 error&lt;/button&gt;
      &lt;/div&gt;
    &lt;/vts-fetch&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  data: () =&gt; ({
    userId: 1
  })
}
&lt;/script&gt;
</code></pre>

    <vts-fetch :url="`https://jsonplaceholder.typicode.com/users/${userId}`">
      <div slot-scope="{ loading, error, response, send }">
        <p v-if="loading">Loading...</p>

        <p v-else-if="error">There was an error</p>

        <template v-else>
          <p>JSON response:</p>
          <code>{{ response }}</code>
          <br>
        </template>

        <button @click="send(`https://jsonplaceholder.typicode.com/users/${userId++}`)">Get next user</button>
        <button @click="send('https://httpstat.us/500')">Get a 500 error</button>
      </div>
    </vts-fetch>

    <hr>

    <h3>
      <code>&lt;vts-intersection&gt;</code>
    </h3>

    <pre><code>// Example.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;vts-intersection @enter=&quot;consoleLog('@enter fired')&quot; @leave=&quot;consoleLog('@leave fired')&quot; @change=&quot;consoleLog('@change fired')&quot;&gt;
      Check your developer console to see updates.
    &lt;/vts-intersection&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  methods: {
    consoleLog: console.log
  }
}
&lt;/script&gt;
</code></pre>

    <vts-intersection
      @enter="consoleLog('@enter fired')"
      @leave="consoleLog('@leave fired')"
      @change="consoleLog('@change fired')"
    >
      Check your developer console to see updates.
    </vts-intersection>

    <hr>

    <h3>
      <code>&lt;vts-loading&gt;</code>
    </h3>

    <pre><code>// Example.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;div style=&quot;max-width: 200px;&quot;&gt;
      &lt;label&gt;
        Loading Type:
        &lt;select v-model=&quot;loadingType&quot;&gt;
          &lt;option v-for=&quot;type in loadingTypes&quot; :key=&quot;type&quot; :value=&quot;type&quot;&gt;{ { type } }&lt;/option&gt;
        &lt;/select&gt;
      &lt;/label&gt;
      &lt;br&gt;
      &lt;label&gt;
        Fill Color:
        &lt;select v-model=&quot;fill&quot;&gt;
          &lt;option v-for=&quot;color in colors&quot; :key=&quot;color&quot; :value=&quot;color&quot;&gt;{ { color } }&lt;/option&gt;
        &lt;/select&gt;
      &lt;/label&gt;
      &lt;br&gt;
      &lt;label&gt;
        Stroke Color:
        &lt;select v-model=&quot;stroke&quot;&gt;
          &lt;option v-for=&quot;color in colors&quot; :key=&quot;color&quot; :value=&quot;color&quot;&gt;{ { color } }&lt;/option&gt;
        &lt;/select&gt;
      &lt;/label&gt;
      &lt;vts-loading :name=&quot;loadingType&quot; :fill=&quot;fill&quot; :stroke=&quot;stroke&quot; /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  data: () => ({
    loadingType: '',
    loadingTypes: [
      'bars',
      'cube',
      'infinity',
      'gear',
      'ring',
      'ripple',
      'spin'
    ],
    stroke: 'currentColor',
    fill: 'none',
    colors: [
      'none',
      'currentColor',
      'red',
      '#bada55',
      'rgba(0, 0, 0, 0.5)'
    ]
  })
}
&lt;/script&gt;
</code></pre>

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
      <br>
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
      <br>
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

    <hr>

    <h3>
      <code>&lt;vts-modal&gt;</code>
    </h3>

    <pre><code>// Example.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;vts-modal v-model=&quot;modal&quot;&gt;
      This is the modal content.
      &lt;br&gt;
      It traps the user focus.
      &lt;br&gt;
      &lt;button @click=&quot;modal = false&quot;&gt;Close&lt;/button&gt;
    &lt;/vts-modal&gt;
    &lt;button @click=&quot;modal = !modal&quot;&gt;toggle&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  data: () => ({
    modal: false
  })
}
&lt;/script&gt;
</code></pre>

    <vts-modal v-model="modal">
      This is the modal content.
      <br>
      It traps the user focus.
      <br>
      <button @click="modal = false">Close</button>
    </vts-modal>
    <button @click="modal = !modal">toggle</button>

  </section>
</template>

<script>
import readmeContent from "../../README.md"
export default {
  data: () => ({
    readmeContent,
    showDrawer: false,
    userId: 1,
    loadingType: "",
    loadingTypes: ["bars", "ring", "ripple"],
    stroke: "currentColor",
    fill: "none",
    colors: ["none", "currentColor", "red", "#bada55", "rgba(0, 0, 0, 0.5)"],
    modal: false
  }),

  methods: {
    consoleLog: console.log
  }
}
</script>
