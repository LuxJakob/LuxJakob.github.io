document.addEventListener('DOMContentLoaded', async function() {
    const sections = ['resume', 'skills', 'projects', 'contact'];
    const preloadPromises = sections.map(section =>
        fetch(`sections/${section}.html`)
            .then(response => response.ok ? response.text() : '')
            .catch(() => '')
    );

    const loadedSections = await Promise.all(preloadPromises);

    sections.forEach((section, index) => {
        if (loadedSections[index]) {
            document.getElementById(section).innerHTML = loadedSections[index];

            if (section === 'skills') {
                initializeSkillMatrix();
            }
            else if (section === 'resume') {
                initializeImageExpander();
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
            title: "Programming & Scripting",
            skills: [
                { name: "Python", level: 5 },
                { name: "C#", level: 5 },
                { name: "Bash/Shell", level: 5 },
                { name: "HTML/CSS", level: 4 },
                { name: "Visual Basic", level: 3 },
                { name: "Java/Groovy", level: 3 },
                { name: "FORTRAN", level: 2 },
                { name: "COBOL", level: 2 },
                { name: "JavaScript", level: 1 }
            ]
        },
        {
            title: "System Administration & Platforms",
            skills: [
                { name: "Linux/Ubuntu", level: 5 },
                { name: "IntelliJ IDEA", level: 4 },
                { name: "Visual Studio Code", level: 4 },
                { name: "Visual Studio", level: 3 }
            ]
        },
        {
            title: "DevOps & Automation",
            skills: [
                { name: "Git", level: 5 },
                { name: "Jenkins", level: 5 },
                { name: "SonarQube", level: 4 },
                { name: "Docker", level: 3 },
                { name: "AWS", level: 3 },
                { name: "Infrastructure as Code (IaC)", level: 2 },
                { name: "Kubernetes", level: 1 },
            ]
        },
        {
            title: "Databases & Querying",
            skills: [
                { name: "SQL", level: 5 },
                { name: "PostgreSQL", level: 5 },
                { name: "DBeaver", level: 5 },
                { name: "Grafana", level: 3 }
            ]
        },
        {
            title: "Methodologies & Soft Skills",
            skills: [
                { name: "DORA Metrics", level: 5 },
                { name: "Agil (Scrum/DevOps)", level: 4 },
                { name: "Kommunikation", level: 4 },
                { name: "Problem-Solving", level: 4 },
                { name: "Englisch", level: 4 }
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
        const details = document.createElement('details');
        details.className = 'skill-category';
        details.open = true;

        const summary = document.createElement('summary');
        summary.className = 'skill-category-header';
        summary.innerHTML = `${category.title}<span class="icon chevron"></span>`;

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

        details.appendChild(summary);
        details.appendChild(tableWrapper);
        container.appendChild(details);
    });
}

function initializeImageExpander() {
    setTimeout(() => {
        const profileImage = document.querySelector('#resume .image.main img');
        if (!profileImage) return;

        const originalWidth = profileImage.style.width || '25%';
        let isExpanded = false;

        profileImage.style.cursor = 'pointer';

        profileImage.addEventListener('click', function(e) {
            e.stopPropagation();

            if (isExpanded) {
                profileImage.style.width = originalWidth;
            } else {
                profileImage.style.width = '100%';
            }

            isExpanded = !isExpanded;
        });

        document.addEventListener('click', function() {
            if (isExpanded) {
                profileImage.style.width = originalWidth;
                isExpanded = false;
            }
        });

        const imageContainer = document.querySelector('#resume .image.main');
        if (imageContainer) {
            imageContainer.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }, 100);
}