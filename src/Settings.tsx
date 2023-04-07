import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Form } from "react-router-dom";
import * as styles from "./Settings.css";

export function Settings() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>memory</h1>
      <Form action="/" className={styles.form}>
        <div
          className={styles.fieldset}
          role="radiogroup"
          aria-labelledby="theme"
        >
          <p id="theme" className={styles.legend}>
            Select Theme
          </p>
          <div className={styles.radioGroup}>
            <VisuallyHidden.Root asChild>
              <input
                type="radio"
                id="numbers"
                name="theme"
                value="numbers"
                defaultChecked
              />
            </VisuallyHidden.Root>
            <label htmlFor="numbers" className={styles.radio}>
              Numbers
            </label>
            <VisuallyHidden.Root asChild>
              <input type="radio" id="icons" name="theme" value="icons" />
            </VisuallyHidden.Root>
            <label htmlFor="icons" className={styles.radio}>
              Icons
            </label>
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Start Game
        </button>
      </Form>
    </main>
  );
}
