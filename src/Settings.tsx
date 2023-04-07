import * as RadioGroup from "@radix-ui/react-radio-group";
import { Form } from "react-router-dom";
import * as styles from "./Settings.css";

export function Settings() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>memory</h1>
      <Form action="/" className={styles.form}>
        <p id="theme-label">Select Theme</p>
        <RadioGroup.Root
          aria-labelledby="theme-label"
          name="theme"
          defaultValue="numbers"
        >
          <div>
            <RadioGroup.Item value="numbers" id="numbers">
              <RadioGroup.Indicator />
            </RadioGroup.Item>
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div>
            <RadioGroup.Item value="icons" id="icons">
              <RadioGroup.Indicator />
            </RadioGroup.Item>
            <label htmlFor="icons">Icons</label>
          </div>
        </RadioGroup.Root>
        <button type="submit">Start Game</button>
      </Form>
    </main>
  );
}
