import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

class FacebookTabBar extends React.Component {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={`tab-${tab}-${i}`}
              onPress={() => this.props.goToPage(i)}
              style={styles.tab}
            >
              <View
                name={tab}
                style={{
                  height: "100%",
                  backgroundColor:
                    this.props.activeTab === i
                      ? "rgb(59,89,152)"
                      : "rgb(204,204,204)",
                }}
                ref={(icon) => {
                  this.icons[i] = icon;
                }}
              >
                <Text>{tab}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: "row",
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
});

export default FacebookTabBar;
