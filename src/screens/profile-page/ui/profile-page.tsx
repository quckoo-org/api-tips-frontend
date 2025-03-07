"use client";

import { Text, Title, Skeleton, Button } from "@mantine/core";
import { CircleCheck } from "lucide-react";
import { useGetDetailedUsers } from "@/entities/user";
import { UpdatePasswordButton } from "@/features/auth";
import { useUpdateUserProfileModal } from "@/features/manage-user";
import { useTranslations } from "@/shared/locale/translations";

export function ManageProfile() {
  const { t } = useTranslations();
  const { data: detailedUser, isLoading } = useGetDetailedUsers();
  const updateProfile = useUpdateUserProfileModal();

  return (
    <>
      <div className="w-full px-6 py-8">
        <Title order={1} className="mb-4 font-bold leading-h1" size={40}>
          {t("manage_profile")}
        </Title>

        <div className="mb-6 w-full">
          <div className="flex justify-between mb-4 items-center">
            <Title order={3} className="font-bold leading-8" size={24}>
              {t("account_details")}
            </Title>
            <Button onClick={updateProfile.updateUserProfile} color="dark">
              {t("update_account_details")}
            </Button>
          </div>

          <div className="flex justify-between items-center px-4 py-3 border-t">
            <div>
              <Text>{t("legal_name")}</Text>
              {isLoading ? (
                <Skeleton height={20} width={200} mt={4} />
              ) : (
                <Text c="gray">
                  {detailedUser?.detailedUser?.user?.firstName +
                    " " +
                    detailedUser?.detailedUser?.user?.lastName}
                </Text>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <div>
              <Text>{t("country_of_residence")}</Text>
              {isLoading ? (
                <Skeleton height={20} width={100} mt={4} />
              ) : (
                <Text c="gray">{detailedUser?.detailedUser?.user?.cca3}</Text>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center px-4 py-3 border-t">
            <div>
              <Text>{t("email")}</Text>
              {isLoading ? (
                <Skeleton height={20} width={250} mt={4} />
              ) : (
                <Text c="gray">{detailedUser?.detailedUser?.user?.email}</Text>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center px-4 py-3 border-y">
            <Text>{t("account_status")}</Text>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Skeleton height={20} width={100} />
              ) : (
                <>
                  <Text
                    c={
                      detailedUser?.detailedUser?.user?.verifiedAt
                        ? "grey"
                        : "red"
                    }
                  >
                    {detailedUser?.detailedUser?.user?.verifiedAt
                      ? "Verified"
                      : "Not Verified"}
                  </Text>
                  {detailedUser?.detailedUser?.user?.verifiedAt && (
                    <CircleCheck size={25} fill="#40C057" stroke={"white"} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <Title order={3} className="mb-4 font-bold" size={24}>
            {t("login_&_security")}
          </Title>
          <div className="flex justify-between items-center px-4 py-3 border-y">
            <div>
              <Text>{t("password")}</Text>
            </div>
            {isLoading ? (
              <Skeleton width={160} height={40} radius="sm" />
            ) : (
              <UpdatePasswordButton />
            )}
          </div>
        </div>
      </div>
      {updateProfile.modal}
    </>
  );
}
