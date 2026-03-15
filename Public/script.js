document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const text = await response.text();

        let result;

        try {
          result = JSON.parse(text);
        } catch (err) {
          console.error("Server response not valid JSON:", text);
          alert("Server error. Check console.");
          return;
        }

        if (result.success) {
          alert("Message sent successfully!");
          contactForm.reset();
        } else {
          alert("Error sending message.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to send message.");
      }
    });
  }
});
