$(document).ready(() => {
    var username = localStorage.getItem('username');
    console.log(username);

    $('#nav-username').html(username);
});