import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Background = () => {
  return (
    <View className="absolute w-full h-full items-center">
        <View className="absolute top-[-250px]">
            <LinearGradient
            colors={["#8B5CF6", "rgba(90,63,163,0)"]}
            style={{
                width: 900,  
                height: 950,
                borderRadius: 900,
                opacity: 1.0,
                transform: [{ scale: 1.6 }],
                shadowColor: "#5A3FA3",
                shadowOpacity: 0.8,
                shadowRadius: 180,
                shadowOffset: { width: 0, height: 0 },
            }}
            />
        </View>
    </View>
  );
};

export default Background;
