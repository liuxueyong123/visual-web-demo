<template>
  <div class="component">
    <div class="tab-wrapper">
      <draggable
        v-model="componentData.tabList"
        @start="drag=true"
        @end="drag=false"
        :disabled="!contenteditable"
      >
        <transition-group type="transition" :name="'flip-list'" class="tab-content-wrapper">
          <div
            class="tab-item"
            v-for="(item, index) in componentData.tabList"
            :key="item.key"
          >
            <div
              class="edit-item"
              :contenteditable="contenteditable"
              :id="`tab_${index}_${item.key}`"
              @focus="handleTabListFocuse(`tab_${index}_${item.key}`)"
              @blur="(e) => handleTabListBlur(index, 'tab', e)"
              @click="selectTab(item.key)"
              v-html="item.tab"
            ></div>
            <div class="tool-bar" v-if="contenteditable">
              <div class="delete" @click="deleteTab(item.key)">删除</div>
              <div class="move">移动</div>
            </div>
          </div>
        </transition-group>
      </draggable>
      <div class="tab-item add" v-if="contenteditable" @click="addTab">+</div>
    </div>
    <div class="content-wrapper">
      <template v-for="(item, index) in componentData.tabList">
        <div
          class="content-item"
          v-show="item.key === selectedTabKey"
          :key="item.key"
        >
          <div
            class="title"
            :contenteditable="contenteditable"
            :id="`tab_title_${index}_${item.key}`"
            @focus="handleTabListFocuse(`tab_title_${index}_${item.key}`)"
            @blur="(e) => handleTabListBlur(index, 'title', e)"
            v-html="item.title"
          ></div>
          <div
            class="desc"
            :contenteditable="contenteditable"
            :id="`tab_desc_${index}_${item.key}`"
            @focus="handleTabListFocuse(`tab_desc_${index}_${item.key}`)"
            @blur="(e) => handleTabListBlur(index, 'desc', e)"
            v-html="item.desc"
          ></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { ComponentList, ComponentSchema, DOMEvent } from '@/model';
import { selectElementText } from '@/util';

interface TabItem {
  tab: string;
  key: string;
  title: string;
  desc: string;
}

interface ComponentProps {
  title: string
  desc: string
  tabList: TabItem[]
}

const defaultProps: ComponentProps = {
  tabList: [
    {
      tab: '语音社交',
      key: '1',
      title: '语音社交',
      desc: '支持 1v1 通话或群聊功能，频道内用户可自由发言，适用于语音通话、语音群聊、语音聊天室等场景',
    },
    {
      tab: '游戏语音',
      key: '2',
      title: '游戏语音',
      desc: '全球首个支持 Unity 和 Cocos 游戏引擎的实时音视频 SDK，与主流游戏引擎深度兼容。适用于狼人杀、棋牌游戏、枪战游戏、以及 MMORPG 游戏中的团战、小队、指挥等游戏开黑场景',
    },
    {
      tab: '线上 KTV',
      key: '3',
      title: '线上 KTV',
      desc: '频道内用户可通过排麦、点歌、轮唱、抢唱或合唱等形式实现趣味互动，真实还原线下 KTV 场景',
    },
    {
      tab: '语音会议',
      key: '4',
      title: '语音会议',
      desc: '支持语音会议，全球用户畅享高品质流畅会议体验',
    },
  ],
  title: '22222',
  desc: 'this is component2\'s desc',
};

@Component({
  components: {
    draggable,
  },
})
export default class Component2 extends Vue {
  @Prop({ default: defaultProps })
  componentData!: ComponentProps;

  contenteditable = true;

  drag = true

  selectedTabKey = this.componentData.tabList[0].key

  handleTabListBlur(index: number, attr: keyof TabItem, event: DOMEvent<HTMLElement>) {
    if (!this.contenteditable) return;

    this.$set(this.componentData.tabList[index], attr, event.target.innerHTML);
  }

  handleTabListFocuse(id: string) {
    if (!this.contenteditable) return;

    const element = document.getElementById(id);

    if (!element || element.childElementCount > 0) return;
    selectElementText(element);
  }

  addTab() {
    if (!this.contenteditable) return;

    this.componentData.tabList.push({
      tab: '添加tab',
      key: `tab-${Date.now()}`,
      title: '添加标题',
      desc: '添加描述',
    });
  }

  deleteTab(key: string) {
    if (!this.contenteditable) return;

    for (const [index, item] of this.componentData.tabList.entries()) {
      if (item.key === key) {
        this.componentData.tabList.splice(index, 1);
        break;
      }
    }
  }

  selectTab(key: string) {
    this.selectedTabKey = key;
  }
}

export const schema: ComponentSchema = {
  component: ComponentList.component2,
  key: '组件二',
  name: 'tab组件',
  data: {
    ...defaultProps,
  },
};
</script>

<style scoped lang="scss">
.component {
  height: 400px;
  margin-top: 20px;

  .tab-wrapper {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;

    .tab-content-wrapper {
      display: flex;
      justify-content: center;

      .tab-item {
        margin-right: 10px;
        height: 60px;
        padding: 10px;
        position: relative;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          .tool-bar {
            display: block;
          }
        }

        .edit-item {
          cursor: pointer;
          font-size: 22px;
          line-height: 40px;

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

        .tool-bar {
          display: none;
          position: absolute;
          right: -20px;
          top: 0;

          .delete {
            cursor: pointer;
          }

          .move {
            cursor: move;
          }
        }
      }
    }

    .add {
      width: 100px;
      text-align: center;
      margin-top: 10px;
      line-height: 38px;
      height: 40px;
      border: 1px dashed #fc0;
      cursor: pointer;

      &:hover {
        border: 1px solid #fc0;
      }
    }

    // .tab-item {
    //   margin-right: 10px;
    //   padding: 10px;
    //   cursor: pointer;
    //   font-size: 22px;
    //   line-height: 40px;

    //   &:last-child {
    //     margin-right: 0;
    //   }

    //   // &.add {
    //   //   width: 100px;
    //   //   text-align: center;
    //   //   padding-top: 0;
    //   //   padding-bottom: 0;
    //   //   margin-top: 10px;
    //   //   line-height: 38px;
    //   //   height: 40px;
    //   //   border: 1px dashed #fc0;

    //   //   &:hover {
    //   //     border: 1px solid #fc0;
    //   //   }
    //   // }

    //   &[contenteditable=true] {
    //     -webkit-user-modify: read-write-plaintext-only;
    //     outline: none;

    //     &:hover,
    //     &:focus {
    //       outline: 1px solid #e2e2e2;
    //     }

    //     &::selection {
    //       background: #fc0;
    //     }
    //   }
    // }
  }

  .content-wrapper {
    margin-top: 20px;

   .content-item {
      height: 320px;

      .title {
        font-size: 20px;
        line-height: 1.5;
        color: #393f4a;
        text-align: center;
        width: 500px;
        margin: 0 auto;

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
        font-size: 16px;
        line-height: 1.5;
        color: #393f4a;
        width: 500px;
        margin: 0 auto;
        margin-top: 10px;

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
  }
}
</style>
