document.addEventListener('DOMContentLoaded', async function() {
    // Preload all sections at once
    const sections = ['resume', 'skills', 'projects', 'contact'];
    const preloadPromises = sections.map(section =>
        fetch(`sections/${section}.html`)
            .then(response => response.ok ? response.text() : '')
            .catch(() => '')
    );

    const loadedSections = await Promise.all(preloadPromises);

    // Store sections in memory
    sections.forEach((section, index) => {
        if (loadedSections[index]) {
            document.getElementById(section).innerHTML = loadedSections[index];
        }
    });

    // Handle hash changes if needed
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && sections.includes(hash)) {
            document.getElementById(hash).scrollIntoView();
        }
    });
});