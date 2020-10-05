<template>
  <!--
    <div className="lists-container">
      <h2 v-if="caption">
        {{ caption }}
      </h2>
      <div v-for="item in cItems" :key="item.id">
        <h3>{{ "todo header" }}</h3>
        <dl>
          {this.props.headers.map((header, i) =>
              i > 0 &&
              <React.Fragment key={i}>
                <dt>{header}</dt>
                <dd>{row[i]}</dd>
              </React.Fragment>
            )}
        </dl>
      </div>
    </div>
  -->

  <div
    ref="container"
    role="group"
    aria-labelledby="caption"
    :class="['vts-table', classes.root]"
    :tabindex="tabindex"
  >
    <table :class="[classes.table]">
      <caption v-if="caption" id="caption" :class="[classes.caption]">
        {{ caption }}
      </caption>
      <thead v-if="headers.length" :class="[classes.thead]">
        <tr :class="[classes.tr]">
          <th
            v-for="(header, key) in cHeaders"
            :key="key"
            :aria-sort="ariaSort(header)"
            :class="[classes.th]"
          >
            {{ header.text || header.key }}

            <button
              v-if="header.sortable"
              :aria-label="ariaLabel(header)"
              :class="[classes.sortBtn]"
              @click="onSort(header.key)"
            >
              <template v-if="header.key === sortBy && sortOrder === 'ASC'">
                &uarr;
              </template>
              <template
                v-else-if="header.key === sortBy && sortOrder === 'DESC'"
              >
                &darr;
              </template>
              <template v-else>
                ↕
              </template>
            </button>
          </th>
        </tr>
      </thead>
      <tbody :class="[classes.tbody]">
        <slot v-bind="{ items: cItems, ...$data, perPage }">
          <tr
            v-for="(item, index) in cItems"
            :key="item.id"
            tabindex="0"
            :class="[classes.tr]"
            @click="emitRowClick(item)"
            @keyup="emitRowClick(item)"
          >
            <slot
              v-for="(value, key) in item.data"
              :name="items[index].id ? `row.${items[index].id}` : null"
              v-bind="{ item, column: key, row: index + 1 }"
            >
              <td :key="key" :class="[classes.td]">
                <slot
                  :name="`column.${key}`"
                  v-bind="{ cell: value, item, column: key, row: index + 1 }"
                >
                  {{ value }}
                </slot>
              </td>
            </slot>
          </tr>
        </slot>
      </tbody>

      <tfoot v-if="$slots.tfoot" :class="[classes.tfoot]">
        <slot name="tfoot" />
      </tfoot>
    </table>

    <slot name="pagination" v-bind="{ currentPage, lastPage, goToPage }">
      <div v-if="lastPage > 1" :class="[classes.pagination]">
        <button
          :disabled="currentPage === 1"
          aria-label="go to previous page"
          :class="[classes.previous]"
          @click="goToPage(currentPage - 1)"
        >
          Prev
        </button>
        <ul :class="[classes.pageList]">
          <li v-for="pageNum in lastPage" :key="pageNum" :class="[classes.pageItem]">
            <button
              :disabled="pageNum === currentPage"
              :aria-label="`go to page ${pageNum}`"
              :class="[classes.page]"
              @click="goToPage(pageNum)"
            >
              {{ pageNum }}
            </button>
          </li>
        </ul>
        <button
          :disabled="currentPage === lastPage"
          aria-label="go to next page"
          :class="[classes.next]"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'VTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 100,
    },
    orderBy: {
      type: String,
      default: null,
    },
    order: {
      type: String,
      default: null,
    },
    caption: {
      type: String,
      default: '',
    },
    // TODO: sortable prop
    classes: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      sortBy: this.orderBy,
      sortOrder: this.order && this.order.toUpperCase(),
      currentPage: this.page,
      tabindex: null,
    };
  },

  computed: {
    cHeaders() {
      return this.headers.reduce((headers, item) => {
        /* eslint-disable-next-line no-param-reassign */
        headers[item.key] = {
          sortable: true,
          ...item,
        };
        return headers;
      }, {});
    },

    cItems() {
      const { items, sortBy, sortOrder, currentPage, perPage, cHeaders } = this;

      let cItems = items.map(original => {
        const data = {};
        Object.keys(cHeaders).forEach(key => {
          data[key] = original[key];
        });
        return {
          original,
          data,
        };
      });

      if (sortBy && sortOrder) {
        const multiplier = sortOrder === 'ASC' ? 1 : -1;
        const isNum = Number.isFinite(cItems[0].data[sortBy]);

        cItems = cItems.sort((a, b) => {
          const aVal = a.data[sortBy];
          const bVal = b.data[sortBy];

          if (isNum) {
            return (aVal - bVal) * multiplier;
          }

          if (aVal < bVal) return -1 * multiplier;
          if (aVal > bVal) return 1 * multiplier;
          return 0;
        });
      }

      if (perPage > -1) {
        const offset = (Math.max(currentPage, 1) - 1) * perPage;
        cItems = cItems.slice(offset, offset + perPage);
      }

      return cItems;
    },

    lastPage() {
      return Math.ceil(this.items.length / this.perPage);
    },
  },

  mounted() {
    const { scrollWidth, clientWidth } = this.$refs.container;
    const scrollable = scrollWidth > clientWidth;
    this.tabindex = scrollable ? '0' : null;
  },

  methods: {
    onSort(key) {
      const { sortBy, sortOrder } = this;
      this.currentPage = 1;

      if (key !== sortBy) {
        this.sortBy = key;
        this.sortOrder = 'ASC';
        return;
      }

      switch (sortOrder) {
        case 'ASC':
          this.sortOrder = 'DESC';
          break;
        case 'DESC':
          this.sortOrder = null;
          break;
        default:
          this.sortOrder = 'ASC';
      }
    },

    goToPage(page) {
      const { lastPage } = this;
      this.currentPage = Math.min(Math.max(1, page), lastPage);
    },

    emitRowClick(item) {
      this.$emit('click:row', item.original); // eslint-disable-line vue/custom-event-name-casing
    },

    ariaSort(header) {
      let order = 'descending';

      if (this.sortBy !== header.key) {
        order = null;
      } else if (this.sortOrder === 'ASC') {
        order = 'ascending';
      }

      return order;
    },
    ariaLabel(header) {
      let order = 'default';

      if (!this.sortOrder) {
        order = 'ascending';
      } else if (this.sortOrder === 'ASC') {
        order = 'descending';
      }

      return [
        'sort by',
        header.text || header.key,
        'in',
        order,
        'order'
      ].join(' ');
    },
  },
};
</script>

<style>
.vts-table {
  overflow-x: auto;
}
@media (min-width: 400px) {
  .vts-table {
    display: block;
  }

  .lists-container {
    display: none;
  }
}
</style>
