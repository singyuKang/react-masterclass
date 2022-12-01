import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
  /* background-color: black; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  height: 150px;
  width: 75px;
  background-size: cover;
  background-color: black;
  border-radius: 4px;
  opacity: 0.8;
  background-position: center center;
  transition: opacity 0.1s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.span<{ noImage: boolean }>`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-shadow: #222222 0 0 3px, #fddb3a 0.5px 0 7px, #fddb3a -0.5px 0 7px,
    #fddb3a 0 0.5px 7px, #fddb3a 0 -0.5px 7px;
  color: #eeeeee;
  opacity: ${(props) => (props.noImage ? 1 : 0)};
  transition: opacity 0.1s linear;
`;

const Department = styled.span<{ noImage: boolean }>`
  font-size: 14px;
  margin-top: 5px;
  color: #eeeeee;
  text-shadow: #111111 0 0 4px;
  opacity: ${(props) => (props.noImage ? 1 : 0)};
  transition: opacity 0.1s linear;
`;
const ImageContainer = styled(motion.div)`
  /* width: 200px; */
  /* height: 300px; */
  /* background-color: black; */
  margin-bottom: 5px;
  /* position: relative; */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    /* scale: 1.5; */
    ${Image} {
      opacity: 1;
    }
    ${Title} {
      opacity: 1;
    }
    ${Department} {
      opacity: 1;
    }
  }
`;

type Props = {
  //   id: string;
  imageUrl: string;
  known_for_department: string;
  //   title: string;
  name: string;
  //   rating: any;
  //   year: number;
  //   isMovie: boolean;
};

const CreditList = ({ imageUrl, name, known_for_department }: Props) => {
  //   console.log("🚀 ~ file: CreditList.tsx:84 ~ CreditList ~ id", id);
  return (
    <Container>
      <ImageContainer>
        <Image bgPhoto={`https://image.tmdb.org/t/p/w300${imageUrl}`}>
          <Title {...(imageUrl ? { noImage: false } : { noImage: true })}>
            {name}
          </Title>
          <Department {...(imageUrl ? { noImage: false } : { noImage: true })}>
            {known_for_department}
          </Department>
        </Image>
      </ImageContainer>
    </Container>
  );
};

export default CreditList;
