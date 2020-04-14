import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import getImage from "../utils/GetImage";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 4px;
`;

const Poster = ({ url }) => <Image source={{ uri: getImage(url) }}></Image>;

Poster.prototype = {};

export default Poster;
