<template>
  <div
    ref="container"
    role="region"
    aria-labelledby="caption"
    :class="['vts-table', { 'vts-table--sortable': sortable }, classes.root]"
  >
    <!-- <div className="lists-container">
      <h2 v-if="caption">
        {{ caption }}
      </h2>
      <dl v-for="item in computedItems" :key="item.id">
        <template v-for="(header, index) in computedHeaders">
          <dt :key="`${header.key}-term`">
            {{ header.text || header.key }}:
          </dt>
          <dd :key="`${header.key}-definition`">
            {{ computedItems[index][header.key] }}
          </dd>
        </template>
      </dl>
    </div> -->

    <!-- :tabindex="tabindex" -->
    <table :class="[classes.table]">
      <slot
        v-bind="{
          caption,
          headers: computedHeaders,
          items: computedItems,
          sortBy: localSortBy,
          sortDirection: localSortDirection,
          page: localPage,
          perPage: localPerPage,
        }"
      >
        <caption v-if="caption" :id="`${id}__caption`" :class="[classes.caption]">
          {{
            caption
          }}
        </caption>

        <thead v-if="computedHeaders.length" :class="[classes.thead]">
          <tr :class="[classes.tr]">
            <th
              v-for="(header, index) in computedHeaders"
              :key="header.key"
              v-bind="header.bind"
              :class="[classes.th]"
            >
              <slot
                :name="`header.${header.key}`"
                v-bind="{
                  header,
                  index,
                }"
              >
                {{ header.text || header.key }}

                <template v-if="header.sortable">
                  <slot
                    v-if="
                      header.key === localSortBy && localSortDirection === 'ASC'
                    "
                    name="sort-asc"
                    v-bind="header.sortBtn"
                  >
                    <button
                      :class="[
                        'vts-table__sort-btn',
                        'vts-table__sort-btn--asc',
                        classes.sortBtn,
                      ]"
                      v-bind="header.sortBtn.bind"
                      v-on="header.sortBtn.on"
                    >
                      &uarr;
                    </button>
                  </slot>

                  <slot
                    v-else-if="
                      header.key === localSortBy && localSortDirection === 'DESC'
                    "
                    name="sort-desc"
                    v-bind="header.sortBtn"
                  >
                    <button
                      :class="[
                        'vts-table__sort-btn',
                        'vts-table__sort-btn--desc',
                        classes.sortBtn,
                      ]"
                      v-bind="header.sortBtn.bind"
                      v-on="header.sortBtn.on"
                    >
                      &darr;
                    </button>
                  </slot>

                  <slot v-else name="sort-none" v-bind="header.sortBtn">
                    <button
                      :class="['vts-table__sort-btn', classes.sortBtn]"
                      v-bind="header.sortBtn.bind"
                      v-on="header.sortBtn.on"
                    >
                      ↕
                    </button>
                  </slot>
                </template>
              </slot>
            </th>
          </tr>
        </thead>

        <tbody :class="[classes.tbody]">
          <slot
            name="body"
            v-bind="{
              items: computedItems,
              sortBy: localSortBy,
              sortDirection: localSortDirection,
              page: localPage,
              perPage: localPerPage,
            }"
          >
            <tr
              v-for="(item, index) in computedItems"
              :key="item.id"
              :class="['vts-table__row', classes.tr]"
            >
              <slot name="row" v-bind="{ item, index, row: index + 1 }">
                <td 
                  v-for="(value, key) in item"
                  :key="key"
                  :class="[classes.td]"
                >
                  <slot
                    :name="`column.${key}`"
                    v-bind="{
                      cell: value,
                      data: value,
                      value,
                      item,
                      column: key,
                      index,
                      row: index + 1,
                    }"
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
      </slot>
    </table>

    <slot
      name="pagination"
      v-bind="{ page: localPage, perPage: localPerPage, lastPage, goToPage }"
    >
      <div
        v-if="lastPage > 1"
        :class="['vts-table__pagination', classes.pagination]"
      >
        <button
          :disabled="localPage === 1"
          aria-label="go to previous page"
          :class="['vts-table__prev', classes.previous]"
          @click="goToPage(localPage - 1)"
        >
          Prev
        </button>
        <ul :class="['vts-table__pages', classes.pageList]">
          <li
            v-for="pageNum in lastPage"
            :key="pageNum"
            :class="[
              'vts-table__page-item',
              { 'vts-table__page-item--current': pageNum === localPage },
              classes.pageItem,
            ]"
          >
            <button
              :disabled="pageNum === localPage"
              :aria-label="`go to page ${pageNum}`"
              :class="[
                'vts-table__page',
                { 'vts-table__page--current': pageNum === localPage },
                classes.page,
              ]"
              @click="goToPage(pageNum)"
            >
              {{ pageNum }}
            </button>
          </li>
        </ul>
        <button
          :disabled="localPage === lastPage"
          aria-label="go to next page"
          :class="['vts-table__next', classes.next]"
          @click="goToPage(localPage + 1)"
        >
          Next
        </button>
      </div>
    </slot>
  </div>
</template>

<script>
import { randomString } from '../../utils.js';

/**
 * @typedef {{ key: string, text: string, sortable: boolean, sort: (a, b, isAscending: boolean) => number }} Header
 * @typedef {Header & { bind: object, sortBtn: object }} ComputedHeader
 */

export default {
  name: 'VTable',
  provide() {
    return {
      $table: this,
    };
  },
  props: {
    /** @type {import('vue').PropOptions<Header[]>} */
    headers: {
      type: Array,
      default: () => [],
    },
    /** @type {import('vue').PropOptions<Object[]>} */
    items: {
      type: Array,
      default: () => [],
    },
    page: {
      type: [Number, String],
      default: 1,
    },
    perPage: {
      type: [Number, String],
      default: -1,
    },
    sortBy: {
      type: String,
      default: '',
    },
    /** @type {import('vue').PropOptions<'ASC'|'DESC'>} */
    // @ts-ignore
    sortDirection: {
      type: String,
      default: '',
      validator: direction => {
        return new Set(['ASC', 'DESC', '']).has(direction.toUpperCase());
      },
    },
    id: {
      type: String,
      default: 'vts-' + randomString(4),
    },
    caption: {
      type: String,
      default: '',
    },
    sortable: Boolean,
    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      localSortBy: this.sortBy,
      localSortDirection: this.sortDirection ? this.sortDirection.toUpperCase() : '',
      localPage: Number(this.page),
      localPerPage: Number(this.perPage),
      // tabindex: null,
    };
  },

  computed: {
    /** @return {ComputedHeader[]} */
    computedHeaders() {
      const { headers, sortable, localSortBy, localSortDirection } = this;
      const computedHeaders = [];

      headers.forEach(header => {
        /** @type {ComputedHeader} */
        const computedHeader = {
          ...header,
          bind: {},
          sortBtn: {
            bind: { 'aria-label': `toggle sort direction` },
            on: { click: () => this.onSort(header.key) },
          },
        };

        if (computedHeader.sortable === undefined) {
          computedHeader.sortable = !!computedHeader.sort || sortable;
        }

        if (computedHeader.sortable) {
          if (localSortBy === header.key && localSortDirection) {
            if (localSortDirection === 'ASC') {
              computedHeader.bind['aria-sort'] = 'ascending';
            } else {
              computedHeader.bind['aria-sort'] = 'descending';
            }
          }
        }

        computedHeaders.push(computedHeader);
      });
      return computedHeaders;
    },

    /** @return {Array} */
    computedItems() {
      const {
        computedHeaders,
        items,
        localSortBy,
        localSortDirection,
        localPage,
        localPerPage,
      } = this;

      let computedItems = [...items];

      if (localSortBy && localSortDirection) {
        const targetColumn = computedHeaders.find(header => {
          return header.key === localSortBy;
        });

        let compareFn = this.defaultComparisonFn;
        if (typeof targetColumn.sort === 'function') {
          compareFn = targetColumn.sort;
        }

        computedItems = computedItems.sort((a, b) => {
          return compareFn(a, b, localSortDirection === 'ASC');
        });
      }

      if (localPerPage > -1) {
        const offset = (Math.max(localPage, 1) - 1) * localPerPage;
        computedItems = computedItems.slice(offset, offset + localPerPage);
      }

      return computedItems;
    },

    /** @return {number} */
    lastPage() {
      return Math.ceil(this.items.length / +this.perPage);
    },
  },

  watch: {
    /** @param {string} value */
    sortBy(value) {
      this.localSortBy = value;
    },
    localSortBy(value) {
      this.$emit('update:sort-by', value);
    },
    /** @param {string} value */
    sortDirection(value) {
      this.localSortDirection = value && value.toUpperCase() || '';
    },
    localSortDirection(value) {
      this.$emit('update:sort-direction', value);
    },
    /** @param {string | number} value */
    page(value) {
      this.localPage = Number(value);
    },
    localPage(value) {
      this.$emit('update:page', value);
    },
    /** @param {string | number} value */
    perPage(value) {
      this.localPerPage = Number(value);
    },
    localPerPage(value) {
      this.$emit('update:per-page', value);
    },
  },

  // mounted() {
  //   const { scrollWidth, clientWidth } = this.$refs.container;
  //   const scrollable = scrollWidth > clientWidth;
  //   this.tabindex = scrollable ? '0' : null;
  // },

  methods: {
    /**
     * @param a
     * @param b
     * @param {boolean} isAscending
     * @return {number}
     */
    defaultComparisonFn(a, b, isAscending) {
      const { localSortBy } = this;
      const multiplier = isAscending ? 1 : -1;

      const aVal = a[localSortBy];
      const bVal = b[localSortBy];

      const isNumeric = Number.isFinite(aVal) && Number.isFinite(bVal);

      if (isNumeric) {
        return (aVal - bVal) * multiplier;
      }
      if (aVal < bVal) return -1 * multiplier;
      if (aVal > bVal) return 1 * multiplier;
      return 0;
    },

    onSort(key) {
      const { localSortBy, localSortDirection } = this;
      this.localPage = 1;

      if (key !== localSortBy) {
        this.localSortBy = key;
        this.localSortDirection = 'ASC';
        return;
      }

      switch (localSortDirection) {
        case 'ASC':
          this.localSortDirection = 'DESC';
          break;
        case 'DESC':
          this.localSortDirection = '';
          break;
        default:
          this.localSortDirection = 'ASC';
      }
    },

    /**
     * @param page
     * @return {void}
     */
    goToPage(page) {
      const { lastPage } = this;
      this.localPage = Math.min(Math.max(1, page), lastPage);
    },
  },
};
</script>

<style>
.vts-table table {
  width: 100%;
  table-layout: fixed;
}

.vts-table__pagination,
.vts-table__pages {
  display: flex;
}

.vts-table__pagination {
  align-items: center;
  justify-content: center;
}

.vts-table__pages,
.vts-table__page-item {
  display: contents;
  list-style-type: none;
}
/* @media (min-width: 400px) {
  .vts-table {
    display: block;
  }

  .lists-container {
    display: none;
  }
} */
</style>
