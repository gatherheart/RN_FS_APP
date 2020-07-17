import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import { GiftedChat, Send } from "react-native-gifted-chat";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSystemMessage,
  renderScrollToBottom,
} from "./InputToolBar";
import renderDay from "./RenderDay";
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
import { BottomSafeAreaHeight } from "../../utils/HeaderHeight";
import {
  renderMessage,
  renderCustomView,
  renderBubble,
  renderAvatar,
  renderUsername,
  renderTime,
} from "./MessageContainer";
const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: "100%",
    marginRight: 10,
    borderWidth: 1,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: "cover",
  },
  listViewStyle: {},
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: {},
  container: {
    flex: 1,
    paddingBottom: getBottomSpace(),
    backgroundColor: "white",
  },
});

export default class App extends Component {
  state = {
    messages: [],
  };
  changeImage = (test) => {
    this.setState({ image: test }, () => {
      console.log("Hello World");
    });
  };

  renderMessageImage(props) {
    console.log(props.currentMessage.image);
    const images = [
      {
        // Simplest usage.
        url: props.currentMessage.image,
        // You can pass props to <Image />.
        props: {
          // headers: ...
        },
      },
      {
        props: {
          // Or you can set source directory.
          source: require("../../assets/imgs/android.png"),
        },
      },
    ];
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(props.currentMessage.image);
        }}
      >
        <Image
          source={{ uri: props.currentMessage.image }}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  }

  renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Ionicons name={"ios-arrow-forward"} size={25}></Ionicons>
        </View>
      </Send>
    );
  };
  renderCustomView = (props) => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[styles.mapView]}
            region={{
              latitude: props.currentMessage.location.latitude,
              longitude: props.currentMessage.location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <MapView.Marker
              coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude,
              }}
            />
          </MapView>
        </View>
      );
    }
    return null;
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  UNSAFE_componentWillMount() {
    if (!this.state.messages.length) {
      this.setState({
        messages: [
          {
            _id: Math.round(Math.random() * 1000000),
            text: "0 message",
            createdAt: new Date(),
            system: true,
          },
        ],
      });
    }
    this.setState({
      messages: [
        {
          _id: Math.round(Math.random() * 1000000),
          text: "#awesome",
          createdAt: new Date(
            new Date().setMinutes(new Date().getMinutes() - 1)
          ),
          user: {
            _id: 1,
            name: "Developer",
          },
        },

        {
          _id: Math.round(Math.random() * 1000000),
          text: "",
          createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
          user: {
            _id: 2,
            name: "김현우",
          },
          image:
            "https://images.unsplash.com/photo-1588785392665-f6d4a541417d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
          sent: true,
          received: true,
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "안뇽",
          createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
          user: {
            _id: 2,
            name: "김현우",
          },
          image: undefined,
          sent: true,
          received: true,
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "Send me a picture!",
          createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
          user: {
            _id: 1,
            name: "Developer",
          },
        },

        {
          _id: Math.round(Math.random() * 1000000),
          text: "Where are you?",
          createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
          user: {
            _id: 1,
            name: "Developer",
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "Yes, and I use Gifted Chat!",
          createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
          user: {
            _id: 2,
            name: "김현우",
          },
          sent: true,
          received: true,
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "Are you building a chat app?",
          createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
          user: {
            _id: 1,
            name: "Developer",
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "You are officially rocking GiftedChat.",
          createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    console.log(messages);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  get _listViewProps() {
    return {
      style: styles.listViewStyle,
      contentContainerStyle: styles.contentContainerStyle,
    };
  }
  //  https://stackoverflow.com/a/54550286/1458375
  render() {
    return (
      <>
        {this.state.messages.length === 0 && (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                bottom: 50,
              },
            ]}
          >
            <Image
              source={{ uri: "https://i.stack.imgur.com/qLdPt.png" }}
              style={{
                ...StyleSheet.absoluteFillObject,
                resizeMode: "contain",
              }}
            />
          </View>
        )}
        <View style={styles.container}>
          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            wrapInSafeArea={false}
            bottomOffset={getBottomSpace()}
            scrollToBottom
            scrollToBottomComponent={renderScrollToBottom}
            renderSystemMessage={renderSystemMessage}
            renderMessage={renderMessage}
            onPressAvatar={console.log}
            renderCustomView={this.renderCustomView}
            renderMessageImage={this.renderMessageImage}
            renderBubble={renderBubble}
            messagesContainerStyle={{ backgroundColor: "white" }}
            user={{
              _id: 1,
              name: "Developers",
              avatar: "https://placeimg.com/150/150/any",
            }}
            renderUsername={renderUsername}
            renderComposer={renderComposer}
            renderSend={this.renderSend}
            renderInputToolbar={renderInputToolbar}
            renderActions={renderActions(this.changeImage)}
            listViewProps={this._listViewProps}
            renderTime={renderTime}
            renderDay={renderDay}
            renderCustomView={renderCustomView}
            renderAvatar={renderAvatar}
            renderAvatarOnTop={true}
            parsePatterns={(linkStyle) => {
              return [
                {
                  pattern: /#(\w+)/,
                  style: { ...linkStyle[0], color: "lightgreen" },
                  onPress: (props) => alert(`press on ${props}`),
                },
              ];
            }}
          />
        </View>
      </>
    );
  }
}
