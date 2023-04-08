import {
  InputHTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useId,
} from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import * as styles from "./RadioGroup.css";
import { Stack } from "./Stack";

type RadioGroupContext = {
  name: string;
  labelId: string;
};
const RadioGroupContext = createContext<RadioGroupContext | null>(null);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroup components must be used inside a RadioGroup");
  }
  return context;
}

type RadioGroupProps = {
  name: string;
  children: ReactNode;
};
export function RadioGroup({ name, children }: RadioGroupProps) {
  const labelId = useId();

  return (
    <RadioGroupContext.Provider value={{ name, labelId }}>
      <div role="radiogroup" aria-labelledby={labelId}>
        <Stack gap={{ mobile: 3, tablet: 4 }}>{children}</Stack>
      </div>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupLabel({ children }: { children: ReactNode }) {
  const { labelId } = useRadioGroupContext();
  return (
    <p id={labelId} className={styles.RadioGroupLabel}>
      {children}
    </p>
  );
}

function RadioGroupControls({ children }: { children: ReactNode }) {
  return <div className={styles.RadioGroupControls}>{children}</div>;
}

type BaseInputProps = InputHTMLAttributes<HTMLInputElement>;

type RadioGroupOptionProps = Omit<
  BaseInputProps,
  "className" | "type" | "name"
> &
  Required<Pick<BaseInputProps, "value">> & { children: ReactNode };

function RadioGroupOption({ children, ...props }: RadioGroupOptionProps) {
  const { name } = useRadioGroupContext();
  const generatedId = useId();
  const id = props.id ?? generatedId;
  return (
    <div>
      <VisuallyHidden.Root asChild>
        <input {...props} type="radio" id={id} name={name} />
      </VisuallyHidden.Root>
      <label htmlFor={id} className={styles.RadioButton}>
        {children}
      </label>
    </div>
  );
}

RadioGroup.Label = RadioGroupLabel;
RadioGroup.Controls = RadioGroupControls;
RadioGroup.Option = RadioGroupOption;
