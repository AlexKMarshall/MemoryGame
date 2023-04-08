import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Form } from "react-router-dom";
import * as styles from "./Settings.css";
import { Stack } from "./components/Stack";

export function Settings() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>memory</h1>
      <Form action="/" className={styles.form}>
        <Stack gap={8}>
          <div role="radiogroup" aria-labelledby="size">
            <Stack gap={3}>
              <p id="size" className={styles.legend}>
                Grid Size
              </p>
              <div className={styles.radioGroup}>
                <VisuallyHidden.Root asChild>
                  <input
                    type="radio"
                    id="4"
                    name="size"
                    value="4"
                    defaultChecked
                  />
                </VisuallyHidden.Root>
                <label htmlFor="4" className={styles.radio}>
                  4x4
                </label>
                <VisuallyHidden.Root asChild>
                  <input type="radio" id="6" name="size" value="6" />
                </VisuallyHidden.Root>
                <label htmlFor="6" className={styles.radio}>
                  6x6
                </label>
              </div>
            </Stack>
          </div>
          <button type="submit" className={styles.submitButton}>
            Start Game
          </button>
        </Stack>
      </Form>
    </main>
  );
}
