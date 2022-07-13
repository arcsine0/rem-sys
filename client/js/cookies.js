$(document).ready(() => {
    var username = localStorage.getItem('username');
    var role = localStorage.getItem('role');

    var adminControls = $('.adminControls');
    adminControls.hide();

    $('#validate').hide();
    $('#user-type').html(username);

    if (role == 'admin' ||  role == 'staff') {
        adminControls.toggle();
        $('#payment').hide();
        $('#validate').show();
    }
});