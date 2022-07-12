$(document).ready(() => {
    function loadTrans() {
        $.ajax({
            url: 'http://localhost:4000/user/transactions/',
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    data.forEach((el, index) => {
                        var status;
                        var badge;
                        switch(el.status) {
                            case 'approved':
                                status = "Payment Approved";
                                badge = "success";
                                break;
                            case 'pending':
                                status = "Payment Pending";
                                badge = "secondary";
                                break;
                            case 'rejected':
                            default:
                                status = "Payment Rejected";
                                badge = "danger";
                                break;
                        }
                        var data_row = `
                                        <tr>
                                            <td>${el.id}</td>
                                            <td>${el.name}</td>
                                            <td>
                                                <span class="badge badge-${badge}" id="payment-status">${status}</span>
                                            </td>
                                            <td>
                                            <a href="#">
                                                <button type="button" class="btn btn-primary">View Payment</button>
                                            </a>
                                            <a href="./property-info.html">
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
    loadTrans();
});