import Background from '@/components/custom/Background';
import { View, Text, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [remainingTimer, setRemainingTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // ======================================================
  // UNIVERSAL BACKEND CALLER
  // ======================================================
  const apiCall = async (endpoint: string, payload: any) => {
    try {
      const res = await fetch(`YOUR_BACKEND_URL/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      return { ok: res.ok, data };
    } catch (error: any) {
      return { ok: false, data: { message: error.message || "Network error" } };
    }
  };

  // ======================================================
  // RESEND OTP TIMER LOGIC
  // ======================================================
  useEffect(() => {
    if (step !== 2) return;

    if (remainingTimer > 0) {
      const timer = setTimeout(() => {
        setRemainingTimer(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (remainingTimer === 0) {
      setCanResend(true);
    }
  }, [remainingTimer, step]);

  const handleResendOTP = async () => {
    if (!canResend) return;

    const { ok, data } = await apiCall("auth/send-otp", { email });

    if (!ok) {
      Toast.show({ type: "error", text1: data.message || "Failed to resend OTP" });
      return;
    }

    Toast.show({ type: "success", text1: "OTP resent!" });

    // Reset timer
    setRemainingTimer(30);
    setCanResend(false);
  };

  // ======================================================
  // MAIN BUTTON HANDLER
  // ======================================================
  const handleButtonPress = async () => {

    // STEP 1 — SEND OTP
    if (step === 1) {
      if (!email.trim() || !email.includes("@")) {
        Toast.show({ type: "error", text1: "Enter a valid email!" });
        return;
      }

      const { ok, data } = await apiCall("auth/send-otp", { email });

      if (!ok) {
        Toast.show({ type: "error", text1: data.message || "Failed to send OTP" });
        return;
      }

      Toast.show({ type: "success", text1: "OTP sent successfully!" });
      setStep(2);

      // Start timer
      setRemainingTimer(30);
      setCanResend(false);

      return;
    }

    // STEP 2 — VERIFY OTP
    if (step === 2) {
      if (!otp.trim() || otp.length !== 4) {
        Toast.show({ type: "error", text1: "Enter a valid 4-digit OTP!" });
        return;
      }

      const { ok, data } = await apiCall("auth/verify-otp", { email, otp });

      if (!ok) {
        Toast.show({ type: "error", text1: data.message || "Invalid OTP" });
        return;
      }

      Toast.show({ type: "success", text1: "OTP verified!" });
      setStep(3);
      return;
    }

    // STEP 3 — RESET PASSWORD
    if (step === 3) {
      if (newPassword.length < 6) {
        Toast.show({
          type: "error",
          text1: "Password must be at least 6 characters!",
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Passwords do not match!",
        });
        return;
      }

      const { ok, data } = await apiCall("auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      if (!ok) {
        Toast.show({ type: "error", text1: data.message || "Reset failed" });
        return;
      }

      Toast.show({ type: "success", text1: "Password reset successfully!" });
      router.push("/(tabs)/home");
    }
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
          <Text className="font-sora-bold text-[24px] text-white">
            {step === 1 && "Forgot Your Password?"}
            {step === 2 && "Enter the OTP"}
            {step === 3 && "Reset Password"}
          </Text>

          <Text className="font-sora text-[16px] text-graylight mt-1">
            {step === 1 && "Enter your email to receive an OTP."}
            {step === 2 && "Enter the OTP sent to your email."}
            {step === 3 && "Create a new password for your account."}
          </Text>
        </View>

        {/* FORM FIELDS */}
        <View className="w-full">

          {/* EMAIL FIELD */}
          {step === 1 && (
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
          )}

          {/* OTP FIELD */}
          {step === 2 && (
            <View className="mb-8">
              <Text className="font-sora-bold text-white text-[14px]">OTP</Text>
              <TextInput
                value={otp}
                onChangeText={setOTP}
                placeholder="Enter OTP"
                placeholderTextColor="#B9B9B9"
                keyboardType="numeric"
                maxLength={4}
                className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary mt-2"
              />
            </View>
          )}

          {/* NEW PASSWORD FIELDS */}
          {step === 3 && (
            <>
              <View className="mb-4">
                <Text className="font-sora-bold text-white text-[14px]">New Password</Text>
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  placeholder="Enter new password"
                  placeholderTextColor="#B9B9B9"
                  className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary mt-2"
                />
              </View>

              <View className="mb-4">
                <Text className="font-sora-bold text-white text-[14px]">Confirm Password</Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  placeholder="Confirm new password"
                  placeholderTextColor="#B9B9B9"
                  className="w-full h-[49px] rounded-[10px] pl-3 text-white border-2 border-primary mt-2"
                />
              </View>
            </>
          )}

          {/* MAIN BUTTON */}
          <Button
            className="bg-primary w-full h-[49px] rounded-[10px] mt-4"
            onPress={handleButtonPress}
          >
            <ButtonText className="text-white font-sora-bold text-[18px]">
              {step === 1 && "Send OTP"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Reset Password"}
            </ButtonText>
          </Button>

          {/* RESEND OTP */}
          {step === 2 && (
            <View className="mt-4 flex justify-center items-center">
              <Pressable
                disabled={!canResend}
                onPress={handleResendOTP}
                style={{ opacity: canResend ? 1 : 0.5 }}
              >
                {canResend ? (
                  <Text className="text-white font-sora text-[14px]">
                    Didn’t receive the OTP?{" "}
                    <Text className="text-primary font-sora-bold">Tap to resend</Text>
                  </Text>
                ) : (
                  <Text className="text-white font-sora text-[14px]">
                    Didn’t receive the OTP? Resend available in{" "}
                    <Text className="text-primary font-sora-bold">
                      {remainingTimer}s
                    </Text>
                  </Text>
                )}
              </Pressable>
            </View>
          )}

        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
