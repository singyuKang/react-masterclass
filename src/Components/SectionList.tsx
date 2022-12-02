import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  height: 180px;
  background-size: cover;
  background-color: white;
  border-radius: 4px;
  opacity: 0.8;
  background-position: center center;
  transition: opacity 0.1s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-shadow: #222222 0 0 3px, #fddb3a 0.5px 0 7px, #fddb3a -0.5px 0 7px,
    #fddb3a 0 0.5px 7px, #fddb3a 0 -0.5px 7px;
  color: #eeeeee;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const Year = styled.span`
  font-size: 14px;
  margin-top: 5px;
  color: #eeeeee;
  text-shadow: #111111 0 0 4px;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const Rating = styled.span`
  bottom: 5px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled(motion.div)`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    /* scale: 1.5; */
    ${Image} {
      opacity: 1;
    }
    ${Rating} {
      opacity: 1;
    }
    ${Title} {
      opacity: 1;
    }
    ${Year} {
      opacity: 1;
    }
  }
`;

type Props = {
  id: string;
  imageUrl: string;
  title: string;
  rating: any;
  year: number;
  isMovie: boolean;
};

const SectionList = ({ id, imageUrl, title, rating, year, isMovie }: Props) => {
  return (
    <Link to={`/movie/${id}`} state={{ isMovie: isMovie }}>
      <Container>
        <ImageContainer
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            // scale: 1.1,
            transition: {
              damping: 10,
              delay: 0.1,
            },
            // rotate: [0, 360],
            // borderRadius: ["20%", "50%"],
            // transition: { delay: 0.02 },
          }}
          whileHover={{
            scale: 1.3,
            transition: { type: "spring", stiffness: 400, damping: 10 },
          }}
        >
          <Image bgPhoto={`https://image.tmdb.org/t/p/w300${imageUrl}`}>
            <Title>{title}</Title>
            <Year>{year}</Year>
          </Image>
          {rating ? (
            <Rating>
              <span role="img" aria-label="rating">
                ⭐
              </span>{" "}
              {rating}/10
            </Rating>
          ) : (
            ""
          )}
        </ImageContainer>
      </Container>
    </Link>
  );
};

export default SectionList;
