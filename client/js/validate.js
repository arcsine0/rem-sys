$(document).ready(() => {
    function loadPay() {
        var user_id = localStorage.getItem('id');
        $.ajax({
            url: `http://localhost:4000/user/validate/payments`,
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    data.forEach((el, index) => {
                        var data_row = `
                                        <tr>
                                            <td>${el.id}</td>
                                            <td>${el.buyer}</td>
                                            <td>${el.name}</td>
                                            <td>${el.reference}</td>
                                            <td>${el.mode}</td>
                                            <td>${el.paidAt}</td>
                                            <td>${el.amount}</td>
                                            <td>
                                                File preview?
                                            </td>
                                            <td>
                                                <button data-id="approved_${el.id}" class="btn btn-success btn-circle btn-sm validate">
                                                    <i class="fas fa-check"></i>
                                                </button>
                                                <button data-id="rejected_${el.id}" class="btn btn-danger btn-circle btn-sm validate">
                                                    <i class="fas fa-xmark"></i>
                                                </button>
                                                <a href="#" class="btn btn-primary btn-circle btn-sm">
                                                    <i class="fas fa-envelope"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        `
                        $('#table_data').append(data_row);
                    })
                }   
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    loadPay();
    function refreshPay() {
        $('#table_data').empty();
        loadPay();
    }
    $('#table_data').on('click', '.validate', (event) => {
        var buttonID = $(event.target).data('id').split('_');
        
        var propertyID = buttonID[1];
        if (propertyID != undefined) {
            var data = [
                { name: "id", value: propertyID },
                { name: "status", value: buttonID[0] },
            ]
            $.ajax({
                url: 'http://localhost:4000/user/validate/payments',
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
                            refreshPay();
                        }
                    }
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    })
});