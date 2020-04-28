import React from "react";
import { Flex, PseudoBox, Icon } from "minerva-ui";
import { CustomCheckboxContainer, CustomCheckboxInput } from "@reach/checkbox";
import styled from "styled-components";

const VisuallyHidden = styled(PseudoBox)`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
`;

const ControlBox = ({ checked, ...props }) => (
  <PseudoBox
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderStyle="solid"
    borderWidth="1px"
    borderRadius="9999px"
    width="24px"
    height="24px"
    marginRight="8px"
    padding="2px"
    transition="background-color 120ms ease 0s, box-shadow 250ms ease 0s"
    borderColor={checked ? "primary" : "#ecebed"}
    color={checked ? "#fff" : "transparent"}
    backgroundColor={checked ? "primary" : "#fff"}
    cursor="pointer"
    _checked={{
      backgroundColor: "#000",
      // borderColor: 'primary'
    }}
    _focus={{
      borderColor: "#a4cafe",
      boxShadow: "0 0 0 3px rgba(118,169,250,.45)",
      outline: 0,
    }}
    {...props}
  />
);

const CustomCheckbox = (props) => {
  const { children, checked = false, onChange, ...rest } = props;

  return (
    <Flex as="label" alignItems="center">
      <CustomCheckboxContainer
        data-testid="checkbox-container"
        checked={checked}
        onChange={onChange}
      >
        <VisuallyHidden as={CustomCheckboxInput} />
        <ControlBox
          data-testid="control-box"
          tabIndex={0}
          checked={checked}
          {...rest}
        >
          <Icon name="check" stroke="currentColor" color="currentColor" />
        </ControlBox>
        {children}
      </CustomCheckboxContainer>
    </Flex>
  );
};

export default CustomCheckbox;
