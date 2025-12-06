import Background from '@/components/custom/Background';
import { View, Text, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");

  // ======================================================
  // UNIVERSAL BACKEND CALL HANDLER
  // ======================================================
  const apiCall = async (endpoint: string, payload: any) => {
    try {
      const res = await fetch(`YOUR_BACKEND_URL/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { ok: res.ok, data };
    } catch (error: any) {
      return {
        ok: false,
        data: { message: error.message || "Network error" },
      };
    }
  };

  const fetchUserData = async () => {

    // ======================================================
    // VALIDATION
    // ======================================================

    if (!firstName.trim()) {
      Toast.show({ type: "error", text1: "First name is required!" });
      return;
    }

    if (!lastName.trim()) {
      Toast.show({ type: "error", text1: "Last name is required!" });
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      Toast.show({ type: "error", text1: "Enter a valid email address!" });
      return;
    }

    // ======================================================
    // SEND TO BACKEND
    // ======================================================
    const payload = { firstName, lastName, email };

    const { ok, data } = await apiCall("auth/signup", payload);

    // Backend error handling
    if (!ok) {
      Toast.show({
        type: "error",
        text1: data.message || "Signup failed! Try again.",
      });
      return;
    }

    // SUCCESS
    Toast.show({
      type: "success",
      text1: "Account created!",
      text2: "Redirecting…",
    });

    router.push("/onboarding/step1");
  };

  const verifyGoogleUser = () => {
    Toast.show({ type: "info", text1: "Google signup not implemented yet" });
  };

  const verifyGithubUser = () => {
    Toast.show({ type: "info", text1: "Github signup not implemented yet" });
  };

  return (
    <View className="bg-background flex-1">
      <Background />

      {/* HEADER */}
      <View className="absolute top-16 left-[23px] right-[23px] flex-row items-center justify-between">
        <Text className="text-primary font-sora-bold text-[20px]">BingeParty</Text>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={55} color="black" />
        </Pressable>
      </View>

      {/* PAGE BODY */}
      <View className="flex-1 justify-center px-6">

        {/* Title */}
        <View className="mb-10">
          <Text className="font-sora-bold text-[24px] text-white">Join the Party</Text>
          <Text className="font-sora text-[16px] text-graylight mt-1">
            Watch together from anywhere.
          </Text>
        </View>

        {/* FORM */}
        <View className="w-full">

          {/* First Name */}
          <View className="mb-4">
            <Text className="font-sora-bold text-white text-[14px]">First Name</Text>
            <TextInput
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#B9B9B9"
              className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary mt-2"
            />
          </View>

          {/* Last Name */}
          <View className="mb-4">
            <Text className="font-sora-bold text-white text-[14px]">Last Name</Text>
            <TextInput
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#B9B9B9"
              className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary mt-2"
            />
          </View>

          {/* Email */}
          <View className="mb-8">
            <Text className="font-sora-bold text-white text-[14px]">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#B9B9B9"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary mt-2"
            />
          </View>

          {/* Verify Button */}
          <Button
            className="bg-primary w-full h-[49px] rounded-[10px]"
            onPress={fetchUserData}
          >
            <ButtonText className="text-white font-sora-bold text-[18px]">Verify Account</ButtonText>
          </Button>

          {/* Divider */}
          <View className="w-full flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-white"/>
            <Text className="text-graylight mx-3 font-sora-bold">Or</Text>
            <View className="flex-1 h-[1px] bg-white"/>
          </View>

          {/* Social Login */}
          <View>
            <Button
              className="bg-white w-full h-[49px] rounded-[10px]"
              onPress={verifyGoogleUser}
            >
              <Ionicons name="logo-google" size={30}/>
              <ButtonText className="text-black font-sora-bold text-[16px]">Continue with Google</ButtonText>
            </Button>

            <Button
              className="bg-white w-full h-[49px] rounded-[10px] mt-4"
              onPress={verifyGithubUser}
            >
              <Ionicons name="logo-github" size={30} />
              <ButtonText className="text-black font-sora-bold text-[16px]">Continue with Github</ButtonText>
            </Button>
          </View>

          {/* Redirect to SignIn */}
          <View className="mt-4 flex justify-center items-center">
            <Pressable onPress={() => router.push("/auth/signin")}>
              <Text className="text-white font-sora text-[14px]">
                Already have an account?{" "}
                <Text className="text-primary font-sora-bold">Sign in</Text>
              </Text>
            </Pressable>
          </View>

        </View>

      </View>
    </View>
  );
};

export default Signup;
