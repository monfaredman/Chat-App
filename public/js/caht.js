const socket = io();

socket.on("message", (msg) => {
  console.log(msg);
});

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("submitFormData", message);
});

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser!");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  });
});
