// Fetch GitHub repositories dynamically
const GITHUB_USERNAME = 'boshuua';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

async function fetchGitHubRepos() {
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        const repos = await response.json();

        // Sort by last updated date (most recent first)
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        document.getElementById('projects-container').innerHTML =
            '<p class="error-message">Unable to load repositories. Please try again later.</p>';
    }
}

function displayRepos(repos) {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';

    repos.forEach(repo => {
        const repoCard = createRepoCard(repo);
        projectsContainer.appendChild(repoCard);
    });
}

function createRepoCard(repo) {
    const card = document.createElement('a');
    card.className = 'prj-card edu-prj-card';
    card.href = repo.html_url;
    card.target = '_blank';

    const lastUpdated = new Date(repo.updated_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const language = repo.language ? `<span class="repo-language">${repo.language}</span>` : '';
    const description = repo.description || 'No description available';
    const stars = repo.stargazers_count > 0 ? `<span class="repo-stats">⭐ ${repo.stargazers_count}</span>` : '';
    const forks = repo.forks_count > 0 ? `<span class="repo-stats">🔱 ${repo.forks_count}</span>` : '';

    card.innerHTML = `
        <div>
            <div class="repo-header">
                <h3>${repo.name}</h3>
                ${language}
            </div>
            <p class="repo-date">Last Updated: ${lastUpdated}</p>
            <p class="repo-description">${description}</p>
            <div class="repo-stats-container">
                ${stars}
                ${forks}
            </div>
        </div>
    `;

    return card;
}

// Contact form handler
document.addEventListener('DOMContentLoaded', () => {
    // Fetch GitHub repos on page load
    fetchGitHubRepos();

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form. To make it functional, you would need to set up a backend service or use a service like Formspree.');
        });
    }
});
