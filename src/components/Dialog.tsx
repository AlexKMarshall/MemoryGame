import * as RadixDialog from "@radix-ui/react-dialog";
import * as styles from "./Dialog.css";
import { ReactNode } from "react";

export type DialogProps = {
  open?: boolean;
  children: ReactNode;
};

export function Dialog({ open, children }: DialogProps) {
  return <RadixDialog.Root open={open}>{children}</RadixDialog.Root>;
}

function DialogContent({ children }: { children: ReactNode }) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={styles.dialogOverlay} />
      <div className={styles.dialogPositioner}>
        <RadixDialog.Content className={styles.DialogContent}>
          {children}
        </RadixDialog.Content>
      </div>
    </RadixDialog.Portal>
  );
}

function DialogTitle({ children }: { children: ReactNode }) {
  return (
    <RadixDialog.Title className={styles.DialogTitle}>
      {children}
    </RadixDialog.Title>
  );
}

function DialogSubtitle({ children }: { children: ReactNode }) {
  return <p className={styles.DialogSubtitle}>{children}</p>;
}

Dialog.Content = DialogContent;
Dialog.Title = DialogTitle;
Dialog.Subtitle = DialogSubtitle;
Dialog.Close = RadixDialog.Close;
Dialog.Trigger = RadixDialog.Trigger;
