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
    const response = await fetch(
      "https://api.ipregistry.co/?key=zqx0w4uhrljxqldg"
    );
    const data = await response.json();

    return {
      city: data.location.city,
      device: data.device_type,
      ip: data.ip,
      time: new Date().toLocaleString(),
    };
  }

// Function to send data to Discord via webhook
async function sendToDiscord(data) {
  const url = "https://discord.com/api/webhooks/1182580231261921290/GQNh98TtfoIS16xTY-6MlhtMBGC7ubRyvqX_qP8_arP6Mr9u74xWwpD6zV_8f01IvbnV";
 
  const message = {
     content: `New user visit detected:`,
     embeds: [
       {
         color: 3447003,
         fields: [
           {
             name: "City",
             value: data.city,
             inline: true,
           },
           {
             name: "Device",
             value: data.device,
             inline: true,
           },
           {
             name: "IP",
             value: data.ip,
             inline: true,
           },
           {
             name: "Time",
             value: data.time,
             inline: true,
           },
         ],
       },
     ],
  };
 
  const response = await fetch(url, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(message),
  });
 
  return response.ok;
 }

  // Call the function to get user information and send it to Discord
  getUserInformation().then((data) => {
    sendToDiscord(data);
  });
});
