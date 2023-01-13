import React from 'react';
import styled from 'styled-components';

type Props = {
  text: String;
};
const EmptyResult = (props: Props) => {
  const { text } = props;
  return <Wrapper>{text}</Wrapper>;
};

export default EmptyResult;

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  color: #555;
`;
