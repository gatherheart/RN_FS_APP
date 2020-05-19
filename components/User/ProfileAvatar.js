import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import getImage from "../../utils/GetImage";

const Image = styled.Image`
  resize-mode: cover;
`;

const Avatar = ({ url, size = "small" }) => {
  const imageSize = size === "small" ? 47 : 110;
  return (
    <Image
      source={{ uri: getImage(url) }}
      style={{ width: imageSize, height: imageSize, borderRadius: imageSize }}
    ></Image>
  );
};

Avatar.prototype = {};

export default Avatar;
