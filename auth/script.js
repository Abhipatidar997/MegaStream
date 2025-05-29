function toggleLogin() {
  document.querySelector(".container").classList.remove("log-in");
}
function toggleSignup() {
  document.querySelector(".container").classList.add("log-in");
}

function handleLogin(event) {
  event.preventDefault();

  const data = {
    username: document.getElementById('loginUsername').value,
    password: document.getElementById('loginPassword').value
  };

  fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.token) {
        // ✅ Token aur user info localStorage me save karo
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        alert("Login successful!");
        // ✅ Redirect to home page
        window.location.href = "../index.html";
      } else {
        alert(res.message);
      }
    })
    .catch(err => alert("Login failed: " + err));
}

function handleSignup(event) {
  event.preventDefault();

  const data = {
    email: document.getElementById('signupEmail').value,
    fullname: document.getElementById('signupName').value,
    username: document.getElementById('signupUsername').value,
    password: document.getElementById('signupPassword').value
  };

  fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      alert(res.message || "Signup success!");
    })
    .catch(err => alert("Signup failed: " + err));
}
