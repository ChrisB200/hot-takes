import CredentialsLayout from "@/layouts/CredentialsLayout";
import LoginForm from "./LoginForm";
import { emailLogin, initiateGoogleOAuth } from "@/services/authService";
import useForm from "@/hooks/useForm";
import { useNavigate } from "react-router-dom";
import { getRedirect } from "@/utils/url";

function Login() {
  const navigate = useNavigate();
  const redirect = getRedirect();
  const { values, setError } = useForm("login", {
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const response = await emailLogin(values.email, values.password);

    if (response === "success") {
      navigate(redirect);
      window.location.reload();
      return;
    }

    switch (response.code) {
      case "INVALID_FIELDS":
        setError({ actionText: "Try again", description: response.error });
        break;
      case "SUPABASE_ERROR":
        console.log("hey");
        setError({ actionText: "Try again", description: response.error });
        break;
      default:
        setError({ actionText: "Try again", description: "Server error" });
    }
  };

  const handleGoogle = async () => {
    await initiateGoogleOAuth();
  };

  return (
    <CredentialsLayout>
      <LoginForm handleSubmit={handleSubmit} handleGoogle={handleGoogle} />
    </CredentialsLayout>
  );
}

export default Login;
