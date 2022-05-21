import { ReactNode } from 'react';
import { css } from '../styles/stitches.config';

interface Props {
  as: React.ElementType;
  children?: ReactNode;
  id?: string;
}

const VisuallyHiddenStyle = css({
  border: '0 !important',
  clip: 'rect(1px 1px 1px 1px ) !important',
  clipPath: 'inset(50%) !important',
  height: '1px !important',
  margin: '-1px !important',
  overflow: 'hidden !important',
  padding: '0 !important',
  position: 'absolute !important',
  width: '1px !important',
  whiteSpace: 'nowrap !important',
});

const VisuallyHidden = ({ as: Component, ...props }: Props) => {
  return (
    <Component {...props} css={VisuallyHiddenStyle()}>
      {props.children}
    </Component>
  );
};
export default VisuallyHidden;
