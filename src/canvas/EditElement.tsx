import React from 'react';
import { ISelections } from './Main';
import styled from 'styled-components';
import { UsableStylesAttributes } from '../enums';
import { CompactPicker } from 'react-color';

const StyledEditElement = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
`;

const StyledElement = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export interface IEditElementProps {
  element?: ISelections;
  onElementUpdate: (
    identifier: string,
    type: 'display' | 'style',
    diff: Record<string, string>
  ) => void;
}

const renderStyleElement = (
  style: UsableStylesAttributes,
  onChange: (styleType: string, value: string) => void,
  existing?: Partial<Record<UsableStylesAttributes, string>>
) => {
  switch (style) {
    case UsableStylesAttributes.BACKGROUND:
    case UsableStylesAttributes.COLOR:
      return (
        <CompactPicker
          color={existing?.[style]}
          onChange={(color) => {
            onChange(style, color.hex);
          }}
        />
      );
    case UsableStylesAttributes.FONT_FAMILY:
      return (
        <select
          onChange={(event) => {
            onChange(style, event.target.value);
          }}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Segoe UI">Segoe UI</option>
          <option value="Opan Sans">Opan Sans</option>
        </select>
      );
    case UsableStylesAttributes.FONT_SIZE:
    case UsableStylesAttributes.HEIGHT:
    case UsableStylesAttributes.WIDTH:
      return (
        <input
          type="number"
          value={existing?.[style]?.split('px')[0]}
          onChange={(event) => {
            onChange(style, event.target.value + 'px');
          }}
        />
      );
  }
};

const renderStyleEditor = (
  style: UsableStylesAttributes,
  onChange: (styleType: string, value: string) => void,
  styles?: Partial<Record<UsableStylesAttributes, string>>
) => {
  return (
    <StyledElement>
      <label>{style.toUpperCase()}: </label>
      {renderStyleElement(style, onChange, styles)}
    </StyledElement>
  );
};

export const EditElement = ({
  element,
  onElementUpdate,
}: IEditElementProps) => {
  return (
    <StyledEditElement>
      {element && (
        <>
          <div>
            <StyledElement>
              <label>Edit Text: </label>
              <textarea
                onChange={(event) => {
                  onElementUpdate(element.identifier, 'display', {
                    value: event.target.value,
                  });
                }}
                value={element.display}
              ></textarea>
            </StyledElement>
          </div>
          <div>
            {Object.values(UsableStylesAttributes).map((style) => {
              return renderStyleEditor(
                style,
                (styleType: string, value: string) => {
                  onElementUpdate(element.identifier, 'style', {
                    [styleType]: value,
                  });
                },
                element.styles
              );
            })}
          </div>
        </>
      )}
    </StyledEditElement>
  );
};
