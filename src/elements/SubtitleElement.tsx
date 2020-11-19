import React from 'react';
import { IBaseElement } from '../interfaces';
import { UsableStylesAttributes } from '../enums';
import { ContainerElement } from './ContainerElement';

const DEFAULT_TITLE_STYLES: Partial<Record<UsableStylesAttributes, string>> = {
  'font-size': '2rem',
  color: '#000',
};

export const SubtitleElement: React.FC<IBaseElement> = ({
  active,
  identifier,
  type,
  styles,
  display,
  onElementClick,
  onElementUpdate,
}: IBaseElement) => {
  const titleStyles = {
    ...DEFAULT_TITLE_STYLES,
    ...styles,
  };
  return (
    <ContainerElement
      active={active}
      identifier={identifier}
      type={type}
      styles={styles}
      onElementClick={onElementClick}
      onElementUpdate={onElementUpdate}
    >
      <div
        style={titleStyles}
        dangerouslySetInnerHTML={{ __html: display.split('\n').join('<br />') }}
      />
    </ContainerElement>
  );
};
