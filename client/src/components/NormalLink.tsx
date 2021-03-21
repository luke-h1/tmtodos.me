import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const NormalLink = styled(Link)`
  color: #000;
  margin: 0 0.5rem 0 0.5rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
