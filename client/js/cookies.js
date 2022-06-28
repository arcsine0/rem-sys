$(document).ready(() => {
    var username = localStorage.getItem('username');
    var role = localStorage.getItem('role');

    var adminControls = $('.adminControls');
    adminControls.hide();

    $('#nav-username').html(username);

    if (role == 'admin' || role == 'staff') {
        adminControls.toggle();
    }
});