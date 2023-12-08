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
       device: data.devices.brand,
       ip: data.ip,
       time: new Date().toLocaleString(),
     };
  }
 
  // Function to send data to Discord via webhook
  async function sendToDiscord(data) {
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
 
     return response.ok;
  }
 
  // Call the function to get user information and send it to Discord
  getUserInformation().then((data) => {
     sendToDiscord(data);
  });
 });