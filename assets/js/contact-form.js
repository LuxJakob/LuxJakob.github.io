document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contact-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const response = await fetch("https://api.github.com/repos/LuxJakob/LuxJakob.github.io/actions/workflows/message.yml/dispatches", {
            method: "POST",
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "Authorization": "Bearer YOUR_PERSONAL_ACCESS_TOKEN",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ref: "main",
                inputs: { name, email, message }
            })
        });

        if (response.ok) {
            alert("Message triggered successfully!");
        } else {
            alert("Error triggering message.");
        }
    });
});
