import { screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/features/auth";
import { getCurrentUser, TokenService } from "@/shared/lib";
import { createTranslationMock, renderWithProviders } from "@/shared/testing";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(() => "/protected"),
}));

vi.mock("@/shared/lib", () => ({
  TokenService: {
    getAccessToken: vi.fn(() => "mock-token"),
    refreshToken: vi.fn(() =>
      Promise.resolve({ newAccessToken: "new-mock-token" }),
    ),
  },
  getCurrentUser: vi.fn(() => ({ id: 1, name: "Test User" })),
  ROLES: {
    ADMIN: "Admin",
    WebUser: "WebUser",
  },
}));

vi.mock("@/shared/stores/AuthStore", () => ({
  authStore: {
    login: vi.fn(),
    isAccess: vi.fn(() => true),
  },
}));

vi.mock("@/shared/locale/translations", () => ({
  useTranslations: vi.fn(),
}));

describe("AuthProvider", () => {
  let pushMock: any;

  beforeEach(() => {
    pushMock = vi.fn();

    // Теперь `useRouter` правильно мокается
    (useRouter as any).mockReturnValue({ push: pushMock });
    createTranslationMock();
  });

  it("renders children when authenticated", async () => {
    renderWithProviders(
      <AuthProvider>
        <div data-testid="protected-content">Protected Content</div>
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    });
  });

  it("redirects to login when authentication is required and no token", async () => {
    (TokenService.getAccessToken as any).mockReturnValue(undefined);
    (getCurrentUser as any).mockReturnValue(null);

    renderWithProviders(
      <AuthProvider>
        <div data-testid="protected-content">Protected Content</div>
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  it("refreshes token if no access token is present", async () => {
    (TokenService.getAccessToken as any).mockReturnValue(undefined);
    renderWithProviders(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(TokenService.refreshToken).toHaveBeenCalled();
    });
  });
});
