$(document).ready(() => {
    var user_id = localStorage.getItem('id');
    function loadProfile() {
        $.ajax({
            url: 'http://localhost:4000/user/profile/' + user_id,
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    var full_name = `${data[0].fname} ${data[0].mname} ${data[0].lname}`;
                    $('#profile-name').html(full_name);
                    $('#profile-email').html(data[0].email);
                    // other details are .role, .fname, .mname, .lname, .contact, .birthdate, .address
                }   
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    loadProfile();
});