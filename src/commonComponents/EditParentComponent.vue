<template>
  <div class='edit-parent-component'>
    <div @click="addLink('title')">add Link</div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class EditParentComponent extends Vue {}
</script>

<style lang='scss' scoped>

</style>
