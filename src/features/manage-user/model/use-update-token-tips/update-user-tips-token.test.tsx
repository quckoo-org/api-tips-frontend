import { QueryClient } from "@tanstack/react-query";
import { waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createMockDetailedUser,
  createMockGetUserDetailedResponse,
} from "@/entities/user";
import { useUpdateTipsToken } from "@/features/manage-user";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  UpdateAccessTokenRequest,
  UpdateAccessTokenResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";
import {
  createMockGeneralResponse,
  createTestQueryClient,
  renderHookWithProviders,
} from "@/shared/testing";

vi.mock("@/shared/grpc/clients/use-user-client", () => ({
  useAccessClient: vi.fn(),
}));

describe("useUpdateTipsToken", () => {
  const mockUpdateAccessToken = vi.fn();
  const mockSetQueriesData = vi.fn();
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();

    (useAccessClient as any).mockReturnValue({
      updateAccessToken: mockUpdateAccessToken,
    });

    queryClient = createTestQueryClient();
    queryClient.setQueriesData = mockSetQueriesData;
  });

  it("должен успешно обновить токен и обновить данные пользователя", async () => {
    // Подготовка тестовых данных с использованием фабричных функций
    const mockRequest: UpdateAccessTokenRequest = {};
    // Создаем моковый пользователь с обновленным токеном используя фабрику
    const mockUpdatedDetailedUser = createMockDetailedUser({
      accessToken: "new-token-123",
    });
    const mockResponse: UpdateAccessTokenResponse = {
      user: mockUpdatedDetailedUser,
      response: createMockGeneralResponse(),
    };
    // Настройка мока для возврата успешного ответа
    mockUpdateAccessToken.mockResolvedValueOnce(mockResponse);

    // Имитируем существующие данные в кэше используя соответствующую фабрику
    const existingUserData = createMockGetUserDetailedResponse();
    // Рендерим хук в тестовом окружении
    const { result } = renderHookWithProviders(() => useUpdateTipsToken(), {
      queryClient,
    });
    result.current.mutate(mockRequest);
    // Ожидаем завершения асинхронной операции
    await waitFor(() => {
      // Проверяем, что мутация успешно завершилась
      expect(result.current.isSuccess).toBe(true);
    });

    // Проверяем, что функция updateAccessToken была вызвана с правильными параметрами
    expect(mockUpdateAccessToken).toHaveBeenCalledTimes(1);
    expect(mockUpdateAccessToken).toHaveBeenCalledWith(mockRequest);
    // Проверяем, что после успешной мутации был обновлен кэш с данными пользователя
    expect(mockSetQueriesData).toHaveBeenCalledTimes(1);
    expect(mockSetQueriesData).toHaveBeenCalledWith(
      { queryKey: [QUERY_KEYS.DETAILED_USER] },
      expect.any(Function),
    );

    // Проверяем логику обновления данных
    const updateFn = mockSetQueriesData.mock.calls[0][1];
    const updatedData = updateFn(existingUserData);
    expect(updatedData).toEqual({
      ...existingUserData,
      detailedUser: mockResponse.user,
    });
  });

  it("не должен обновлять кэш, если мутация завершилась с ошибкой", async () => {
    // Настраиваем мок для имитации ошибки
    const mockError = new Error("Ошибка обновления токена");
    mockUpdateAccessToken.mockRejectedValueOnce(mockError);

    const mockRequest: UpdateAccessTokenRequest = {
      token: "invalid-token",
    };

    const { result } = renderHookWithProviders(() => useUpdateTipsToken(), {
      queryClient,
    });
    result.current.mutate(mockRequest);

    // Ожидаем завершения асинхронной операции
    await waitFor(() => {
      // Проверяем, что мутация завершилась с ошибкой
      expect(result.current.isError).toBe(true);
    });

    // Проверяем, что функция updateAccessToken была вызвана
    expect(mockUpdateAccessToken).toHaveBeenCalledTimes(1);
    expect(mockUpdateAccessToken).toHaveBeenCalledWith(mockRequest);

    // Проверяем, что функция обновления кэша не вызывалась
    expect(mockSetQueriesData).not.toHaveBeenCalled();
  });

  it("должен возвращать oldData без изменений при отсутствии данных в кэше", async () => {
    // Подготовка данных
    const mockRequest: UpdateAccessTokenRequest = {};

    const mockUpdatedDetailedUser = createMockDetailedUser({
      accessToken: "new-token-123",
    });

    const mockResponse: UpdateAccessTokenResponse = {
      user: mockUpdatedDetailedUser,
      response: createMockGeneralResponse(),
    };

    mockUpdateAccessToken.mockResolvedValueOnce(mockResponse);

    const { result } = renderHookWithProviders(() => useUpdateTipsToken(), {
      queryClient,
    });
    result.current.mutate(mockRequest);

    // Ожидаем завершения асинхронной операции
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Проверяем логику обновления данных при отсутствии предыдущих данных
    const updateFn = mockSetQueriesData.mock.calls[0][1];
    const updatedData = updateFn(undefined);

    // Если oldData отсутствует, функция должна вернуть oldData без изменений (undefined)
    expect(updatedData).toBeUndefined();
  });

  it("должен возвращать oldData без изменений при отсутствии данных в ответе", async () => {
    const existingUserData = createMockGetUserDetailedResponse();

    const mockRequest: UpdateAccessTokenRequest = {};

    // Создаем ответ без данных пользователя
    const mockEmptyResponse: UpdateAccessTokenResponse = {
      user: undefined,
      response: createMockGeneralResponse(),
    };

    mockUpdateAccessToken.mockResolvedValueOnce(mockEmptyResponse);

    const { result } = renderHookWithProviders(() => useUpdateTipsToken(), {
      queryClient,
    });
    result.current.mutate(mockRequest);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Получаем функцию обновления данных
    const updateFn = mockSetQueriesData.mock.calls[0][1];

    // Проверяем, что если в ответе нет данных пользователя, кэш остается без изменений
    const updatedData = updateFn(existingUserData);
    expect(updatedData).toEqual(existingUserData);
  });

  it("должен возвращать oldData без изменений при отсутствии данных в кэше и в ответе", async () => {
    const mockRequest: UpdateAccessTokenRequest = {};

    mockUpdateAccessToken.mockResolvedValueOnce(null);
    const { result } = renderHookWithProviders(() => useUpdateTipsToken(), {
      queryClient,
    });
    result.current.mutate(mockRequest);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const updateFn = mockSetQueriesData.mock.calls[0][1];

    const updatedData = updateFn(undefined);
    expect(updatedData).toBeUndefined();
  });
});
