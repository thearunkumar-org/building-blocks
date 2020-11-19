import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { IContainerElementProps } from '../interfaces';
import styled from 'styled-components';

const StyledContainer = styled.div`
  position: absolute;
  &.active-element {
    border: 1px solid RED;
  }
`;

export const ContainerElement: React.FC<IContainerElementProps> = ({
  active,
  children,
  styles,
  identifier,
  onElementClick,
  onElementUpdate,
}: IContainerElementProps) => {
  const [position, setPosition] = useState({
    x: Number(styles?.left?.split('px').join('') || 0),
    y: Number(styles?.top?.split('px').join('') || 0),
  });

  const onDrag = (event: any, data: any) => {
    setPosition({
      x: data.x,
      y: data.y,
    });
  };

  const onStop = (event: any, data: any) => {
    onElementUpdate?.(identifier, 'style', {
      left: data.x + 'px',
      top: data.y + 'px',
    });
  };
  return (
    <Draggable
      bounds="parent"
      position={{ x: position.x, y: position.y }}
      onStart={() => {}}
      onDrag={onDrag}
      onStop={onStop}
    >
      <StyledContainer
        className={active ? 'active-element' : ''}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onElementClick?.(identifier);
        }}
        id={identifier}
        style={{ position: 'absolute' }}
      >
        {children}
      </StyledContainer>
    </Draggable>
  );
};
