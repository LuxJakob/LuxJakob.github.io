// Wait for the main.js navigation to complete
document.addEventListener('navigationComplete', function() {
    if (window.location.hash === '#contact') {
        setTimeout(function() {
            alert("This page is still work-in-progress!!");
        }, 100); // Slightly longer delay to ensure transition completes
    }
});