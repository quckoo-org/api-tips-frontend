import { ActionIcon, Button, CopyButton, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import clsx from "clsx";
import { RefreshCcw } from "lucide-react";
import React, { FC } from "react";
import { useUpdateTipsToken } from "@/features/manage-user";
import { useTimer } from "@/shared/hooks";
import { useTranslations } from "@/shared/locale/translations";
import { DetailedUser } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type UpdateUserTipsTokenProps = {
  className?: string;
  detailedUser: DetailedUser | undefined;
};

export const UpdateUserTipsToken: FC<UpdateUserTipsTokenProps> = ({
  className,
  detailedUser,
}) => {
  const { t } = useTranslations();
  const clipboard = useClipboard({ timeout: 2000 });
  const updateToken = useUpdateTipsToken();
  const { timer: resendCooldown, setTimer: setResendCooldown } = useTimer();

  const handleUpdateToken = () => {
    if (resendCooldown) return;
    updateToken.mutate({});
    setResendCooldown(3);
  };
  return (
    <div className={clsx("flex items-center h-8", className)}>
      <p
        data-testid="token-display"
        className="mr-1"
        onClick={() => clipboard.copy(detailedUser?.accessToken ?? "")}
      >
        {t("token") + ": " + (detailedUser?.accessToken ?? "")}
      </p>
      <CopyButton value={detailedUser?.accessToken ?? ""} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip
            label={copied || clipboard.copied ? "Copied" : "Copy"}
            withArrow
            position="right"
          >
            <ActionIcon
              color={copied || clipboard.copied ? "teal" : "gray"}
              variant="subtle"
              onClick={copy}
            >
              {copied || clipboard.copied ? (
                <IconCheck size={16} />
              ) : (
                <IconCopy size={16} />
              )}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
      {resendCooldown > 0 ? (
        <Button
          size={"xs"}
          variant="filled"
          color="dark"
          disabled={resendCooldown > 0}
        >
          {t("update_in") + resendCooldown + t("seconds")}
        </Button>
      ) : (
        <ActionIcon
          size={"sm"}
          variant="subtle"
          aria-label="Refresh token button"
          data-testid={"refresh-tips-token-button"}
          onClick={handleUpdateToken}
        >
          <RefreshCcw size={16} />
        </ActionIcon>
      )}
    </div>
  );
};
