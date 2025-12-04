import { Button, ButtonText } from "@/components/ui/button";
import "../global.css"
import { Text, View, Pressable } from "react-native";
import { router } from 'expo-router';
 
export default function App() {

  return (
    <View className="flex-1 items-center justify-end bg-background">
      <View className="bottom-20">
        <View className='flex justify-center items-center gap-[8px]'>
          <Text className="text-[32px] text-primary font-sora-bold">BingeParty</Text>
          <Text className='text-graylight text-[24px] font-sora-bold'>Create. Share. Enjoy.</Text>
          <Text className='text-graylight font-sora-bold text-[18px] w-[361px] h-[115px] text-center'>BingeParty brings your friends into the same screen, fully synced, no matter the distance. Stream movies, shows, and videos in real time with built-in chat, reactions, and instant party links.</Text>
        </View>
        <View className='flex flex-col gap-[10px] mt-[8]'>
          <Button onPress={() => router.push("/auth/signup")} className='bg-primary w-[360px] h-[47px] text-[18px] rounded-full'>
            <ButtonText className="text-white font-sora-bold">Join The Party!</ButtonText>
          </Button>
          <Button onPress={() => router.push("/auth/signin")} className='bg-white w-[360px] h-[47px] text-[18px] rounded-full'>
            <ButtonText className="text-black font-sora-bold">Sign In</ButtonText>
          </Button>
        </View>
        <Text className="text-white mt-[10px] text-center text-[12px] font-sora">By continuing, you agree to our <Text className='text-primary font-sora'>Terms</Text> & <Text className='text-primary font-sora'>Privacy Policy</Text>.</Text>
      </View>
    </View>
  );
}
