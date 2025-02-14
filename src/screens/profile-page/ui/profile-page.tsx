"use client";

import { Text, Title, Skeleton } from "@mantine/core";
import { CheckIcon } from "lucide-react";
import { useGetDetailedUsers } from "@/entities/user";
import { Button } from "@/shared/ui/button";

export function ManageProfile() {
  const { data: detailedUser, isLoading } = useGetDetailedUsers();

  return (
    <div className="w-full px-6 py-8">
      <Title order={1} className="mb-4 font-bold leading-h1" size={40}>
        Manage Profile
      </Title>

      <div className="mb-6 w-full">
        <Title order={3} className="mb-4 font-bold leading-8" size={24}>
          Account Details
        </Title>

        <div className="flex justify-between items-center px-4 py-3 border-t">
          <div>
            <Text>Legal Name</Text>
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
            <Text>Country Of Residence</Text>
            {isLoading ? (
              <Skeleton height={20} width={100} mt={4} />
            ) : (
              <Text c="gray">{detailedUser?.detailedUser?.user?.cca3}</Text>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-3 border-t">
          <div>
            <Text>Email</Text>
            {isLoading ? (
              <Skeleton height={20} width={250} mt={4} />
            ) : (
              <Text c="gray">{detailedUser?.detailedUser?.user?.email}</Text>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-3 border-y">
          <Text>Account Status</Text>
          <div className="flex items-center gap-2">
            {isLoading ? (
              <Skeleton height={20} width={100} />
            ) : (
              <>
                <Text
                  c={
                    detailedUser?.detailedUser?.user?.verifiedAt
                      ? "green"
                      : "red"
                  }
                >
                  {detailedUser?.detailedUser?.user?.verifiedAt
                    ? "Verified"
                    : "Not Verified"}
                </Text>
                {detailedUser?.detailedUser?.user?.verifiedAt && (
                  <CheckIcon size={16} className="text-green-500" />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
        <Title order={3} className="mb-4 font-bold" size={24}>
          Login & Security
        </Title>

        <div className="flex justify-between items-center px-4 py-3 border-y">
          <div>
            <Text>Password</Text>
          </div>
          {isLoading ? (
            <Skeleton width={160} height={40} radius="sm" />
          ) : (
            <Button size="md" variant="black">
              Update Password
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
