const API_URL = "http://localhost:3050/api/contact";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !email || !message) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, message })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to send message");
      return;
    }

    alert("Message sent successfully!");
    document.querySelector("form").reset();

  } catch (error) {
    console.error("Contact Form Error:", error);
    alert("Something went wrong");
  }
});
