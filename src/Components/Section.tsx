import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-left: 50px;
  padding-right: 50px;

  padding-top: 30px;
  margin-top: 60px;
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Title = styled.div`
  padding-left: 12px;

  font-size: 18px;
  font-weight: 600;
  line-height: 6px;
  position: relative;
  z-index: 0;
`;

const Dot = styled.div`
  position: absolute;
  height: 7px;
  width: 7px;
  border-radius: 7px;
  top: -4px;
  bottom: 0;
  left: -2px;
  background: #35b48b;
  opacity: 0.8;
  z-index: -1;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

type Props = {
  title: string;
  children: any;
};

const Section = ({ title, children }: Props) => (
  <Container>
    <Title>
      {title}
      <Dot />
    </Title>
    <Grid>{children}</Grid>
  </Container>
);

export default Section;
