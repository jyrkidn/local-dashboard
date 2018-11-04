<template>
  <div class="list-group">
    <div class="list-group-item" v-for="(item, key) in items" :key="key">
      <b>
        <slot name="title" :item="item"></slot>
      </b>
      <span>
        <slot name="info" :item="item"></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: [ 'items' ]
}
</script>

<style lang="scss" scoped>
.list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;

  .list-group-item {
    position: relative;
    padding: .75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);

    display: flex;
    justify-content: space-between;

    b {
      margin: 0;
    }

    span {
      text-align: right;
    }
  }
}
</style>
