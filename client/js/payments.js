$(document).ready(() => {
    function loadPay() {
        $.ajax({
            url: 'http://localhost:4000/user/payments/',
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
                                                <a href="#" >
                                                    <button type="button" class="btn btn-primary">Pay Now</button>
                                                </a> 
                                                <a href="./property-info.html" >
                                                    <button type="button" class="btn btn-info">View Property</button>
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
});