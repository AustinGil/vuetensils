<template>
  <section class="container">
    <div v-html="readmeContent"></div>

    <!-- <vts-img
      src="https://source.unsplash.com/random/900x600"
      srcset="https://source.unsplash.com/random/320x280 320w,
             https://source.unsplash.com/random/480x360 480w,
             https://source.unsplash.com/random/800x600 800w"
      sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
    />
    <br>
    <br>
    <br>
    <br>
    <vts-img
      src="https://source.unsplash.com/random/901x600"
      ref="two"
    />

    <hr> -->

    <h3>
      <code>&lt;vts-drawer&gt;</code>
    </h3>

    <pre><code>// Example.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;vts-drawer
      v-model="show"
      transition="slide-right"
      bg-transition="fade"
    &gt;
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

    <no-ssr>
      <vts-drawer
        v-model="showDrawer"
        transition="slide-right"
        bg-transition="fade"
      >
        My drawer content
      </vts-drawer>

      <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
    </no-ssr>

    <hr>

    <h3>
      <code>&lt;vts-dropdown&gt;</code>
    </h3>

    <pre><code>// Example.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;vts-dropdown
      text="Show me what you got!"
      transition="slide-up"
    &gt;
      &lt;p&gt;Here is the dropdown content.
        &lt;br&gt;Why not add a nav?
      &lt;/p&gt;
      &lt;nav&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;a href="#"&gt;link&lt;/a&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href="#"&gt;link&lt;/a&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href="#"&gt;link&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/nav&gt;
    &lt;/vts-dropdown&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre>

    <no-ssr>
      <vts-dropdown
        text="Show me what you got!"
        transition="slide-up"
      >
        <p>Here is the dropdown content.
          <br>Why not add a nav?
        </p>
        <nav>
          <ul>
            <li><a href="#">link</a></li>
            <li><a href="#">link</a></li>
            <li><a href="#">link</a></li>
          </ul>
        </nav>
      </vts-dropdown>
    </no-ssr>

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
    &lt;vts-modal
      v-model=&quot;modal&quot;
      transition="slide-up"
      bg-transition="fade"
    &gt;
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
    <no-ssr>
      <vts-modal
        v-model="modal"
        transition="slide-up"
        bg-transition="fade"
      >
        This is the modal content.
        <br>
        It traps the user focus.
        <br>
        <button @click="modal = false">Close</button>
      </vts-modal>
      <button @click="modal = !modal">toggle</button>
    </no-ssr>

    <hr>

    <p><b>NOTE:</b> this library does not include CSS transitions. The transitions on this page were added with the following styles.</p>

    <pre>&lt;style&gt;
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(0);
  transition: opacity 0.5s, transform 0.5s;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
&lt;/style&gt;</pre>

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
    loadingTypes: ["dual-ring", "bars", "ring", "ripple"],
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
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(0);
  transition: opacity 0.5s, transform 0.5s;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
