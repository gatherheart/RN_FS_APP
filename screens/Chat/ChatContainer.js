import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { GiftedChat, Send } from "react-native-gifted-chat";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { renderInputToolbar, renderActions } from "./InputToolBar";

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
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "Developer",
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
          },
          image:
            "https://images.unsplash.com/photo-1588785392665-f6d4a541417d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
          sent: true,
          received: true,
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "Send me a picture!",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "Developer",
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
          },
          sent: true,
          received: true,
          location: {
            latitude: 48.864601,
            longitude: 2.398704,
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "Where are you?",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "Developer",
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "Yes, and I use Gifted Chat!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
          },
          sent: true,
          received: true,
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "Are you building a chat app?",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "Developer",
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "You are officially rocking GiftedChat.",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
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
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderCustomView={this.renderCustomView}
          user={{
            _id: 1,
          }}
          renderSend={this.renderSend}
          renderInputToolbar={renderInputToolbar}
          renderActions={renderActions(this.changeImage)}
          parsePatterns={(linkStyle) => [
            {
              pattern: /#(\w+)/,
              style: { ...linkStyle, color: "lightgreen" },
              onPress: (props) => alert(`press on ${props}`),
            },
          ]}
        />
      </>
    );
  }
}
