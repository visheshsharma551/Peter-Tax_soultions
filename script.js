document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      message: this.message.value,
    };

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        console.error("Server response not valid JSON.");
      }

      if (result.success) {
        alert("Message sent successfully!");
        this.reset();
      } else {
        alert("Error sending message.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to send message. Check server logs.");
    }
  });
