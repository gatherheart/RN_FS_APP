import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import getImage from "../../utils/GetImage";

const Image = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
  border-radius: 75px;
`;

const Poster = ({ url }) => {
  return <Image source={{ uri: getImage(url) }}></Image>;
};

Poster.prototype = {};

export default Poster;
