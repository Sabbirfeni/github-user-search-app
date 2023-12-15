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
        console.log(err.message);
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
        console.log(err.message);
    }
}

function createCard(profile) {
    const profileCard = `
        <div>
            <div>
                <img src='${profile.avatar_url}'/>
            </div>
            <div>
                ${profile.login}
            </div>
            <div>
                ${profile.bio}
            </div>
        </div>
    `
    document.querySelector('.main').innerHTML = profileCard;
}

function addToCard(reposes) {
    let serial = 1;
    reposContainer.innerHTML = '';
    let reposHTML = ``;
    reposes.forEach(repos => {
        reposHTML += `
        <div>
            ${serial} - ${repos.name}
        </div>
    `
        serial++;
    });
    document.querySelector('.repos').innerHTML = reposHTML;
}

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();

    const user = document.querySelector('.search').value;
    if(user) {
        getUsers(user);
        getRepos(user);
    } else {
        console.log('did not found')
    }
})
