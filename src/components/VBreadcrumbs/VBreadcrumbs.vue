<template>
  <nav
    role="navigation"
    class="vts-breadcrumbs"
  >
    <ol
      itemscope
      itemtype="http://schema.org/BreadcrumbList"
      class="vts-breadcrumbs__list"
    >
      <li
        v-for="(item, index) in routeBreadcrumbs"
        :key="index"
        itemprop="itemListElement"
        itemscope
        itemtype="http://schema.org/ListItem"
        class="vts-breadcrumbs__item"
      >
        <span
          v-if="index === routeBreadcrumbs.length - 1"
          class="active"
        >
          {{ item.text }}
        </span>
        <router-link
          v-else
          :id="`breadcumb-${item.path.slice(1) || 'root'}`"
          :to="{ path: item.path || '/' }"
        >
          {{ item.text }}
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "VBreadcrumbs",
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    routeBreadcrumbs() {
      if (this.breadcrumbs.length) {
        return this.breadcrumbs
      }
      if (this.$route.fullPath === "/dashboard") {
        return [{ text: "Home" }]
      }

      const routes = this.$route.matched.reduce((routes, route) => {
        // Make sure same path child routes (path: "") do not show up twice in breadcrumbs.
        if (
          route.parent &&
          (route.path === route.parent.path ||
            route.path === route.parent.path + "/")
        ) {
          return routes
        }

        route.text = this.getText(route)

        routes.push(route)
        return routes
      }, [])

      return routes
    },
  },

  methods: {
    getText(item) {
      if (item.meta && item.meta.title) {
        return item.meta.title
      }
      if (item.name) {
        return item.name
      }
      return item.path
    },
  },
}
</script>
