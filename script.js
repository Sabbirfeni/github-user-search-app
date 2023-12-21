const USER_API = 'https://api.github.com/users/';
const reposContainer = document.querySelector('.repos');
const leftBody = document.querySelector('.left-body');
const initialText = document.querySelector('.initial-text');
const represitories = document.querySelector('.represitories');

async function getUsers(userName) {
    try {
        
        const response = await fetch(USER_API + userName);
        if(response.status !== 200) {
            throw new Error('Did not found.')
        }
        const data = await response.json();
        leftBody.style.display = 'block';
        createCard(data);
    } catch(err) {
        leftBody.style.display = 'none';
    }
}
async function getRepos(userName) {
    
    try {
        
        const response = await fetch(USER_API + userName + '/repos');
        if(response.status !== 200) {
            throw new Error('Did not found.')
        }
        const data = await response.json();
        represitories.style.display = 'grid'
        addToCard(data);
        initialText.style.display = 'none'
    } catch(err) {
        represitories.style.display = 'none'
        initialText.style.display = 'flex'
        initialText.innerHTML = 'Did not found'
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
    leftBody.classList.add('active');
    leftBody.innerHTML = profileCard;
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
    const inputValue = e.target.value
    
    if(e.key === 'Enter') {
        e.preventDefault();
        if(inputValue == '') {
            console.log('inputValue')
            initialText.style.display = 'flex'
            initialText.innerHTML = 'Please enter a username'
            leftBody.style.display = 'none';
            represitories.style.display = 'none'
            return
        }
        
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
