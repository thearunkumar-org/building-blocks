import { UsableStylesAttributes } from '../enums';

export interface IBaseElement {
  identifier: string;
  type?: string;
  active: boolean;
  display: string;
  styles?: Record<UsableStylesAttributes, string>;
  onElementClick?: (identifier: string) => void;
  onElementUpdate?: (
    identifier: string,
    type: 'style',
    diff: Record<string, string>
  ) => void;
}

export interface IContainerElementProps extends Omit<IBaseElement, 'display'> {
  children: JSX.Element;
}
