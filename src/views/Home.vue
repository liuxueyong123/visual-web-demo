<template>
  <div class="page">
    <div class="sidebar">
      <draggable v-model="schema" @start="drag=true" @end="drag=false">
        <transition-group type="transition" :name="'flip-list'">
          <div v-for="item in schema" :key="item.key" class="item">{{item.name}}</div>
        </transition-group>
      </draggable>

      <select v-model="selectedComponent" class="component-select">
        <option
          v-for="(item, index) in componentSelectList"
          :key="index"
          :value="item"
        >
          {{item.name}}
        </option>
      </select>
      <div class="add-btn" @click="addComponent">+</div>
    </div>
    <div class="container">
      <component
        v-for="item in schema"
        :key="item.key"
        :is="item.component"
        :component-data="item.data"
      ></component>

      <div class="divider-line">Result</div>
      <div class="result">{{JSON.stringify(schema, null, 4)}}</div>
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
/* eslint-disable no-shadow */
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { ComponentList, ComponentSchema } from '@/model';
import Component1, { schema as schema1 } from '@/components/Component1.vue';
import Component2, { schema as schema2 } from '@/components/Component2.vue';
import Component3, { schema as schema3 } from '@/components/Component3.vue';

@Component({
  components: {
    draggable,
    Component1,
    Component2,
    Component3,
  },
})
export default class Home extends Vue {
  drag = true

  selectedComponent = schema1

  componentSelectList: ComponentSchema[] = [
    schema1,
    schema2,
    schema3,
  ]

  schema: ComponentSchema[] = []

  addComponent() {
    const _selectedComponent: ComponentSchema = {
      ...JSON.parse(JSON.stringify(this.selectedComponent)),
      key: `${this.selectedComponent.name}-${Date.now()}`,
    };
    this.schema.push(_selectedComponent);
  }
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.page {
  height: 100%;
  display: flex;
  justify-content: space-between;

  .sidebar {
    flex: 0 0 200px;
    width: 200px;
    height: 100%;
    border-right: 1px solid #ddd;
    padding: 20px 10px 0;

    .item {
      width: 100%;
      height: 30px;
      border: 1px solid #e2e2e2;
      margin-bottom: 8px;
      text-align: center;
      line-height: 30px;
      background: rgb(108, 105, 105, 0.05);
      cursor: move;
    }

    .component-select {
      width: 100%;
      height: 30px;
      margin-top: 30px;
      margin-bottom: 10px;
    }

    .add-btn {
      @extend .item;
      cursor: pointer;
    }
  }

  .container {
    width: calc(100% - 201px);
    flex: 0 0 calc(100% - 201px);
    height: 100%;

    .divider-line {
      width: 100%;
      border-top: 1px solid #e2e2e2;
      text-align: center;
      padding-top: 10px;
      margin-top: 50px;
      font-weight: bold;
    }

    .result {
      width: 50%;
      border: 1px solid #e2e2e2;
      padding: 10px 20px;
      margin: 20px auto 0;
      white-space: pre;
    }
  }
}
</style>
