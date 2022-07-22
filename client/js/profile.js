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
                    $('#nick').html(data[0].fname);
                    $('.user-name').html(full_name);
                    $('.user-email').html(data[0].email);
                    $('.user-address').html(data[0].address);
                    $('.user-contact').html(data[0].contact);
                    $('#user-bio').html(data[0].bio);

                    $('#fname').val(data[0].fname);
                    $('#mname').val(data[0].mname);
                    $('#lname').val(data[0].lname);
                    $('#email').val(data[0].email);
                    $('#contact').val(data[0].contact);
                    $('#bio').val(data[0].bio);

                    $('#old-pass').val(data[0].password);
                    // other details are .role, .fname, .mname, .lname, .contact, .birthdate, .address
                }   
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    loadProfile();
    var update;
    $('#update_profile').on('click', () => {
        var f_data = $('#account-settings').serializeArray();
        f_data.push({name: 'id', value: user_id});
        
        update = account;
        $.ajax({
            url: `http://localhost:4000/user/profile/update/${update}`,
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            type: 'POST',
            data: f_data,
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    if (data == 'success') {
                        console.log('saved');
                        loadProfile();
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
    $('#update_pass').on('click', () => {
        var data = [{name: 'id', value: user_id}, {name: 'password', value: $('#new-pass').val()}];
        update = security;
        $.ajax({
            url: `http://localhost:4000/user/profile/update/${update}`,
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            type: 'POST',
            data: data,
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    if (data == 'success') {
                        console.log('saved');
                        loadProfile();
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
});