<script>
import { reactive } from 'vue';
import { randomString } from '../../utils.js';

/**
 * @typedef {{
 * id?: string,
 * text: string,
 * dismissible?: boolean,
 * timeout?: number,
 * timeoutId?: number,
 * }} VNotification
 */

export const data = reactive({
  /** @type {VNotification[]} */
  notifications: [],
});

/**
 * @param {VNotification | string} notification
 */
export function notify(notification) {
  if (typeof notification === 'string') {
    notification = {
      text: notification,
    };
  }
  notification = {
    id: `vts_${randomString(4)}`,
    dismissible: true,
    timeout: 0,
    ...notification,
  };
  data.notifications.push(notification);
}

export default {
  props: {
    timeout: {
      type: [String, Number],
      default: 0,
    },
    classes: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    notifications() {
      return data.notifications;
    },
  },
  watch: {
    'notifications.length': {
      handler(length, oldLength) {
        if (oldLength > length) return;
        const newNotification = data.notifications[length - 1];
        const timeout = newNotification.timeout || this.timeout;

        if (!timeout) return;

        // @ts-ignore
        newNotification.timeoutId = setTimeout(() => {
          this.remove(newNotification);
        }, Number(timeout));
      },
      // deep: true,
    },
  },
  unmounted() {
    for (const notification of data.notifications) {
      if (!notification.timeoutId) continue;
      clearTimeout(notification.timeoutId);
    }
  },
  methods: {
    add: notify,
    /**
     * @param {VNotification} notification
     */
    remove: (notification) => {
      const index = data.notifications.findIndex(
        (n) => n.id === notification.id
      );
      data.notifications.splice(index, 1);
    },
  },
};
</script>

<template>
  <div :class="['vts-notifications', classes.notifications]">
    <ul v-if="notifications.length" :class="['vts-notifications__list', classes.notifications]">
      <li v-for="notification of notifications" :class="['vts-notification', classes.notification]">
        {{ notification }}

        <button v-if="notification.dismissible" @click="remove(notification)">
          &times;
          <span class="vts-visually-hidden"> Remove notification </span>
        </button>
      </li>
    </ul>
  </div>
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

/* .vts-notification {
  display: flex;
  align-items: center;
} */
</style>
