<template>
  <vuep :template="code" />
</template>

<script>
export default {
  name: 'CodePreview',
  created() {
    /* eslint-disable no-useless-escape */
    this.code = `
      <template>
        <div>Hello, {{ name }}!</div>
      </template>

      <script>
        module.exports = {
          data: function () {
            return { name: 'Vue' }
          }
        }
      <\/script>
    `;
    /* eslint-enable no-useless-escape */
  }
};
</script>
