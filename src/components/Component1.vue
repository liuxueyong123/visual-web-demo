<template>
  <div class="component">
    <div class="outside">
      <div @click="addLink('title')">add Link</div>
      <div
        class="title"
        ref="title"
        :contenteditable="contenteditable"
        @focus="handleElementFocuse('title')"
        @blur="(e) => handleElementBlur('title', e)"
        v-html="componentData.title"
      ></div>
    </div>
    <p
      class="desc"
      ref="desc"
      :contenteditable="contenteditable"
       @focus="handleElementFocuse('desc')"
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
import { selectElementText } from '@/util';

interface ComponentProps {
  title: string
  desc: string
}

const defaultProps: ComponentProps = {
  title: '游戏语音 <a href="https://www.baidu.com" target="_blank">123</a>',
  desc: '全球首个支持 Unity 和 Cocos 游戏引擎的实时音视频 SDK，与主流游戏引擎深度兼容。适用于狼人杀、棋牌游戏、枪战游戏、以及 MMORPG 游戏中的团战、小队、指挥等游戏开黑场景。',
};

@Component({})
export default class Component1 extends Vue {
  @Prop({ default: defaultProps })
  componentData!: ComponentProps;

  contenteditable = true;

  handleElementBlur(attr: keyof ComponentProps, event: DOMEvent<HTMLElement>) {
    if (!this.contenteditable) return;

    this.componentData[attr] = event.target.innerHTML;
  }

  handleElementFocuse(attr: keyof ComponentProps) {
    if (!this.contenteditable) return;

    const element = this.$refs[attr] as Element;
    if (!element || element.childElementCount > 0) return;
    selectElementText(element);
  }

  addLink(attr: keyof ComponentProps) {
    this.componentData[attr] = `${this.componentData[attr]}<a href="https://www.baidu.com">hhh</a>`;
  }
}

export const schema: ComponentSchema = {
  component: ComponentList.component1,
  name: '文案型组件',
  data: {
    ...defaultProps,
  },
};
</script>

<style scoped lang="scss">
.component {
  margin-top: 20px;
  height: 200px;
  padding-top: 20px;

  .title {
    margin: 0 auto;
    color: #393f4a;
    font-size: 24px;
    line-height: 2;
    width: 400px;
    text-align: center;
    position: relative;

    &[contenteditable=true] {
      -webkit-user-modify: read-write-plaintext-only;
      outline: none;

      &:hover,
      &:focus {
        outline: 1px solid #e2e2e2;
      }

      &::selection {
        background: #fc0;
      }
    }
  }

  .desc {
    margin: 0 auto;
    margin-top: 12px;
    color: #393f4a;
    font-size: 16px;
    line-height: 1.8;
    width: 600px;
    position: relative;

    &[contenteditable=true] {
      -webkit-user-modify: read-write-plaintext-only;
      outline: none;

      &:hover,
      &:focus {
        outline: 1px solid #e2e2e2;
      }

      &::selection {
        background: #fc0;
      }
    }
  }
}
</style>
