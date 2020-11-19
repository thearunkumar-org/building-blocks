import React, { useState } from 'react';
import styled from 'styled-components';
import { PickerSidebar } from './';
import { Canvas } from './Canvas';
import { TitleElement, SubtitleElement, ParagraphElement } from '../elements';
import { UsableStylesAttributes } from '../enums';
import { EditElement } from './EditElement';
import * as Config from './config.json';

const StyledMain = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ELEMENTS_MAP: any = {
  title: TitleElement,
  'sub-title': SubtitleElement,
  paragraph: ParagraphElement,
};

const getElementsBasedonSelections = (
  selections: Record<string, ISelections>,
  onElementClick: (identifier: string) => void,
  onElementUpdate?: (
    identifier: string,
    type: 'style',
    diff: Record<string, string>
  ) => void,
  activeElement?: ISelections
) => {
  return Object.values(selections).map((selection: ISelections) => {
    if (selection.identifier === 'canvas') {
      return null;
    }
    const Element = ELEMENTS_MAP[selection.type];
    let styles: any = {
      ...(selection.styles || {}),
    };
    delete styles['position'];
    return (
      <Element
        active={activeElement?.identifier === selection.identifier}
        identifier={selection.identifier}
        styles={styles}
        display={selection.display}
        onElementClick={onElementClick}
        onElementUpdate={onElementUpdate}
      />
    );
  });
};

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/pdf',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.blob(); // parses JSON response into native JavaScript objects
}

var downloadFile = (url: string, fileName: string) => {
  var link = document.createElement('a');
  // create a blobURI pointing to our Blob
  link.href = url;
  link.download = fileName;
  // some browser needs the anchor to be in the doc
  document.body.append(link);
  link.click();
  link.remove();
  // in case the Blob uses a lot of memory
  setTimeout(() => URL.revokeObjectURL(link.href), 7000);
};

const handlePdf = () => {
  postData('http://localhost:3000')
    .then((myBlob) => {
      downloadFile(URL.createObjectURL(myBlob), 'resume.pdf');
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    });
};

export const saveAsJSON = (selections: Record<string, ISelections>) => {
  console.log(selections);
  console.log(JSON.stringify(selections));
};

export interface ISelections {
  type: string;
  identifier: string;
  display: string;
  styles?: Partial<Record<UsableStylesAttributes, string>>;
}

const CURRENT_SELECTIONS: any = {};

const getLastUsedIndex = (selection: string): number => {
  return CURRENT_SELECTIONS[selection] || -1;
};

const getSelectionInformation = (
  selection: string,
  selections: Record<string, ISelections>
): Record<string, ISelections> => {
  if (getLastUsedIndex(selection) === -1) {
    CURRENT_SELECTIONS[selection] = 0;
  }
  const index = ++CURRENT_SELECTIONS[selection];
  const identifier = `${selection}_${index}`;
  console.log(Config.defaults);
  const defaults: Omit<ISelections, 'identifier'> = Config.defaults.filter(
    (element) => element.type === selection
  )[0];

  const styles = { ...(defaults?.styles || {}) };

  if (index > 1) {
    const prev = selections[`${selection}_${index - 1}`];
    const prevTop = Number(prev?.styles?.top?.split('px').join('') || 0);
    const prevLeft = Number(prev?.styles?.left?.split('px').join('') || 0);
    styles['top'] =
      (prevTop + Number(prev?.styles?.height?.split('px').join('') || 30) ||
        0) + 'px';
    styles['left'] = (prevLeft || 0) + 'px';
  }

  return {
    [identifier]: {
      type: selection,
      identifier,
      display: defaults?.display,
      styles: {
        ...styles,
      },
    },
  };
};

export const Main = () => {
  const [selections, setSelections] = useState<Record<string, ISelections>>({
    canvas: {
      display: '',
      identifier: 'canvas',
      type: 'canvas',
      styles: {
        border: '1px solid GREY',
        position: 'absolute',
        background: 'GREEN',
        width: '595px',
        height: '842px',
      },
    },
  });
  const [activeElement, setActiveElement] = useState<string>('canvas');

  const handleElementAdd = (selection: string) => {
    setSelections({
      ...selections,
      ...getSelectionInformation(selection, selections),
    });
  };

  const handleElementClick = (identifier: string) => {
    if (selections[identifier]) {
      setActiveElement(identifier);
      handleElementUpdate(identifier, 'style', {
        position: 'absolute',
      });
    }
  };

  const handleElementUpdate = (
    identifier: string,
    type: 'display' | 'style',
    diff: Record<string, string>
  ) => {
    console.log(identifier, type, diff);
    if (type === 'display') {
      setSelections({
        ...selections,
        [identifier]: {
          ...selections[identifier],
          display: diff.value,
        },
      });
    } else if (type === 'style') {
      setSelections({
        ...selections,
        [identifier]: {
          ...(selections[identifier] || {}),
          styles: {
            ...(selections[identifier].styles || {}),
            ...diff,
          },
        },
      });
    }
  };

  return (
    <StyledMain>
      <PickerSidebar onElementAdd={handleElementAdd} />
      <Canvas
        styles={selections['canvas'].styles}
        elements={getElementsBasedonSelections(
          selections,
          handleElementClick,
          handleElementUpdate,
          selections[activeElement]
        )}
        onCanvasClick={handleElementClick.bind(null, 'canvas')}
      />
      <button onClick={saveAsJSON.bind(null, selections)}>Save</button>
      <EditElement
        element={selections[activeElement]}
        onElementUpdate={handleElementUpdate}
      />
    </StyledMain>
  );
};
