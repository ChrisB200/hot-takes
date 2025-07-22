import React, { useEffect, useState } from "react";
import { resendCode, verifyCode } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { getRedirect } from "@/utils/url";
import CredentialsLayout from "@/layouts/CredentialsLayout";
import VerifyForm from "./VerifyForm";
import useForm from "@/hooks/useForm";

function Verify() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { values } = useForm<{ code: string }>("verify", {
    code: "",
  });

  const [resendCooldown, setResendCooldown] = useState(0);
  const redirect = getRedirect();

  // Countdown timer effect
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    console.log(resendCooldown);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle login submit logic here
    const response = await verifyCode(values.code);

    if (response === "success") {
      navigate(redirect);
      window.location.reload();
    } else {
      setError(response.error);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    const response = await resendCode();
    if (response === "success") {
      setResendCooldown(60);
    } else {
      setError("Failed to resend code");
    }
  };

  return (
    <CredentialsLayout>
      <VerifyForm
        handleSubmit={handleSubmit}
        handleResend={handleResend}
        resendCooldown={resendCooldown}
      />
    </CredentialsLayout>
  );
}

export default Verify;
