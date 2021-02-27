import styled from '@emotion/styled';

export const Button = styled.button`
  background: #077bf1;
  white-space: nowrap;
  color: #fff;
  height: 50%;
  margin: 15px 0 15px 0;
  padding: 0.64rem;
  font-size: 16px;
  outline: 0;
  border-radius: 6px;
  border: none;
  min-width: 100px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s !important;
  &:hover {
    background: #000;
    transform: translateY(-2px);
  }
`;