import {
  User,
  DetailedUser,
  GetUserDetailedResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { createMockGeneralResponse } from "@/shared/testing";

/**
 * Создает моковый объект базового пользователя
 */
export const createMockUser = (overrides = {}): User => ({
  id: 123,
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  cca3: "RUS",
  createdAt: new Date(),
  blockedAt: undefined,
  deletedAt: undefined,
  verifiedAt: new Date(),
  roles: [],
  ...overrides,
});

/**
 * Создает моковый объект детального пользователя
 */
export const createMockDetailedUser = (overrides = {}): DetailedUser => ({
  user: createMockUser(),
  balance: 100,
  accessToken: "old-access-token",
  ...overrides,
});

/**
 * Создает моковый объект детального ответа о пользователе
 */
export const createMockGetUserDetailedResponse = (
  overrides = {},
): GetUserDetailedResponse => ({
  detailedUser: createMockDetailedUser(),
  response: createMockGeneralResponse(),
  ...overrides,
});
