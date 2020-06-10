import React, { useState, useRef } from "react";
import { Image, Platform, Dimensions, SafeAreaView } from "react-native";
import styled from "styled-components";
import { Ionicons, Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { ScrollView } from "react-native-gesture-handler";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { Text } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View`
  margin-bottom: 40px;
  border-width: 1px;
  background-color: ${(props) => props.theme.backgroundColor};
`;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const UserProfile = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View`
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
`;
const InfoContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.Text`
  font-weight: 500;
`;
const Body = styled.Text`
  margin: 10px 0px;
`;
const BodyContainer = styled.View`
  margin: 10px 10px;
`;

const DateContainer = styled.View``;
const ImageContainer = styled.View``;

const PostPresenter = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  title,
  body,
  comments = [],
  isLiked: isLikedProp,
  createdAt,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const _menu = useRef();
  /** 
  const toggleLikeMutaton = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });

*/

  const hideMenu = () => {
    _menu.current.hide();
  };

  const showMenu = () => {
    _menu.current.show();
  };
  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount((l) => l - 1);
    } else {
      setLikeCount((l) => l + 1);
    }
    setIsLiked((p) => !p);
    try {
      //await toggleLikeMutaton();
    } catch (e) {}
  };
  return (
    <SafeAreaView>
      <Container>
        <Header>
          <UserProfile>
            <Touchable
              onPress={() => {
                //navigation.navigate("UserDetail", { username: user.username })
              }}
            >
              <Image
                style={{ height: 40, width: 40, borderRadius: 20 }}
                source={{ uri: user.avatar }}
              />
            </Touchable>
            <Touchable
              onPress={() => {
                //navigation.navigate("UserDetail", { username: user.username })
              }}
            >
              <HeaderUserContainer>
                <Bold>{user.username}</Bold>
                <Location>{location}</Location>
              </HeaderUserContainer>
            </Touchable>
          </UserProfile>
          <Menu
            ref={_menu}
            button={
              <IconContainer>
                <Feather
                  name={"more-vertical"}
                  size={20}
                  onPress={showMenu}
                ></Feather>
              </IconContainer>
            }
          >
            <MenuItem style={{ backgroundColor: "white" }} onPress={hideMenu}>
              Menu item 1
            </MenuItem>
            <MenuDivider />
            <MenuItem style={{ backgroundColor: "white" }} onPress={hideMenu}>
              Menu item 2
            </MenuItem>
          </Menu>
        </Header>
        <ImageContainer style={{ width: WIDTH, height: HEIGHT / 2.5 }}>
          <ScrollView
            horizontal={true}
            showsPagination={false}
            scrollEnabled={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={{ height: HEIGHT / 2.5 }}
          >
            {files.map((file, index) => {
              return (
                <Image
                  style={{ width: WIDTH, height: HEIGHT / 2.5 }}
                  key={file.id}
                  source={{ uri: file.uri }}
                />
              );
            })}
          </ScrollView>
        </ImageContainer>

        <InfoContainer>
          <IconsContainer>
            <Touchable onPress={handleLike}>
              <IconContainer>
                <Ionicons
                  size={24}
                  color={isLiked ? "red" : "black"}
                  name={
                    Platform.OS === "ios"
                      ? isLiked
                        ? "ios-heart"
                        : "ios-heart-empty"
                      : isLiked
                      ? "md-heart"
                      : "md-heart-empty"
                  }
                />
                <Bold style={{ marginLeft: 7 }}>{likeCount}</Bold>
              </IconContainer>
            </Touchable>
            <Touchable>
              <IconContainer>
                <Ionicons
                  color={"black"}
                  size={24}
                  name={Platform.OS === "ios" ? "ios-text" : "md-text"}
                />
                <Bold style={{ marginLeft: 7 }}>{comments.length}</Bold>
              </IconContainer>
            </Touchable>
          </IconsContainer>
          <DateContainer>
            <Location style={{ marginRight: 10, marginBottom: 3 }}>
              {createdAt}
            </Location>
          </DateContainer>
        </InfoContainer>
        <BodyContainer>
          <Title>{title}</Title>
          <Body>{body}</Body>
        </BodyContainer>
      </Container>
    </SafeAreaView>
  );
};

PostPresenter.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default PostPresenter;
