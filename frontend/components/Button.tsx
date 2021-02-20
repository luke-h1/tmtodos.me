import styled from '@emotion/styled';

export const SignUpButton = styled.button`
  background: #f26a2e;
  white-space: nowrap;
  color: #000;
  height: 50%;
  margin: 15px 0 15px 0;
  padding: 0.74rem;
  font-size: 16px;
  outline: 0;
  border-radius: 8px;
  border: none;
  min-width: 100px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s !important;
  &:hover {
    background: #077bf1;
    transform: translateY(-2px);
  }
`;


export const SignInButton = styled.button`
  background: #119DA4;
  white-space: nowrap;
  color: #000;
  /* height: 50%; */
  margin: 15px 0 15px 0;
  padding: 0.44rem;
  font-size: 16px;
  outline: 0;
  border-radius: 8px;
  border: none;
  min-width: 90px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s !important;
  &:hover {
    background: #5F4BB6;
    transform: translateY(-2px);
  }
`;
