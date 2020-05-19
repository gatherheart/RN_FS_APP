import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import getImage from "../../utils/GetImage";
import { Animated } from "react-native";

const Image = styled.Image`
  resize-mode: cover;
`;

const Avatar = ({ url, size = "small" }) => {
  const position = new Animated.ValueXY({ x: 0, y: 10 });

  const imageSize = size === "small" ? 47 : 110;
  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      bounciness: 20,
      useNativeDriver: true,
    }).start(() => {});
  }, []);
  return (
    <Animated.Image
      source={{ uri: getImage(url) }}
      style={{
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize,
        transform: [...position.getTranslateTransform()],
      }}
    ></Animated.Image>
  );
};

Avatar.prototype = {
  url: PropTypes.string.isRequired,
};

export default Avatar;
