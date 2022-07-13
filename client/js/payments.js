$(document).ready(() => {
    function loadPay() {
        var user_id = localStorage.getItem('id');
        $.ajax({
            url: `http://localhost:4000/user/payments/${user_id}`,
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
                                            <td>${el.name}</td>
                                            <td>${el.address}</td>
                                            <td>${el.due}</td>
                                            <td>P${el.amount}</td>
                                            <td>
                                                <a>
                                                    <button type="button" class="btn btn-primary pay">Pay Now</button>
                                                </a> 
                                                <a href="./property-info.html" >
                                                    <button type="button" id="p_${el.id}" class="btn btn-info">View Property</button>
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
    $('#table_data').on('click', '.pay', (event) => {
        var buttonID = $(event.target).attr('id').split('_');
        var propertyID = buttonID[1];
        console.log(propertyID);
    })
});