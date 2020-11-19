import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ContainerElement } from '../elements/ContainerElement';
import { IContainerElementProps } from '../interfaces/';
import { Main } from '../canvas/Main';

export default {
  title: 'Main',
  component: ContainerElement,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IContainerElementProps> = (args) => (
  <div>
    <Main />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
