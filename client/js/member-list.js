$(document).ready(() => {
    function loadMembers() {
        $.ajax({
            url: `http://localhost:4000/users/list/approved`,
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

                        var due_date = new Date(...DT_parts);
                        var data_row = `
                                        <tr>
                                            <td>${el.buyer}</td>
                                            <td>${el.name}</td>
                                            <td>${el.due}</td>
                                            <td>P${el.amount}</td>
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
    loadMembers();
});