import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import Form from "@/components/ui/form/Form";
import type { FieldGroup, FormButtonProps } from "@/components/ui/types";

interface VerifyProps extends React.ComponentProps<"div"> {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleResend: () => void;
  resendCooldown: number;
}

function VerifyForm({
  handleSubmit,
  handleResend,
  resendCooldown,
  className,
  ...rest
}: VerifyProps) {
  const fields: FieldGroup[] = [
    {
      element: "input",
      name: "code",
      label: "Code",
      type: "text",
      required: true,
      trailingContent: (
        <button
          type="button"
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className="ml-auto text-sm underline-offset-4 hover:underline disabled:opacity-50"
        >
          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}
        </button>
      ),
    },
  ];

  const buttons: FormButtonProps[] = [
    {
      text: "Verify",
      type: "submit",
      variant: "accent",
    },
  ];

  return (
    <Form
      variant="card"
      name="verify"
      title="Verify Your Account"
      description="A verification code has been sent to your email if it exists."
      fields={fields}
      handleSubmit={handleSubmit}
      buttons={buttons}
      bottomText={
        <>
          Wrong account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Log In
          </Link>
        </>
      }
      className={className}
      {...rest}
    />
  );
}

export default VerifyForm;
