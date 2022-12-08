import styled from "styled-components";
import { useState } from "react";
import { ButtonTypes } from "./../types";

const theme = {
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
  background-color: ${(props) => theme[props.buttonType].defaultColor};
  color: white;
  padding: 2px 15px;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  text-transform: uppercase;
  margin: 5px 5px 0px;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.buttonType].hover};
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

export default function ButtonToggleGroup({ onClick, buttonSettings }) {
  const [active, setActive] = useState(ButtonTypes.Wall);
  return (
    <div>
      {Object.keys(ButtonTypes).map((type) => (
        <ButtonToggle
          disabled={!buttonSettings[type].enabled}
          key={type}
          id={type}
          active={active === type}
          buttonType={type}
          onClick={(e) => {
            console.log(type);
            setActive(type);
            onClick(type);
          }}
        >
          {type}
        </ButtonToggle>
      ))}
    </div>
  );
}
