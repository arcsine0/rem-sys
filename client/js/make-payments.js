$(document).ready(() => {
    var paymentID = window.localStorage.getItem('paymentID');
    var propertyName = window.localStorage.getItem('propertyName');
    var propertyAddress = window.localStorage.getItem('propertyAddress');
    var propertyDue = window.localStorage.getItem('propertyDue');
    var propertyAmount = window.localStorage.getItem('propertyAmount');

    $('#name').val(propertyName);
    $('#address').val(propertyAddress);
    $('#due').val(propertyDue);
    $('#amount').val(propertyAmount);

    $('#accountNum').val(paymentID);

    $('.submit-payment').on('click', () => {
        var today = new Date().toISOString().slice(0, 19).replace('T', ' ');  
        var f_data = $('#payment-form').serializeArray();
        f_data.push({name: 'id', value: paymentID}, {name: 'paidAt', value: new Date($('#paidDate').val()).toISOString().slice(0, 19).replace('T', ' ')});
        $.ajax({
            url: 'http://localhost:4000/user/payment/pay',
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
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    })
});