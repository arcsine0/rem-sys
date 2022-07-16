$(document).ready(() => {
    var user_id = window.localStorage.getItem('id')
    function loadDues() {
        $.ajax({
            url: `http://localhost:4000/user/dashboard/${user_id}`,
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    $('#num-pending').html(data[0].pending);
                    if (data[0].amount) {
                        $('#amount-due').html(`P${data[0].amount}`);
                    }
                    if (data[0].due) {
                        $('#due').html(data[0].due);
                    }
                }   
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    loadDues();

    function loadProperty() {
        $.ajax({
            url: 'http://localhost:4000/user/propertylist/approved',
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    data.forEach((el, index) => {
                        var data_row = `
                                        <div class="card m-3" style="width: 18rem;">
                                            <img src="../img/placeholder-home.png" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h3 class="card-title">${el.name}</h3>
                                                <h6 class="card-text">${el.address}</h6>
                                            </div>
                                        </div>
                                        `
                        $('#property-list').append(data_row);
                    })
                }   
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    loadProperty();
    function refreshProperty() {
        $('#property-list').empty()
        loadProperty();
    }
});