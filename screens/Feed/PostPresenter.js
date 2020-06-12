import React, { useState, useRef, useContext } from "react";
import { Image, Platform, Dimensions, ScrollView } from "react-native";
import styled, { ThemeContext } from "styled-components";
import { Ionicons, Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { Text } from "react-native";
import {
  StatusHeight,
  UnderHeader,
  HeaderHeight,
} from "../../utils/HeaderHeight";
import Post from "../../components/common/Post";
import CustomHeader from "../../components/common/CustomHeader";
import { diffTime } from "../../utils/DateFormat";
import { TextInput } from "react-native-gesture-handler";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const unitConvert = { week: "주", day: "일", minute: "분", hour: "시간" };
export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View`
  border-width: 1px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const CommentContainer = styled.View`
  border-width: 1px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Header = styled.View`
  border-width: 1px;
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const UserProfile = styled.View`
  margin-top: 13px;
  flex-direction: row;
`;

const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: ${(WIDTH * 80) / 100}px;
`;

const SmallRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: ${(WIDTH * 70) / 100}px;
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
const FixedContainer = styled.View`
  position: absolute;
  border-width: 1px;
  height: ${(HEIGHT * 10) / 100}px;
  width: ${WIDTH}px;
  bottom: 0;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const EmptySpace = styled.View`
  height: ${(HEIGHT * 10) / 100}px;
`;

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
  const [_comment, setComment] = useState("");

  const themeContext = useContext(ThemeContext);
  const _menu = useRef();
  /** 
  const toggleLikeMutaton = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });

*/
  const onChangeComment = (text) => {
    setComment(text);
  };
  const onSubmitComment = () => {
    if (_comment === "") return;
  };

  return (
    <>
      <CustomHeader></CustomHeader>
      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          marginTop: HeaderHeight,
        }}
        contentContainerStyle={{
          fontFamily: themeContext.regularFont,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Post
          id={id}
          user={user}
          location={location}
          files={files}
          title={title}
          body={body}
          comments={comments}
          createdAt={createdAt}
          isLiked={isLiked}
          likeCount={likeCountProp}
        ></Post>
        <Container>
          <Header>
            <Bold>댓글</Bold>
            <Bold
              style={{
                color: themeContext.darkGreenColor,
                marginLeft: 10,
                fontWeight: "600",
              }}
            >
              {comments.length}
            </Bold>
          </Header>
          <CommentContainer>
            {comments.map((comment, idx) => {
              const timeDiff = diffTime(comment.issuedDate);
              return (
                <UserProfile key={`comment-${idx}`}>
                  <Touchable
                    onPress={() => {
                      //navigation.navigate("UserDetail", { username: user.username })
                    }}
                  >
                    <Image
                      style={{ height: 40, width: 40, borderRadius: 20 }}
                      source={{ uri: comment.user.avatar }}
                    />
                  </Touchable>
                  <Touchable
                    onPress={() => {
                      //navigation.navigate("UserDetail", { username: user.username })
                    }}
                  >
                    <HeaderUserContainer style={{ borderWidth: 1 }}>
                      <RowContainer>
                        <Text style={{ marginLeft: 10 }}>
                          <Text style={{ fontWeight: "700" }}>
                            {comment.user.username}
                          </Text>
                          {"  "}
                          {comment.text}
                        </Text>
                      </RowContainer>
                      <RowContainer style={{ marginTop: 5 }}>
                        <Text style={{ marginLeft: 10, opacity: 0.7 }}>{`${
                          timeDiff.time
                        }${unitConvert[timeDiff.unit]} 전`}</Text>
                        <Touchable style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              color: themeContext.lightGreenColor,
                              fontWeight: "700",
                            }}
                          >
                            답글달기
                          </Text>
                        </Touchable>
                      </RowContainer>
                      {/** Reply to a Comment */}
                      {comment.comments.map((reply, index) => {
                        console.log(reply);
                        const replyTimeDiff = diffTime(reply.issuedDate);

                        return (
                          <UserProfile key={`comment-reply-${index}`}>
                            <Touchable
                              onPress={() => {
                                //navigation.navigate("UserDetail", { username: user.username })
                              }}
                            >
                              <Image
                                style={{
                                  height: 30,
                                  width: 30,
                                  borderRadius: 15,
                                }}
                                source={{ uri: reply.user.avatar }}
                              />
                            </Touchable>
                            <Touchable
                              onPress={() => {
                                //navigation.navigate("UserDetail", { username: user.username })
                              }}
                            >
                              <HeaderUserContainer style={{ borderWidth: 1 }}>
                                <SmallRowContainer>
                                  <Text style={{ marginLeft: 10 }}>
                                    <Text style={{ fontWeight: "700" }}>
                                      {reply.user.username}
                                    </Text>
                                    {"  "}
                                    {reply.text}
                                  </Text>
                                </SmallRowContainer>
                                <SmallRowContainer style={{ marginTop: 5 }}>
                                  <Text
                                    style={{ marginLeft: 10, opacity: 0.7 }}
                                  >{`${replyTimeDiff.time}${
                                    unitConvert[replyTimeDiff.unit]
                                  } 전`}</Text>
                                </SmallRowContainer>
                              </HeaderUserContainer>
                            </Touchable>
                          </UserProfile>
                        );
                      })}
                    </HeaderUserContainer>
                  </Touchable>
                </UserProfile>
              );
            })}
          </CommentContainer>
        </Container>
        <EmptySpace></EmptySpace>
      </ScrollView>
      <FixedContainer>
        <TextInput
          value={_comment}
          placeholder={"댓글을 달아주세요"}
          onChangeText={onChangeComment}
          onSubmitEditing={onSubmitComment}
          underlineColorAndroid="transparent"
          returnKeyType="none"
          style={{
            paddingVertical: 0,
            paddingHorizontal: 10,
          }}
          autoCorrect={false}
          scrollEnabled={false}
          autoFocus={false}
          multiline={true}
        ></TextInput>
      </FixedContainer>
    </>
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
