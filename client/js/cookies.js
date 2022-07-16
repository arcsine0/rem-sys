$(document).ready(() => {
    var username = localStorage.getItem('username');
    var role = localStorage.getItem('role');

    $('.adminControls').hide();
    $('#user-type').html(username);

    if (role == 'admin' ||  role == 'staff') {
        $('.memberControls').hide();
        $('.adminControls').show();
    }
});