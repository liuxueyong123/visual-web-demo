<template>
  <div class="component">
    <div
      class="title"
      :contenteditable="contenteditable"
      @blur="(e) => handleElementBlur('title', e)"
      v-html="componentData.title"
    ></div>
    <p
      :contenteditable="contenteditable"
      @blur="(e) => handleElementBlur('desc', e)"
      v-html="componentData.desc"
    ></p>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { ComponentList, ComponentSchema, DOMEvent } from '@/model';
import { Component, Prop, Vue } from 'vue-property-decorator';

interface ComponentProps {
  title: string
  desc: string
}

const defaultProps: ComponentProps = {
  title: '22222',
  desc: 'this is component2\'s desc',
};

@Component
export default class Component2 extends Vue {
  @Prop({ default: defaultProps })
  componentData!: ComponentProps;

  contenteditable = true;

  handleElementBlur(attr: keyof ComponentProps, event: DOMEvent<HTMLElement>) {
    this.componentData[attr] = event.target.innerHTML;
  }
}

export const schema: ComponentSchema = {
  component: ComponentList.component2,
  key: '组件二',
  name: '组件二',
  data: {
    ...defaultProps,
  },
};
</script>

<style scoped lang="scss">
.component {
  height: 100px;
  text-align: center;
}
</style>
