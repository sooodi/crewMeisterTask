import styled from "styled-components";
import tw from "twin.macro";

export const StyledForm = styled.main.attrs({
  className: "flex flex-col justify-start bg-gray-100  ",
})`
  & {
    form {
      ${tw`bg-white text-center rounded py-8 px-8 `}
    }
    input {
      ${tw`border-gray-300 mb-4  border-solid border rounded px-2  py-2`}
    }
  }
`;
export const StyledButton = styled.button`
  border-radius: 3px;
  border-color: " #105b72";
  font-size: 1em;
  margin-top: 20px;
  padding: 0.25em 1em;
  width: 100%;
  &:hover {
    background-color: #105ba2c2;
  }
  color: black;
  border: 1px solid gray;
`;
