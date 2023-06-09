import { Form } from "react-router-dom";
import * as styles from "./Settings.css";
import { Stack } from "../components/Stack";
import { Button } from "../components/Button";
import { RadioGroup } from "../components/RadioGroup";

export function Settings() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>memory</h1>
      <Form action="/" className={styles.form}>
        <Stack gap={8}>
          <RadioGroup name="players">
            <RadioGroup.Label>Numbers of Players</RadioGroup.Label>
            <RadioGroup.Controls>
              <RadioGroup.Option value="1" defaultChecked>
                1
              </RadioGroup.Option>
              <RadioGroup.Option value="2">2</RadioGroup.Option>
              <RadioGroup.Option value="3">3</RadioGroup.Option>
              <RadioGroup.Option value="4">4</RadioGroup.Option>
            </RadioGroup.Controls>
          </RadioGroup>
          <RadioGroup name="size">
            <RadioGroup.Label>Grid Size</RadioGroup.Label>
            <RadioGroup.Controls>
              <RadioGroup.Option value="4" defaultChecked>
                4x4
              </RadioGroup.Option>
              <RadioGroup.Option value="6">6x6</RadioGroup.Option>
            </RadioGroup.Controls>
          </RadioGroup>
          <Button type="submit" color="primary" size="large">
            Start Game
          </Button>
        </Stack>
      </Form>
    </main>
  );
}
