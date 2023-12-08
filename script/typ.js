document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Your custom function to detect the user's location and device information
  async function getUserInformation() {
    try {
      const response = await fetch(
        "https://api.ipregistry.co/?key=zqx0w4uhrljxqldg"
      );
      const data = await response.json();

      // Check if 'devices' object exists
      const device = data.devices ? data.devices.brand : "Unknown Device";

      return {
        city: data.location.city,
        device: device,
        ip: data.ip,
        time: new Date().toLocaleString(),
      };
    } catch (error) {
      console.error("Failed to fetch user information:", error);
      throw error; // rethrow the error to handle it later if needed
    }
  }

  // Function to send data to Discord via webhook
  async function sendToDiscord(data) {
    try {
      const url =
        "https://discord.com/api/webhooks/1182580231261921290/GQNh98TtfoIS16xTY-6MlhtMBGC7ubRyvqX_qP8_arP6Mr9u74xWwpD6zV_8f01IvbnV";
      const message = `Ada seorang user mengunjungi website anda:\n\n- City: ${data.city}\n- Device: ${data.device}\n- IP: ${data.ip}\n- Time: ${data.time}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: message }),
      });

      if (!response.ok) {
        console.error("Failed to send data to Discord:", response.statusText);
      }

      return response.ok;
    } catch (error) {
      console.error("Error in sending data to Discord:", error);
      throw error; // rethrow the error to handle it later if needed
    }
  }

  // Call the function to get user information and send it to Discord
  getUserInformation()
    .then((data) => sendToDiscord(data))
    .catch((error) => console.error("Failed to get and send user information:", error));
});
