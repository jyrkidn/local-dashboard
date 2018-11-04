<template>
  <div class="grid-item">
    <div v-if="link || logo || title" class="item-header">
      <a v-if="link && logo" :href="link" target="_blank">
        <img alt="Logo" :src="logo">
      </a>
      <img v-else-if="logo" :src="logo" alt="Logo">

      <h2 v-if="title">{{ title }}</h2>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: [ 'logo', 'link', 'title' ]
}
</script>

<style lang="scss" scoped>
.item-header {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;

  img {
    height: 64px;
  }

  h2 {
    text-align: center;
    width: 100%;
  }
}
</style>
