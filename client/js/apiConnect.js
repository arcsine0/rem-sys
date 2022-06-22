$(document).ready(() => {
    console.log('api ready!');

    $('#login').on('click', () => {
        var f_data = $('form').serializeArray();
        var email = f_data[0].value;
        var pass = f_data[1].value;

        // test@email.com
        var url = `http://localhost:4000/user/${email}/${pass}`;
        $.ajax({
            url: url,
            type: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    if (data == 'success') {
                        location.href = '../index.html';
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }

        });
    });

    $('#register').on('click', () => {
        var f_data = $('form').serializeArray();
        var json_data = JSON.stringify(f_data);
        var url = `http://localhost:4000/user/register`;
        $.ajax({
            url: url,
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
                        location.href = './login.html';
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }

        });
    });
});