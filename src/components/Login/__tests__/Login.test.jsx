import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "..";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "Abel" },
    }),
  },
}));

describe("Renders Inputs", () => {
  render(<Login />);
  test("renders username input", () => {
    const usernameEl = screen.getByPlaceholderText(/username/i);
    expect(usernameEl).toBeInTheDocument();
  });
  test("renders password input", () => {
    render(<Login />);
    const passwordEl = screen.getByPlaceholderText(/password/i);
    expect(passwordEl).toBeInTheDocument();
  });
});

describe("Form interaction", () => {
    test("does not render error message", () => {
      render(<Login />);
      const errorEl = screen.getByTestId("error");
      expect(errorEl).not.toBeVisible();
    });

    test("button is disabled before typing", () => {
      render(<Login />);
      const button = screen.getByRole("button", { name: "Login" });
      expect(button).toBeDisabled();
    });
    test("can fill form and render button", () => {
      render(<Login />);
      const usernameEl = screen.getByPlaceholderText(/username/i);
      const passwordEl = screen.getByPlaceholderText(/password/i);
      const button = screen.getByRole("button", { name: "Login" });

      const val = "test";
      fireEvent.change(usernameEl, { target: { value: val } });
      fireEvent.change(passwordEl, { target: { value: val } });

      expect(usernameEl.value).toBe(val);
      expect(passwordEl.value).toBe(val);

      expect(button).not.toBeDisabled();
    });

    test("click button and render user", async () => {
      render(<Login />);
      const usernameEl = screen.getByPlaceholderText(/username/i);
      const passwordEl = screen.getByPlaceholderText(/password/i);
      const button = screen.getByRole("button", { name: "Login" });

      const val = "test";
      fireEvent.change(usernameEl, { target: { value: val } });
      fireEvent.change(passwordEl, { target: { value: val } });

      expect(usernameEl.value).toBe(val);
      expect(passwordEl.value).toBe(val);

      fireEvent.click(button);
      const nameEl = await screen.findByText("Abel");
      await waitFor(() => expect(nameEl).toBeInTheDocument());
    });

    test("renders loading status", async () => {
      render(<Login />);
      const usernameEl = screen.getByPlaceholderText(/username/i);
      const passwordEl = screen.getByPlaceholderText(/password/i);
      const button = screen.getByRole("button", { name: "Login" });

      const val = "test";
      fireEvent.change(usernameEl, { target: { value: val } });
      fireEvent.change(passwordEl, { target: { value: val } });

      expect(usernameEl.value).toBe(val);
      expect(passwordEl.value).toBe(val);

      fireEvent.click(button);
      await waitFor(() => expect(button).toHaveTextContent("please wait"));
    });

})
