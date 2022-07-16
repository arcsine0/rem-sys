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
                        var DT_parts = el.due.split(/[- :]/);
                        // DT_parts[1]--;
                        
                        console.log(DT_parts);
                        var due_date = new Date(...DT_parts);
                        var data_row = `
                                        <tr>
                                            <td>${el.name}</td>
                                            <td>${el.address}</td>
                                            <td>${due_date}</td>
                                            <td>P${el.amount}</td>
                                            <td>
                                                <a>
                                                    <button type="button" data-id="pay_${el.id}" class="btn btn-primary pay">Pay Now</button>
                                                </a> 
                                                <a href="./property-info.html" >
                                                    <button type="button" data-id="p_${el.id}" class="btn btn-info">View Property</button>
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
        var buttonID = $(event.target).data('id').split('_');
        var payID = buttonID[1];
        $.ajax({
            url: `http://localhost:4000/user/propertyinfo/${payID}`,
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    window.localStorage.setItem('propertyName', data[0].name);
                    window.localStorage.setItem('propertyAddress', data[0].address);
                    window.localStorage.setItem('propertyDue', data[0].due);
                    window.localStorage.setItem('propertyAmount', data[0].amount);
                    window.localStorage.setItem('paymentID', payID);
                    window.location.href = "./make-payment.html";
                }   
            },
            error: (err) => {
                console.log(err);
            }
        });
    })
});