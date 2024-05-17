import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 800px;

  & > button:nth-of-type(2n) {
    margin: 0 10px;
  }

  & > button:last-of-type {
    margin-right: 0;
  }
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
`;
