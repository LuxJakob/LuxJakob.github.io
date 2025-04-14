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

            // Initialize skill matrix if this is the skills section
            if (section === 'skills') {
                initializeSkillMatrix();
            }
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

function initializeSkillMatrix() {
    const skillCategories = [
        {
            title: "Programming Languages",
            skills: [
                { name: "Python", level: 4 },
                { name: "C#", level: 5 },
                { name: "Java/Groovy", level: 2 },
                { name: "TypeScript", level: 1 },
                { name: "HTML/CSS", level: 2 }
            ]
        },
        {
            title: "DevOps & CI/CD",
            skills: [
                { name: "Jenkins", level: 5 },
                { name: "Kubernetes", level: 1 },
                { name: "Helm", level: 2 },
                { name: "Docker", level: 3 },
                { name: "AWS", level: 1 }
            ]
        },
        {
            title: "Databases",
            skills: [
                { name: "DBeaver", level: 5 },
                { name: "PostgreSQL", level: 5 },
                { name: "SQL", level: 5 }
            ]
        },
        {
            title: "Linux & SysAdmin",
            skills: [
                { name: "Linux/Ubuntu", level: 5 },
                { name: "Bash/Shell", level: 5 }
            ]
        },
        {
            title: "Tools & Platforms",
            skills: [
                { name: "Git", level: 5 },
                { name: "Grafana", level: 2 },
                { name: "JFrog Artifactory", level: 3 },
                { name: "SonarQube", level: 4 }
            ]
        },
        {
            title: "Soft Skills",
            skills: [
                { name: "Teamwork (Scrum/DevOps)", level: 4 },
                { name: "Problem-Solving", level: 4 },
                { name: "Communication", level: 5 }
            ]
        }
    ];

    function generateStars(level) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            const starType = i < level ? 'solid' : 'regular';
            stars += `<span class="icon ${starType} fa-star"></span>`;
        }
        return stars;
    }

    const container = document.getElementById('skillTablesContainer');

    skillCategories.forEach(category => {
        // Create category heading
        const heading = document.createElement('h3');
        heading.textContent = category.title;
        container.appendChild(heading);

        // Create table
        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'table-wrapper';

        const table = document.createElement('table');
        table.className = 'skill-table';

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Skill</th>
                <th>Proficiency</th>
            </tr>
        `;

        const tbody = document.createElement('tbody');

        category.skills.forEach(skill => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${skill.name}</td>
                <td>${generateStars(skill.level)}</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        tableWrapper.appendChild(table);
        container.appendChild(tableWrapper);
    });
}