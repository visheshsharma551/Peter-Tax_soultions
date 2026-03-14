document.addEventListener("DOMContentLoaded", function () {
  /* =============================
     ACCORDION
  ============================== */
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  /* =============================
     EMAILJS INTEGRATION
  ============================== */

  //   // Only proceed if emailjs is loaded
  //   if (typeof emailjs !== "undefined") {
  //     emailjs.init("n2tUThZlzGObpkhgC"); // <-- replace with your public key

  //     const appointmentForm = document.getElementById("appointment-form");
  //     const contactForm = document.getElementById("contact-form");

  //     // Appointment form submission
  //     if (appointmentForm) {
  //       appointmentForm.addEventListener("submit", function (e) {
  //         e.preventDefault();

  //         emailjs
  //           .sendForm("service_two5j8b", "template_4rryivj", this) // replace with your Service ID & Template ID
  //           .then(() => {
  //             alert("Appointment request sent successfully!");
  //             appointmentForm.reset();
  //           })
  //           .catch((error) => {
  //             console.error("EmailJS error:", error);
  //             alert("Error sending appointment request.");
  //           });
  //       });
  //     }

  //     // Contact form submission
  //     if (contactForm) {
  //       contactForm.addEventListener("submit", function (e) {
  //         e.preventDefault();

  //         emailjs
  //           .sendForm("service_two5j8b", "template_4rryivj", this)
  //           .then(() => {
  //             alert("Message sent successfully!");
  //             contactForm.reset();
  //           })
  //           .catch((error) => {
  //             console.error("EmailJS error:", error);
  //             alert("Error sending message.");
  //           });
  //       });
  //     }
  //   } else {
  //     console.warn("EmailJS SDK not loaded.");
  //   }

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

      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully!");
        this.reset();
      } else {
        alert("Error sending message.");
      }
    });
});
