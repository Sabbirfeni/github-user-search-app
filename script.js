const USER_API = 'https://api.github.com/users/';
const reposContainer = document.querySelector('.repos');

async function getUsers(userName) {
    try {
        const response = await fetch(USER_API + userName);
        if(response.status !== 200) {
            throw new Error('Did not found.')
        }
        const data = await response.json();
        console.log(data)
        createCard(data);
    } catch(err) {
        document.querySelector('.initial-text').innerHTML = 'Did not found'
    }
}
async function getRepos(userName) {
    try {
        const response = await fetch(USER_API + userName + '/repos');
        if(response.status !== 200) {
            throw new Error('Did not found.')
        }
        const data = await response.json();
        console.log(data)
        addToCard(data);
    } catch(err) {
        document.querySelector('.initial-text').innerHTML = 'Did not found'
    }
}

function createCard(profile) {
    const profileCard = `
        <div class="profile-info">
            <div class="profile-image-container">
                
            <img src="${profile.avatar_url}" alt="profile image"> <!-- Profile image -->
            </div>
            <div class="profile-details">
                <h2>${profile.name}</h2>
                <p>${profile.login}</p>
                <h5>${profile.bio}</h5>
                <button ><a href='${profile.html_url}' target='_blank'>Visit full profile</a></button>
            </div>
        </div>
    `
    document.querySelector('.left-body').innerHTML = profileCard;
}

function addToCard(reposes) {
    reposContainer.innerHTML = '';
    let reposHTML = ``;
    reposes.forEach(repos => {
        reposHTML += `
        <div class="represitory">
            <div class="represitory-header">
                <a href="${repos.html_url}" target='_blank'>${repos.name}</a>
                <p class="represitory-status">${repos.visibility}</p>
            </div>
            <p class="represitory-language"><div class="badge"> </div>${repos.language}</p>
        </div>
    `
    });
    document.querySelector('.represitories').innerHTML = reposHTML;
}

document.querySelector('.form').addEventListener('keydown', e => {

    if(e.key === 'Enter') {
        e.preventDefault();
        document.querySelector('.initial-text').innerHTML = 'Loading...'
        const user = document.querySelector('.search').value;
        if(user) {
            getUsers(user);
            getRepos(user);
        } else {
            document.querySelector('.initial-text').innerHTML = 'Please enter a username'
        }
    }
})
