import { useClipboard } from "@mantine/hooks";
import { screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { createMockDetailedUser } from "@/entities/user";
import { useUpdateTipsToken } from "@/features/manage-user";
import { useTimer } from "@/shared/hooks";
import { DetailedUser } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import {
  createTranslationMock,
  getTranslatedText,
  renderWithProviders,
} from "@/shared/testing";
import { UpdateUserTipsToken } from "./update-user-tips-token";

vi.mock("@/features/manage-user", () => ({
  useUpdateTipsToken: vi.fn(),
}));

vi.mock("@/shared/hooks", () => ({
  useTimer: vi.fn(),
}));

vi.mock("@/shared/locale/translations", () => ({
  useTranslations: vi.fn(),
}));

vi.mock("@mantine/hooks", () => ({
  useClipboard: vi.fn(),
}));

describe("UpdateUserTipsToken", () => {
  const mockMutate = vi.fn();
  const mockCopy = vi.fn();
  const mockSetTimer = vi.fn();

  // Очищаем DOM после каждого теста
  afterEach(() => {
    document.body.innerHTML = "";
  });

  beforeEach(() => {
    vi.clearAllMocks();

    (useUpdateTipsToken as any).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });

    (useTimer as any).mockReturnValue({
      timer: 0,
      setTimer: mockSetTimer,
    });

    createTranslationMock();

    (useClipboard as any).mockReturnValue({
      copy: mockCopy,
      copied: false,
    });
  });

  const renderComponent = (detailedUser?: DetailedUser) => {
    return renderWithProviders(
      <UpdateUserTipsToken detailedUser={detailedUser} />,
    );
  };

  it("отображает токен из detailedUser", () => {
    const testToken = "test-token-123";
    const detailedUser = createMockDetailedUser({
      accessToken: testToken,
    });

    renderComponent(detailedUser);

    const tokenElement = screen.getByTestId("token-display");
    const tokenLabel = getTranslatedText("token");
    expect(tokenElement).toHaveTextContent(`${tokenLabel}: ${testToken}`);
  });

  it("копирует токен при клике на текст", () => {
    const testToken = "test-token-123";
    const detailedUser = createMockDetailedUser({
      accessToken: testToken,
    });

    renderComponent(detailedUser);

    const tokenText = screen.getByTestId("token-display");
    fireEvent.click(tokenText);

    expect(mockCopy).toHaveBeenCalledWith(testToken);
  });

  it("вызывает мутацию обновления токена при клике на кнопку обновления", () => {
    renderComponent();

    const refreshButton = screen.getByTestId("refresh-tips-token-button");
    fireEvent.click(refreshButton);

    expect(mockMutate).toHaveBeenCalledWith({});
    expect(mockSetTimer).toHaveBeenCalledWith(3);
  });

  it("показывает кнопку с таймером во время кулдауна", () => {
    const timerValue = 2;
    (useTimer as any).mockReturnValue({
      timer: timerValue,
      setTimer: mockSetTimer,
    });

    renderComponent(createMockDetailedUser());

    const updateInLabel = getTranslatedText("update_in");
    const secondsLabel = getTranslatedText("seconds");
    const buttonText = `${updateInLabel}${timerValue}${secondsLabel}`;

    const cooldownButtons = screen.getAllByText(buttonText);
    expect(cooldownButtons.length).toBeGreaterThan(0);

    // Проверяем что кнопки обновления нет
    const refreshButton = screen.queryByTestId("refresh-tips-token-button");
    expect(refreshButton).not.toBeInTheDocument();
  });

  it("не вызывает мутацию обновления, если активен таймер кулдауна", () => {
    const timerValue = 2;
    (useTimer as any).mockReturnValue({
      timer: timerValue,
      setTimer: mockSetTimer,
    });

    renderComponent(createMockDetailedUser());

    // Собираем текст для кнопки из переводов
    const updateInLabel = getTranslatedText("update_in");
    const secondsLabel = getTranslatedText("seconds");
    const buttonText = `${updateInLabel}${timerValue}${secondsLabel}`;

    const disabledButtons = screen.getAllByText(buttonText);
    const buttonElement = disabledButtons[0].closest("button");
    expect(buttonElement).toBeDisabled();

    fireEvent.click(buttonElement!);
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("отображает пустой токен, когда detailedUser не определен", () => {
    renderComponent(undefined);

    const tokenElement = screen.getByTestId("token-display");
    const tokenLabel = getTranslatedText("token");
    expect(tokenElement.textContent).toBe(`${tokenLabel}: `);
  });

  it("отображает правильный текст кнопки для разных значений таймера", () => {
    // Тест для 1 секунды
    const timerValue1 = 1;
    (useTimer as any).mockReturnValue({
      timer: timerValue1,
      setTimer: mockSetTimer,
    });

    renderComponent(createMockDetailedUser());

    // Собираем текст для кнопки из переводов
    const updateInLabel = getTranslatedText("update_in");
    const secondsLabel = getTranslatedText("seconds");
    const buttonText1 = `${updateInLabel}${timerValue1}${secondsLabel}`;

    const buttons1s = screen.getAllByText(buttonText1);
    expect(buttons1s.length).toBeGreaterThan(0);

    const timerValue3 = 3;
    (useTimer as any).mockReturnValue({
      timer: timerValue3,
      setTimer: mockSetTimer,
    });

    // Очищаем DOM перед перерендерингом
    document.body.innerHTML = "";

    renderComponent(createMockDetailedUser());

    // Собираем новый текст для кнопки из переводов
    const buttonText3 = `${updateInLabel}${timerValue3}${secondsLabel}`;

    const buttons3s = screen.getAllByText(buttonText3);
    expect(buttons3s.length).toBeGreaterThan(0);
  });

  it("возвращает кнопку обновления после истечения таймера", () => {
    // Сначала рендерим с активным таймером
    const timerValue = 1;
    (useTimer as any).mockReturnValue({
      timer: timerValue,
      setTimer: mockSetTimer,
    });

    renderComponent(createMockDetailedUser());

    // Собираем текст для кнопки из переводов
    const updateInLabel = getTranslatedText("update_in");
    const secondsLabel = getTranslatedText("seconds");
    const buttonText = `${updateInLabel}${timerValue}${secondsLabel}`;

    const timerButtons = screen.getAllByText(buttonText);
    expect(timerButtons.length).toBeGreaterThan(0);

    // Проверяем что кнопки обновления нет
    expect(
      screen.queryByTestId("refresh-tips-token-button"),
    ).not.toBeInTheDocument();

    // Очищаем DOM перед перерендерингом
    document.body.innerHTML = "";

    (useTimer as any).mockReturnValue({
      timer: 0,
      setTimer: mockSetTimer,
    });

    // Перерендериваем компонент
    renderComponent(createMockDetailedUser());

    // Проверяем, что кнопка обновления вернулась
    expect(screen.getByTestId("refresh-tips-token-button")).toBeInTheDocument();

    // Проверяем, что кнопка с таймером исчезла
    const timerTextElements = screen.queryAllByText(
      (content) =>
        typeof content === "string" && content.includes(updateInLabel!),
    );
    expect(timerTextElements.length).toBe(0);
  });
});
