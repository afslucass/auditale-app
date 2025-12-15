import React, { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  SelectButton,
  SelectButtonText,
  ArrowIcon,
  ModalContainer,
  ModalContent,
  OptionButton,
  OptionText,
  ModalTitle,
} from "./SelectDropdown.styles";
import { COLORS } from "../../constants/colors/colors";

type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const SelectDropdown = ({ label, options, value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <>
      <SelectButton onPress={() => setOpen(true)}>
        <SelectButtonText>{value || label}</SelectButtonText>
        <ArrowIcon>
          <Ionicons name="chevron-down" size={18} color={COLORS.WHITE} />
        </ArrowIcon>
      </SelectButton>
      <Modal transparent visible={open} animationType="fade">
        <ModalContainer>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setOpen(false)}
          />
          <ModalContent>
            <ModalTitle>{label}</ModalTitle>
            {options.map((option) => (
              <OptionButton key={option} onPress={() => handleSelect(option)}>
                <OptionText>{option}</OptionText>
              </OptionButton>
            ))}
          </ModalContent>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setOpen(false)}
          />
        </ModalContainer>
      </Modal>
    </>
  );
};

export default SelectDropdown;
