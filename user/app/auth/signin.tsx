import Background from '@/components/custom/Background';
import { View, Text, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

const Signin = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // CLEAN BACKEND CALL HANDLER
  const apiCall = async (endpoint: string, payload: any) => {
    try {
      const res = await fetch(`YOUR_BACKEND_URL/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { ok: res.ok, data }; // return both parsed json + status
    } catch (error: any) {
      return {
        ok: false,
        data: { message: error.message || "Network error" },
      };
    }
  };

  const fetchUserData = async () => {
    if (!email.trim() || !email.includes("@")) {
      Toast.show({
        type: "error",
        text1: "Enter a valid email!",
      });
      return;
    }

    if (!password.trim() || password.length <= 6) {
      Toast.show({
        type: "error",
        text1: "Please enter a strong password!",
      });
      return;
    }

    const payload = { email, password };

    const { ok, data } = await apiCall("auth/signin", payload);

    if (!ok) {
      Toast.show({
        type: "error",
        text1: data.message || "Invalid email or password!",
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Welcome Back!",
    });

    router.push("/onboarding/step1");
  };

  const verifyGoogleUser = () => {
    Toast.show({
      type: "info",
      text1: "Google Sign-in not implemented yet",
    });
  };

  const verifyGithubUser = () => {
    Toast.show({
      type: "info",
      text1: "GitHub Sign-in not implemented yet",
    });
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

      {/* BODY */}
      <View className="flex-1 justify-center px-6">

        {/* TITLE */}
        <View className="mb-10">
          <Text className="font-sora-bold text-[24px] text-white">Good to See You Again</Text>
          <Text className="font-sora text-[16px] text-graylight mt-1">
            Jump into your watch party.
          </Text>
        </View>

        {/* FORM */}
        <View className="w-full">
          
          {/* EMAIL */}
          <View className="mb-8">
            <Text className="font-sora-bold text-white text-[14px]">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#B9B9B9"
              autoCapitalize="none"
              keyboardType="email-address"
              className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary mt-2"
            />
          </View>

          {/* PASSWORD */}
          <View className="mb-4">
            <Text className="font-sora-bold text-white text-[14px]">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor="#B9B9B9"
              className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary mt-2"
            />
          </View>

          {/* FORGOT PASSWORD */}
          <Pressable onPress={() => router.push("/auth/forgotPassword")}>
            <View className="flex justify-end items-end">
              <Text className="text-primary font-sora-bold text-[16px]">Forgot Password?</Text>
            </View>
          </Pressable>

          {/* SIGN IN BUTTON */}
          <Button
            className="bg-primary w-full h-[49px] rounded-[10px] mt-4"
            onPress={fetchUserData}
          >
            <ButtonText className="text-white font-sora-bold text-[18px]">Sign In</ButtonText>
          </Button>

          {/* DIVIDER */}
          <View className="w-full flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-white"/>
            <Text className="text-graylight mx-3 font-sora-bold">Or</Text>
            <View className="flex-1 h-[1px] bg-white"/>
          </View>

          {/* SOCIAL LOGIN */}
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

          {/* SIGN UP REDIRECT */}
          <View className="mt-4 flex justify-center items-center">
            <Pressable onPress={() => router.push("/auth/signup")}>
              <Text className="text-white font-sora text-[14px]">
                Don’t have an account? <Text className="text-primary font-sora-bold">Sign up</Text>
              </Text>
            </Pressable>
          </View>

        </View>

      </View>
    </View>
  );
};

export default Signin;
