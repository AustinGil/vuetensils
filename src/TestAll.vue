<template>
  <div>
    <button @click="countdown = 10">
      Reset time
    </button>
    <VAlert v-model="countdown" dismissible>
      This alert will dismiss in {{ countdown }} seconds.
    </VAlert>

    <VAsync :await="prom">
      <template #default="p">
        <pre>{{ p }}</pre>
      </template>
    </VAsync>

    <VBtn @click="log">
      Yo
    </VBtn>
    <VBtn href="/">
      Yo
    </VBtn>
    <VBtn to="/">
      Yo
    </VBtn>

    <VDate />

    <VDialog
      :classes="{ bg: 'bg-black-alpha' }"
      transition="slide-up"
      bg-transition="fade"
      @close="log"
    >
      <template #toggle="{ bind, on }">
        <button v-bind="bind" v-on="on">
          Show the dialog
        </button>
      </template>

      <div class="bg-white">
        This is the dialog content.
      </div>
    </VDialog>

    <VDrawer
      :classes="{ bg: 'bg-black-alpha', content: 'bg-white' }"
      bg-transition="fade"
      transition="slide-right"
    >
      <template #toggle="{ bind, on }">
        <button v-bind="bind" v-on="on">
          Toggle Drawer
        </button>
      </template>

      My drawer content
    </VDrawer>

    <VDropdown text="Show me what you got!">
      <div class="bg-white">
        <p>This will close on click-out or focus-out.</p>
        <p>Try keyboard navigation.</p>
        <nav>
          <ul>
            <li><a href="#">link</a></li>
            <li><a href="#">link</a></li>
            <li><a href="#">link</a></li>
          </ul>
        </nav>
      </div>
    </VDropdown>

    <VFile label="Select a file">
      <template #default="{ files, droppable}">
        <p v-if="droppable" aria-hidden="true">
          Go ahead, let go.
        </p>
        <p v-else-if="files.length" aria-hidden="true">
          You selected {{ files[0].name }}.
        </p>
        <p v-else aria-hidden="true">
          Drop some sweet files here.
        </p>
      </template>
    </VFile>

    <VForm @submit.prevent="log">
      <template #default="form">
        <label>
          Name:
          <input name="name" required />
        </label>

        <button type="submit" :disabled="!form.valid">
          Submit
        </button>

        <pre>{{ form }}</pre>
      </template>
    </VForm>

    <VImg
      :src="
        `https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=1080`
      "
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

    <form @submit.prevent>
      <VInput
        label="Name"
        name="name"
        required
        minlength="2"
        :errors="{
          minlength(l) {
            return `Test ` + l;
          },
        }"
      >
        <template #description="input">
          {{ input }}
          <template v-if="input.error">
            <small v-if="input.invalid.required">
              This field is required.
            </small>
            <small v-if="input.invalid.minlength">
              Must be more than 2 characters
            </small>
          </template>
        </template>
      </VInput>
      <VInput label="Email" name="email" type="email" required>
        <template #description="input">
          <template v-if="input.error">
            <small v-if="input.invalid.required">
              This field is required.
            </small>
            <small v-if="input.invalid.type">
              Must be an email
            </small>
          </template>
        </template>
      </VInput>

      <button type="submit">
        Submit
      </button>
    </form>

    <VIntersect
      @enter="log('@enter fired for block 1')"
      @exit="log('@exit fired for block 1')"
      @change="log('@change fired for block 1')"
    >
      <div class="intersection-content">
        Content block 1
      </div>
    </VIntersect>

    <VIntersect :threshold="1">
      <template #default="entry">
        <div
          class="intersection-content"
          :style="{
            background: entry.isIntersecting ? 'lightgreen' : 'lightcoral',
          }"
        >
          isIntersecting: {{ entry.isIntersecting }}
        </div>
      </template>
    </VIntersect>

    <VResize>
      <template #default="{ width } ">
        <div
          class="resize-example"
          :class="{
            lg: width > 500,
            md: width > 300 && width < 500,
            sm: width < 300,
          }"
        >
          <img src="https://www.fillmurray.com/200/200" alt="description" />
          <p>This content is {{ width }}px wide.</p>
        </div>
      </template>
    </VResize>

    <div>
      <VSkip to="#main">
        Skip To Main Content
      </VSkip>

      <!-- perhaps a nav here -->
      <nav>
        <ul class="fake-nav">
          <li><a href="#">Example 1</a></li>
          <li><a href="#">Example 2</a></li>
          <li><a href="#">Example 3</a></li>
          <li><a href="#">Example 4</a></li>
          <li><a href="#">Example 5</a></li>
          <li><a href="#">Example 6</a></li>
        </ul>
      </nav>

      <main id="main">
        <p>This is the main content section</p>
        <p>It could even be a router-link.</p>
        <p>We're adding some extra paragraphs here.</p>
        <p>Because otherwise the header blocks this content :)</p>
      </main>
    </div>

    <VTabs class="styled">
      <template #tab-1>
        tab 1.
      </template>
      <template #panel-1>
        Here's the content for tabpanel-1.
      </template>

      <template #tab-3>
        tabpanel-3.
      </template>
      <template #panel-3>
        Here's the content for tabpanel-3.
      </template>

      <template #tab-2>
        tabpanel-2.
      </template>
      <template #panel-2>
        Here's the content for tabpanel-2.
      </template>
    </VTabs>

    <VTable class="styled" :items="people" :headers="headers" />

    <VToggle>
      <template #label="{ isOpen }">
        <span aria-hidden>{{ isOpen ? '🔼' : '🔽' }}</span>
        Title
      </template>

      <template #default="{isOpen}">isOpen: {{ isOpen }}
</template>
    </VToggle>

    <VTooltip>
      <template #tooltip>
        heyo :)
      </template>

      I have a tooltip!
    </VTooltip>

    <VTry v-slot="error">
      <ThisWillThrow />

      <div v-if="error">
        There was an error in the component:
        <pre>{{ error }}</pre>
      </div>
    </VTry>

    <VTry>
      <ThisWillThrow />

      <template #catch="error">
        <pre>{{ error }}</pre>
      </template>
    </VTry>
  </div>
</template>

<script>
import { h } from 'vue';
import * as components from './components.js';

export default {
  name: 'App',
  components: {
    ...components,
    ThisWillThrow: {
      methods: {
        onClick() {
          throw new Error('ThisWillThrow...threw...');
        },
      },
      render() {
        return h('button', { onClick: this.onClick }, 'Throw');
      },
    },
  },
  data: () => ({
    prom: new Promise(r => setTimeout(() => r(4), 500)),
    countdown: 5,
    headers: [
      { key: 'name' },
      {
        key: 'age',
        sort: true,
      },
      {
        key: 'color',
        text: 'Favorite Color',
        sort: () => {
          // Random order
          return Math.random() - 0.5;
        },
      },
    ],
    people: [
      {
        name: 'Mary',
        age: 33,
        color: 'red',
      },
      {
        name: 'Bob',
        age: 56,
        color: 'green',
      },
      {
        name: 'Ivana',
        age: 12,
        color: 'blue',
      },
      {
        name: 'Jeremy',
        age: 8,
        color: 'orange',
      },
      {
        name: 'Cassie',
        age: 45,
        color: 'purple',
      },
    ],
    // show: true,
  }),
  methods: {
    log: console.log,
  },
};
</script>

<style>
#app {
  font-family: system-ui;
  text-align: center;
  margin-top: 60px;
}

.bg-white {
  background-color: #fff;
}

.bg-black-alpha {
  background: rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.my-dialog .fade-enter .vts-dialog__content,
.my-dialog .fade-leave-active .vts-dialog__content {
  transform: translateY(20px);
}

.intersection-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  border: 1px solid;
}
</style>
