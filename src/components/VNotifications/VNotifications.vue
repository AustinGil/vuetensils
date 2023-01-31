<script>
import { reactive } from 'vue';
import { randomString } from '../../utils.js';

/**
 * @typedef {{
 * id?: string,
 * text: string,
 * persistent?: boolean,
 * timeout?: number|false,
 * timeoutId?: number,
 * }} VNotification
 */

const state = reactive({
  /** @type {VNotification[]} */
  notifications: [],
});

/**
 * @param {Omit<VNotification, 'timeoutId'> | string} notification
 */
export function notify(notification) {
  if (typeof notification === 'string') {
    notification = {
      text: notification,
    };
  }
  notification = {
    id: `vts_${randomString(4)}`,
    persistent: undefined,
    timeout: undefined,
    ...notification,
  };
  state.notifications.push(notification);
}

export default {
  props: {
    timeout: {
      type: [String, Number],
      default: 0,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: '',
    },
    classes: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    notifications() {
      const { persistent } = this;
      return state.notifications.map((notification) => {
        if (notification.persistent == null) {
          notification.persistent = persistent;
        }
        return notification;
      });
    },
  },
  watch: {
    'notifications.length': {
      handler(length, oldLength) {
        if (oldLength > length) return;
        const newNotification = state.notifications[length - 1];
        let timeout = Number(this.timeout);
        if (newNotification.timeout != null) {
          timeout = Number(newNotification.timeout);
        }

        if (!timeout) return;

        // @ts-ignore
        newNotification.timeoutId = setTimeout(() => {
          this.remove(newNotification);
        }, timeout);
      },
    },
  },
  unmounted() {
    for (const notification of state.notifications) {
      if (!notification.timeoutId) continue;
      clearTimeout(notification.timeoutId);
    }
  },
  methods: {
    /** @param {VNotification} notification */
    remove: (notification) => {
      const index = state.notifications.findIndex(
        (n) => n.id === notification.id
      );
      state.notifications.splice(index, 1);
    },
  },
};
</script>

<template>
  <ul :class="['vts-notifications', classes.root]">
    <TransitionGroup :name="transition">
      <li v-for="notification of notifications" :key="notification.id"
        :class="['vts-notification', classes.notification]">
        <span role="alert" :class="['vts-notification__text', classes.text]">{{
          notification.text
        }}</span>
  
        <button v-if="!notification.persistent" :class="['vts-notification__dismiss', classes.dismiss]"
          @click="remove(notification)">
          &times;
          <span class="vts-visually-hidden">Remove notification</span>
        </button>
      </li>
    </TransitionGroup>
  </ul>
</template>

<style>
.vts-notifications {
  position: fixed;
  z-index: 100;
}

.vts-notifications__list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
