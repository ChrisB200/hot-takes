import useForm from "@/hooks/useForm";
import type { FormProps } from "../types";
import FormDialog from "./FormDialog";
import FormCard from "./FormCard";
import ErrorAlertDialog from "@/components/ErrorAlertDialog";

function Form({
  name,
  fields,
  title,
  description,
  secondaryButton,
  buttons,
  schema,
  handleSubmit,
  showSeparator = false,
  className,
  bottomText,
  variant = "card",
  setOpen,
  open,
  ...props
}: FormProps) {
  const { getError, setError } = useForm(name);

  return (
    <>
      <ErrorAlertDialog error={getError()} setError={setError} />

      {variant === "card" ? (
        <FormCard
          className={className}
          title={title}
          description={description}
          secondaryButton={secondaryButton}
          handleSubmit={handleSubmit}
          name={name}
          showSeparator={showSeparator}
          fields={fields}
          bottomText={bottomText}
          buttons={buttons}
          variant={variant}
          {...props}
        />
      ) : (
        <FormDialog
          className={className}
          title={title}
          description={description}
          secondaryButton={secondaryButton}
          handleSubmit={handleSubmit}
          name={name}
          showSeparator={showSeparator}
          fields={fields}
          bottomText={bottomText}
          buttons={buttons}
          variant={variant}
          open={open}
          setOpen={setOpen}
          {...props}
        />
      )}
    </>
  );
}

export default Form;
