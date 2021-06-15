/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
export enum ComponentList {
  component1 = 'Component1',
  component2 = 'Component2',
  component3 = 'Component3'
}

export interface ComponentSchema {
  component: ComponentList;
  name: string;
  key: string;
  data: Record<string, any>;
}
