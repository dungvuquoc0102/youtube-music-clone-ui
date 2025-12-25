export default function Login() {
  return (
    <div>
      <h2>Login Page</h2>
      <form className="js-login-form">
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export function loginScript() {
  const formLoginEl = document.querySelector(".js-login-form");
  formLoginEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formLoginEl);
    const username = formData.get("username");
    const password = formData.get("password");

    // Simple validation (for demonstration purposes)
    if (username === "admin" && password === "password") {
      alert("Login successful!");
    } else {
      alert("Invalid username or password.");
    }
  });
}
