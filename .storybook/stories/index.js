import Vue from "vue"

import { storiesOf } from "@storybook/vue"

storiesOf("vts-drawer", module).add("Default", () => ({
  template: `<div>
    <vts-drawer
      v-model="showDrawer"
      transition="slide-right"
      bg-transition="fade"
    >
      My drawer content
    </vts-drawer>
    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>

    <hr>

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
    </div>`,
  data: () => ({
    showDrawer: false
  })
}))

storiesOf("vts-dropdown", module).add("Default", () => ({
  template: `<div>
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
    </div>`,
  data: () => ({
    showDrawer: false
  })
}))
