import Background from '@/components/custom/Background';
import { View, Text, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { useState } from 'react';
import { useToast, Toast } from '@/components/ui/toast';
import { Alert } from 'react-native';

const Signup = () => {

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("")

    const fetchUserData = async () => {
        try {
            if (!firstName.trim()) {
                Alert.alert('Error', 'First name is required!');
                return;
            } 
            
            if (!lastName.trim()) {
                Alert.alert('Error', 'Last name is required!');
                return;
            }
            
            if (!email.trim() || !email.includes('@')) {
                Alert.alert('Error', 'Enter a valida email address!');
                return;
            } 
            
            // Sending data to backend
            const userData = {
                firstName, 
                lastName, 
                email,
            }

            const request = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
            });

            // Backend response
            const response = await request.json();
            if (!response.ok) {
                Alert.alert("Error", "Server error, try again later!");
                return;
            }

            // Success
            Alert.alert("Success", "User verified! Redirecting...");
            console.log("Backend Response:", response);

            // Navigating to onboarding
            router.push("/onboarding/step1");

        } catch (err: any) {
            Alert.alert("Error", err.message || "Something went wrong.");
        }
    };

    const verifyGoogleUser = () => {

    };

    const verifyGithubUser = () => {

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
              className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary font-sora-light text-[14px] mt-2"
            />
          </View>

          {/* Last Name */}
          <View className="mb-4">
            <Text className="font-sora-bold text-white text-[14px]">Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your last name"
              placeholderTextColor="#B9B9B9"
              className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary font-sora-light text-[14px] mt-2"
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
              autoComplete="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary font-sora-light text-[14px] mt-2"
            />
          </View>

          {/* Button */}
          <Button
            className="bg-primary w-full h-[49px] rounded-[10px]"
            onPress={fetchUserData}
          >
            <ButtonText className="text-white font-sora-bold text-[18px]">Verify Account</ButtonText>
          </Button>

          {/* divider */}
          <View className='w-full flex-row items-center my-6'>
            <View className='flex-1 h-[1px] bg-white'/>
            <Text className='text-graylight mx-3 font-sora-bold'>Or</Text>
            <View className="flex-1 h-[1px] bg-white" />
          </View>
          
          {/* Social login */}
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

          {/* SignIn redirection */}
          <View className='mt-4 flex justify-center items-center'>
            <Pressable
                onPress={() => router.push("/auth/signin")}
            >
                <Text className='text-white font-sora text-[14px]'>Already have an account? <Text className='text-primary font-sora-bold'>Sign in</Text></Text>
            </Pressable>
          </View>

        </View>

      </View>
    </View>
  );
};

export default Signup;
