import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { vi } from "vitest";
import { TokenService, getCurrentUser } from "@/shared/lib";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(() => "/protected"),
}));

vi.mock("@/shared/lib", () => ({
  TokenService: {
    getAccessToken: vi.fn(() => "mock-token"),
    refreshToken: vi.fn(() => Promise.resolve({ newAccessToken: "new-mock-token" })),
  },
  getCurrentUser: vi.fn(() => ({ id: 1, name: "Test User" })),
}));

vi.mock("@/shared/stores/AuthStore", () => ({
  authStore: {
    login: vi.fn(),
    isAccess: vi.fn(() => true),
  },
}));

describe("AuthProvider", () => {
  let pushMock;

  beforeEach(() => {
    pushMock = vi.fn();
    useRouter.mockReturnValue({ push: pushMock });
  });

  it("renders children when authenticated", async () => {
    render(
      <AuthProvider>
        <div data-testid="protected-content">Protected Content</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    });
  });

  it("redirects to login when authentication is required and no token", async () => {
    TokenService.getAccessToken.mockReturnValue(undefined);
    getCurrentUser.mockReturnValue(null);

    render(
      <AuthProvider>
        <div data-testid="protected-content">Protected Content</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });

  it("refreshes token if no access token is present", async () => {
    TokenService.getAccessToken.mockReturnValue(undefined);
    render(<AuthProvider><div>Test</div></AuthProvider>);

    await waitFor(() => {
      expect(TokenService.refreshToken).toHaveBeenCalled();
    });
  });

  it("shows loading state initially", () => {
    render(<AuthProvider><div>Test</div></AuthProvider>);
    expect(screen.getByText(/please_wait_loading/i)).toBeInTheDocument();
  });
});
