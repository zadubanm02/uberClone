import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import Icon from "react-native-elements/dist/icons/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectTravelTime } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX",
    title: "Uber LUX",
    multiplier: 1.7,
    image: "https://links.papareact.com/7pf",
  },
];

const CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<any>({});
  const travelTimeInfo = useSelector(selectTravelTime);
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-1 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity> */}
        <Text style={tw`text-center text-xl pb-3 font-bold`}>
          Select a ride - {travelTimeInfo?.distance?.text}
        </Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              item.id === selected.id && "bg-gray-200"
            }`}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-bold`}>{item.title}</Text>
              <Text>{travelTimeInfo?.duration?.text} Travel time</Text>
            </View>
            <Text style={tw`text-xl font-bold`}>
              {(
                (travelTimeInfo?.duration.value *
                  CHARGE_RATE *
                  item.multiplier) /
                100
              ).toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
        data={data}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`py-4 m-2 rounded ${
            !selected.title ? "bg-gray-200" : "bg-black"
          }`}
        >
          <Text style={tw`text-center text-white text-xl font-bold`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
