import React from 'react';
import styled from 'styled-components';
import { UsableStylesAttributes } from '../enums';

const StyledCanvas = styled.div`
  display: flex;
  position: relative;
  width: 595px;
  height: 842px;
`;

const DEFAULT_CANVAS = {
  background: '#fff',
  color: '#000',
};

export interface ICanvasProps {
  elements: Array<JSX.Element | null> | null;
  styles?: Partial<Record<UsableStylesAttributes, string>>;
  onCanvasClick: () => void;
}

export const Canvas = ({ styles, elements, onCanvasClick }: ICanvasProps) => {
  const canvasStyles: any = {
    ...DEFAULT_CANVAS,
    ...styles,
  };
  delete canvasStyles['position'];
  return (
    <StyledCanvas onClick={onCanvasClick} style={{ ...canvasStyles }}>
      {elements}
    </StyledCanvas>
  );
};
