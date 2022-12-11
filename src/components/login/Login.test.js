import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login.component";

describe("add elements", () => {
  it("has an input: User Name", () => {
    render(<Login />);
    const userNameInput = screen.getByPlaceholderText("User Name");
    expect(userNameInput).toBeInTheDocument();
  });

  it("has an input: Password", () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("has a button: Login", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});

describe("button disabled/enabled", () => {
  it("should be disabled if username.length is 0", () => {
    render(<Login />);
    const userNameInput = screen.getByPlaceholderText("User Name");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(userNameInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });

    expect(loginButton).toBeDisabled();
  });

  it("should be disabled if password.length is 0", () => {
    render(<Login />);
    const userNameInput = screen.getByPlaceholderText("User Name");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(userNameInput, { target: { value: "abchung" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    expect(loginButton).toBeDisabled();
  });

  it("should be enabled if username.length > 0 or password.length > 0", () => {
    render(<Login />);
    const userNameInput = screen.getByPlaceholderText("User Name");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.change(userNameInput, { target: { value: "abchung" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    expect(loginButton).toBeEnabled();
  });
});

describe("api functionality", () => {
  it("should return a 401 when incorrect username or password entered", async () => {
    render(<Login />);
    const userNameInput = screen.getByPlaceholderText("User Name");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(userNameInput, { target: { value: "abchung1" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    const loginButton = screen.getByRole("button", /login/i);
    await fireEvent.click(loginButton, { name: /login/i });

    const alertmessage = await screen.findByRole("alert");
    expect(alertmessage).toHaveTextContent("Invalid Credentials");
  });

  it("should return a 200 and alertmessage should not appear when correct credentials are entered", async () => {
    render(<Login />);
    const userNameInput = screen.getByPlaceholderText("User Name");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(userNameInput, { target: { value: "abchung" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    const loginButton = screen.getByRole("button", /login/i);
    await fireEvent.click(loginButton, { name: /login/i });
    const alertmessage = await screen.findByRole("alert");
    expect(alertmessage).toBeNull();
  });
});
