import React from 'react';
import styled from 'styled-components';

import * as Config from './config.json';

const StyledPickerSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const getElement = (element: any, onElementAdd: any) => {
  return (
    <div
      style={{ ...element.styles }}
      onClick={onElementAdd.bind(null, element.type)}
    >
      {element.display}
    </div>
  );
};

const getElements = (onElementAdd: Function) => {
  return Config.defaults.map((element) => {
    return getElement(element, onElementAdd);
  });
};

export const PickerSidebar = ({ onElementAdd }: any) => {
  return <StyledPickerSidebar>{getElements(onElementAdd)}</StyledPickerSidebar>;
};
