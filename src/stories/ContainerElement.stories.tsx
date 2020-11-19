import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ContainerElement } from '../elements/ContainerElement';
import { IContainerElementProps } from '../interfaces/';
import { TitleElement } from '../elements/TitleElement';

export default {
  title: 'ContainerElement',
  component: ContainerElement,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IContainerElementProps> = (args) => (
  <div style={{ height: '1000px' }}>
    <ContainerElement {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  children: <TitleElement identifier="1" active={true} display="Heading 1" />,
};
