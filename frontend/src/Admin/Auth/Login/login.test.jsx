import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Login from "./login";

const mockNavigate = jest.fn();

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
}

beforeEach(() => {
  axios.post.mockReset();
  mockNavigate.mockReset();
});

test("does not sign in when the email or password is invalid", () => {
  renderLogin();

  fireEvent.change(screen.getByPlaceholderText("E-mail"), {
    target: { name: "email", value: "not-an-email" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));

  expect(screen.getByText("Format d'email invalide")).toBeInTheDocument();
  expect(
    screen.getByText("Le mot de passe doit contenir au moins 1 caractère")
  ).toBeInTheDocument();
  expect(axios.post).not.toHaveBeenCalled();
});

test("signs in when the email and password are valid", async () => {
  axios.post.mockResolvedValue({
    data: { token: "token", admin: { fullname: "Ada" } },
  });
  renderLogin();

  fireEvent.change(screen.getByPlaceholderText("E-mail"), {
    target: { name: "email", value: "ada@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
    target: { name: "password", value: "secret" },
  });
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));
  });

  expect(axios.post).toHaveBeenCalledWith(
    expect.stringMatching(/\/api\/signin$/),
    { email: "ada@example.com", password: "secret" }
  );
  expect(mockNavigate).toHaveBeenCalledWith(
    "/touil_team_dashboard/statistiques"
  );
});
