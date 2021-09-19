import Link from 'next/link';
import styled from '@emotion/styled';

export const CustomLink = styled(Link)`
  color: #000;
  margin: 0 0.5rem 0 0.5rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const NavItem = styled.a`
  color: #000;
  margin: 0 0.5rem 0 0.5rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
