import styled from "styled-components";
import { useState } from "react";
import { ButtonSettings, ButtonTypes } from "../types";

type Theme = {
  defaultColor: string;
  hover: string
}

type Props = {
  buttonType: ButtonTypes
  active: boolean
}
const theme: Record<ButtonTypes, Theme> = {
  [ButtonTypes.Wall]: {
    defaultColor: "#F4A261",
    hover: "#F18934",
  },
  [ButtonTypes.Start]: {
    defaultColor: "#E76F51",
    hover: "#E24E29",
  },
  [ButtonTypes.End]: {
    defaultColor: "#E9C46A",
    hover: "#E2B43E",
  },
  [ButtonTypes.Reset]: {
    defaultColor: "#00CECB",
    hover: "#00AFAC",
  },
};

const Button = styled.button`
  background-color: ${(props: Props) => theme[props.buttonType].defaultColor};
  color: white;
  padding: 2px 15px;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  text-transform: uppercase;
  margin: 5px 5px 0px;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props: Props) => theme[props.buttonType].hover};
  }
  &:disabled {
    cursor: pointer;
    opacity = .7;
    background-color: black;
  }
`;

/*
Button.defaultProps = {
  theme: "Wall",
};
*/

const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) => active && `opacity:1`};
`;
//const types = ["Wall", "Start", "End"];

type ButtonToggleGroupProps = {
  onClick: (buttonType: ButtonTypes) => void;
  buttonSettings: Record<ButtonTypes, ButtonSettings>
}
export default function ButtonToggleGroup({ onClick, buttonSettings }: ButtonToggleGroupProps) {
  const [active, setActive] = useState(ButtonTypes.Wall);
  return (
    <div>
      {Object.keys(ButtonTypes).map((type) => (
        <ButtonToggle
          disabled={!buttonSettings[type as ButtonTypes].enabled}
          key={type}
          id={type}
          active={active === type}
          buttonType={type as ButtonTypes}
          onClick={(e) => {
            console.log(type);
            setActive(type as ButtonTypes);
            onClick(type as ButtonTypes);
          }}
        >
          {type}
        </ButtonToggle>
      ))}
    </div>
  );
}
