import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export const CustomLink = styled(Link)`
  color: #fff;
  margin: 0 0.5rem 0 0.5rem;
  
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
