import { styled } from "styled-components"

export const StyledHeader = styled.header`
  div {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  div + div {
    display: flex;
    justify-content: flex-end;
  }
`
