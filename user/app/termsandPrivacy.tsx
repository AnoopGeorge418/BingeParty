import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import Background from "@/components/custom/Background";

const termsAndPrivacy = () => {
  return (
    <View className="bg-background flex-1">
      <Background />

      {/* HEADER */}
      <View className="absolute top-16 left-[23px] right-[23px] flex-row items-center justify-between z-10">
        <Text className="text-primary font-sora-bold text-[20px]">
          BingeParty
        </Text>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={55} color="black" />
        </Pressable>
      </View>

      {/* BODY */}
      <View className="flex-1 px-6 pt-32 pb-12">
        <Text className="text-white font-sora-bold text-[32px] mb-2">
          Terms & Privacy Policy
        </Text>
        <Text className="text-graylight font-sora text-[14px] mb-6">
          Last Updated: December 6th 2025
        </Text>

        {/* SCROLLABLE CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-2"
        >
          {/* INTRO */}
          <Text className="text-graylight font-sora text-[15px] leading-7 mb-8">
            Welcome to BingeParty — a platform designed for friends and family 
            to enjoy movies, shows, and media together no matter where they are. 
            By using our app, you agree to the Terms of Service and Privacy 
            Policy outlined below. Please read these carefully before continuing.
          </Text>

          {/* WHAT IS BINGEPARTY */}
          <Text className="text-white font-sora-bold text-[20px] mb-3">
            What is BingeParty?
          </Text>
          <Text className="text-graylight font-sora text-[15px] leading-7 mb-8">
            BingeParty allows users to host virtual watch parties using personal 
            device files or media from supported streaming platforms. You can 
            sync playback, chat live with others, and enjoy a shared viewing 
            experience from anywhere in the world.
          </Text>

          {/* SECTION 1 */}
          <Text className="text-white font-sora-bold text-[20px] mb-3">
            1. Information We Collect
          </Text>
          <Text className="text-graylight font-sora text-[15px] leading-7 mb-8">
            We collect essential information such as your name, email address, 
            and user activity within the app. This helps us create your profile, 
            enable watch parties, provide customer support, and improve your 
            overall experience.
          </Text>

          {/* SECTION 2 */}
          <Text className="text-white font-sora-bold text-[20px] mb-3">
            2. How Your Information is Used
          </Text>
          <Text className="text-graylight font-sora text-[15px] leading-7 mb-8">
            Your data is used only to operate and enhance the app. This includes:
            {"\n"}• Creating and managing your BingeParty account
            {"\n"}• Hosting and synchronizing watch parties
            {"\n"}• Personalizing recommendations and user experience
            {"\n"}• Enhancing app performance and reliability
            {"\n"}We do not sell or share your personal information with advertisers.
          </Text>

          {/* SECTION 3 */}
          <Text className="text-white font-sora-bold text-[20px] mb-3">
            3. Third-Party Integrations
          </Text>
          <Text className="text-graylight font-sora text-[15px] leading-7 mb-8">
            BingeParty may integrate with third-party services like Google, GitHub, 
            or streaming platforms for login and authentication. Each provider has 
            its own privacy policy, and we recommend reviewing them before using 
            those services.
          </Text>

          {/* SECTION 4 */}
          <Text className="text-white font-sora-bold text-[20px] mb-3">
            4. Your Responsibilities
          </Text>
          <Text className="text-graylight font-sora text-[15px] leading-7 mb-8">
            You agree to use BingeParty legally and respectfully. You are responsible 
            for:
            {"\n"}• Keeping your account information secure
            {"\n"}• Not sharing copyrighted media without permission
            {"\n"}• Treating fellow users respectfully in chats and sessions
            {"\n"}• Ensuring your hosted content follows legal guidelines
          </Text>

          {/* SECTION 5 */}
          <Text className="text-white font-sora-bold text-[20px] mb-3">
            5. Intellectual Property
          </Text>
          <Text className="text-graylight font-sora text-[15px] leading-7 mb-8">
            BingeParty does not host or distribute copyrighted content. Users remain 
            responsible for ensuring they have rights to stream or share any media 
            during a watch party.
          </Text>

          {/* SECTION 6 */}
          <Text className="text-white font-sora-bold text-[20px] mb-3">
            6. Updates to This Policy
          </Text>
          <Text className="text-graylight font-sora text-[15px] leading-7 mb-8">
            We may update our Terms or Privacy Policy to improve the platform or 
            comply with laws. For major changes, we will notify you inside the app.
          </Text>

          {/* CONTACT */}
          <Text className="text-white font-sora-bold text-[20px] mb-3">
            Contact Us
          </Text>
          <Text className="text-graylight font-sora text-[15px] leading-7 mb-16">
            If you have questions or concerns about this policy, please contact us at:
            {"\n"}support@bingeparty.com
            {"\n"}We are here to help.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default termsAndPrivacy;
