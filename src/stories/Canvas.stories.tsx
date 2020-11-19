import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ContainerElement } from '../elements/ContainerElement';
import { IContainerElementProps } from '../interfaces/';
import { Canvas } from '../canvas';
import { TitleElement } from '../elements/TitleElement';
import { SubtitleElement } from '../elements/SubtitleElement';
import { ParagraphElement } from '../elements/ParagraphElement';

export default {
  title: 'Canvas',
  component: ContainerElement,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const getTitle = (): JSX.Element => {
  return <TitleElement identifier="1" active={true} display="Heading 1" />;
};

const getSubTitle = (): JSX.Element => {
  return <SubtitleElement identifier="2" active={true} display="Subtitle 1" />;
};

const getParagraph = (): JSX.Element => {
  return (
    <ParagraphElement identifier="3" active={true} display="Paragraph 1" />
  );
};

const getElements = () => {
  const arr: Array<JSX.Element> = [getTitle(), getSubTitle(), getParagraph()];
  return arr;
};

const Template: Story<IContainerElementProps> = (args) => (
  <div>
    <Canvas
      elements={getElements()}
      styles={{ background: 'GREEN' }}
      onCanvasClick={() => {}}
    />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
