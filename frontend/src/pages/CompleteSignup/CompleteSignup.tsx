import CredentialsLayout from "@/layouts/CredentialsLayout";
import CompleteSignupForm from "./CompleteSignupForm";
import { completeSignup } from "@/services/authService";
import useForm from "@/hooks/useForm";
import { useNavigate } from "react-router-dom";
import { getRedirect } from "@/utils/url";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

function CompleteSignup() {
  const navigate = useNavigate();
  const redirect = getRedirect();
  const { user } = useUser();
  const { values, setError, addError } = useForm("complete-signup", {
    username: "",
    nickname: "",
  });

  useEffect(() => {
    if (!user) navigate(redirect);

    if (user?.username || user?.nickname) navigate(redirect);
  }, []);

  const handleSubmit = async () => {
    const response = await completeSignup(values.username, values.nickname);
    if (response === "success") {
      navigate(redirect);
      window.location.reload();
      return;
    }

    switch (response.code) {
      case "UNAUTHORISED":
        setError({
          actionText: "Login",
          action: () => navigate("/login"),
          description: response.error,
        });
        break;
      case "MISSING_FIELDS":
        setError({
          actionText: "Try Again",
          description: response.error,
        });
        break;
      case "USERNAME_EXISTS":
        addError("username", response.error);
        break;
      default:
        setError({
          description: "Internal server error",
          actionText: "Try again",
        });
    }
  };

  return (
    <CredentialsLayout>
      <CompleteSignupForm handleSubmit={handleSubmit} />
    </CredentialsLayout>
  );
}

export default CompleteSignup;
