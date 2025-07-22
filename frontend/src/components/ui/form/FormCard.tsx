import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import FormContent from "./FormContent";
import type { FormCardProps } from "../types";

function FormCard({
  className,
  title,
  description,
  secondaryButton,
  handleSubmit,
  handleInnerSubmit,
  name,
  showSeparator,
  fields,
  bottomText,
  buttons,
}: FormCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        {description && (
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <FormContent
          name={name}
          handleSubmit={handleSubmit}
          secondaryButton={secondaryButton}
          showSeparator={showSeparator}
          fields={fields}
          bottomText={bottomText}
          buttons={buttons}
        />
      </CardContent>
    </Card>
  );
}

export default FormCard;
