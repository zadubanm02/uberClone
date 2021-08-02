import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAPS_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/core";
import NavFavourites from "./NavFavourites";
import Icon from "react-native-elements/dist/icons/Icon";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center pb-3 text-xl`}>Good day Michal</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            debounce={500}
            nearbyPlacesAPI="GooglePlacesSearch"
            styles={{
              container: {
                backgroundColor: "white",
                paddingTop: 20,
                flex: 0,
              },
              textInput: {
                backgroundColor: "#DDDDDF",
                borderRadius: 10,
                fontSize: 18,
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0,
              },
            }}
            query={{
              key: GOOGLE_MAPS_KEY,
              language: "en",
            }}
            returnKeyType={"search"}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              setTimeout(() => {
                navigation.navigate("RideOptionsCard");
              }, 300);
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
          />
        </View>
        <NavFavourites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly mt-auto py-2 border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full mx-2`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center ml-2`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row w-24 px-4 py-3 rounded-full mx-2`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw` text-center ml-2`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
