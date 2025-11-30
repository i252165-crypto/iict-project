document.addEventListener('DOMContentLoaded', function () {

    initAuthState();

});

function initAuthState() {
    const authState = getAuthState();

    if (authState.isLoggedIn) {

        updateHeaderForLoggedInUser(authState.username);
    } else if (authState.isSignedUp) {

        updateHeaderForSignedUpUser();
    }


}

function getAuthState() {
    return {

        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
        isSignedUp: localStorage.getItem('isSignedUp') === 'true',
        username: localStorage.getItem('username') || ''


    };

}

function authenticationstate(state) {
    if (state.isLoggedIn !== undefined) {

        localStorage.setItem('isLoggedIn', state.isLoggedIn);
    }
    if (state.isSignedUp !== undefined) {
        localStorage.setItem('isSignedUp', state.isSignedUp);
    }
    if (state.username !== undefined) {

        localStorage.setItem('username', state.username);
    }
}

function updateHeaderForLoggedInUser(username) {

    const header = document.querySelector('header');
    if (!header) return;

    // removes the login and signup buttons

    const loginButton = header.querySelector('a[href="login.html"]')?.parentElement;
    const signupButton = header.querySelector('a[href="signup.html"]')?.parentElement;

    if (loginButton) loginButton.remove();
    if (signupButton) signupButton.remove();

    // add the username and logout button
    if (!header.querySelector('.username-display')) {

        const usernameDiv = document.createElement('div');
        usernameDiv.className = 'username-display';
        usernameDiv.innerHTML = `<span class="inria-sans-regular" style="color: #34F584; font-size: 18px; padding: 10px;">Welcome, ${username}</span>`;
        header.appendChild(usernameDiv);
    }

    if (!header.querySelector('.logout-button')) {
        const logoutDiv = document.createElement('div');
        logoutDiv.innerHTML = `<button class="inria-sans-regular box-button logout-button">Logout</button>`;
        header.appendChild(logoutDiv);

        const logoutBtn = header.querySelector('.logout-button');
        logoutBtn.addEventListener('click', logout);


    }
}
function updateHeaderForSignedUpUser() {
    const header = document.querySelector('header');
    if (!header) return;

    // Remove only the Sign Up button
    const signupButton = header.querySelector('a[href="signup.html"]')?.parentElement;
    if (signupButton) signupButton.remove();



}
function handleLogin(event) {
    event.preventDefault();

    const form = event.target;
    const username = form.querySelector('input[name="username"]').value;

    // Set logged in
    authenticationstate({
        isLoggedIn: true,
        isSignedUp: false,
        username: username
    });

    window.location.href = 'home.html';



}
function handleSignup(event) {
    event.preventDefault();

    const form = event.target;
    const username = form.querySelector('input[name="username"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const confirmPassword = form.querySelector('input[name="confirm_password"]').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Set signed up
    authenticationstate({
        isLoggedIn: false,
        isSignedUp: true,
        username: username
    });

    window.location.href = 'home.html';


}
document.addEventListener('DOMContentLoaded', function () {
    // Check if on login page

    const loginForm = document.querySelector('form[action="home.html"]');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Check if on signup page
    const signupForm = document.querySelector('form[action="home.html"]');
    if (signupForm && window.location.pathname.includes('signup.html')) {
        signupForm.addEventListener('submit', handleSignup);
    }
});


function logout() {
    // Clear data

    localStorage.clear();

    window.location.href = 'home.html';
}