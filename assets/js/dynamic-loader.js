document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('navigationComplete', function() {
        loadCurrentSection();
    });

    loadCurrentSection();
});

async function loadCurrentSection() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    try {
        const response = await fetch(`sections/${hash}.html`);
        if (!response.ok) return;

        const html = await response.text();
        document.getElementById(hash).innerHTML = html;
    } catch (error) {
        console.error('Failed to load section:', error);
    }
}