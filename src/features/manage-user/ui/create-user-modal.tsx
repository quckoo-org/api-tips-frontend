import { ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { FC } from "react";
import { UserForm } from "./user-form";

type CreateUserModalProps = {
  className?: string;
};

export const CreateUserModal: FC<CreateUserModalProps> = ({ className }) => {
  const [opened, handlers] = useDisclosure();

  return (
    <div className={clsx("", className)}>
      <ActionIcon size="lg" onClick={handlers.toggle}>
        <PlusIcon />
      </ActionIcon>
      <Modal title="Create user" onClose={handlers.close} opened={opened}>
        <UserForm />
      </Modal>
    </div>
  );
};
