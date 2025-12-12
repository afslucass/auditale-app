import styled from "styled-components/native";
import { COLORS } from "../../constants/colors/colors";
import { getFont } from "../../helpers/getFont";

export const Container = styled.View`
  width: 100%;
  padding: 0px 20px;
  margin-top: 30px;
`;

export const SelectRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
  gap: 10px;
`;
