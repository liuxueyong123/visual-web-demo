/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
export enum ComponentList {
  component1 = 'Component1',
  component2 = 'Component2',
  component3 = 'Component3'
}

export interface ComponentSchema {
  component: ComponentList; // 组件名
  name: string; // 自定义的组件名称
  data: Record<string, string | Array<any>>; // 组件数据
}

export interface ComponentSchemaWithKey extends ComponentSchema {
  key: string; // key值
}

export interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T
}
