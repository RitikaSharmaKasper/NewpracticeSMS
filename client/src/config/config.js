let BASE_URL;

// If running on localhost (your own computer)
if (window.location.hostname === "localhost") {
    BASE_URL = `http://localhost:5000/api`;
} else {
    // If accessed from LAN IP or another device
    BASE_URL = `http://192.168.1.37:5000/api`; // <-- replace with your computer's IP
}

export default BASE_URL; 