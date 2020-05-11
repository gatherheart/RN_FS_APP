import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { getMonth, sortByDate, getYear } from "../../utils/DateFormat";
import styled from "styled-components/native";
import { ACTIVE_COLOR } from "../../constants/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
const { width: WIDHT, height: HEIGHT } = Dimensions.get("screen");

const Year = styled.View``;

const Month = styled.View``;

const DateContainer = styled.View`
  height: 35px;
  justify-content: center;
  background-color: ${(props) => props.theme.moreLightGreyColor};
  opacity: 0.85;
  padding: 0px 0px 0px 20px;
`;

const RowContainer = styled.View`
  height: 45px;
  align-items: center;
  padding: 0px 0px 0px 10px;
  border-bottom-color: ${(props) => props.theme.moreLightGreyColor};
  border-bottom-width: 1px;
  flex-direction: row;
`;

const IconInList = ({ name, size = 20, color, type }) => {
  const typeConvert = { notice: "공지", bill: "수금", vote: "투표" };
  return (
    <View>
      <MaterialCommunityIcons
        size={size}
        name={name}
        color={color || ACTIVE_COLOR}
      ></MaterialCommunityIcons>
      <Text
        style={{
          top: -2,
          textAlign: "center",
          fontSize: 10,
          fontWeight: "200",
        }}
      >
        {typeConvert[type]}
      </Text>
    </View>
  );
};

const getMinMaxYear = (targets) => {
  let convertedDates = targets.map((target) => getYear(target.date));
  return [Math.min(...convertedDates), Math.max(...convertedDates)];
};

const classifyYearMonth = (target) => {
  let classfied = {};
  const [minYear, maxYear] = getMinMaxYear(target);
  for (let i = minYear; i <= maxYear; i++) {
    classfied[i] = {};
    for (let j = 0; j < 12; j++) classfied[i][j] = [];
  }
  target.map((element) => {
    year = getYear(element.date);
    month = getMonth(element.date);
    classfied[year][month].push(element);
  });
  return classfied;
};

export default ({ votes, notices, bills }) => {
  let concatenated = [...votes, ...notices, ...bills];
  sortByDate(concatenated);
  const classified = classifyYearMonth(concatenated);

  return (
    <View style={styles.container}>
      {Object.keys(classified)
        .reverse()
        .map((year, i) => {
          return (
            <Year key={year}>
              {Object.keys(classified[year])
                .reverse()
                .map((month, j) => {
                  if (classified[year][month].length === 0) return null;
                  return (
                    <Month key={month}>
                      <DateContainer>
                        <Text>
                          {Number(year) + 1900}년 {Number(month) + 1}월
                        </Text>
                      </DateContainer>
                      {classified[year][month].map((element) => {
                        const { type } = element;
                        const iconName =
                          type === "notice"
                            ? "text-subject"
                            : type === "bill"
                            ? "receipt"
                            : "vote";
                        return (
                          <TouchableOpacity key={element.id}>
                            <RowContainer>
                              <IconInList
                                name={iconName}
                                size={25}
                                color={"black"}
                                type={type}
                              ></IconInList>
                              <Text style={{ marginHorizontal: 20 }}>
                                {element.date + " " + element.title}
                              </Text>
                            </RowContainer>
                          </TouchableOpacity>
                        );
                      })}
                    </Month>
                  );
                })}
            </Year>
          );
        })}
    </View>
  );
};

IconInList.propTypes = {
  name: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    borderWidth: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
