$(document).ready(() => {
    var user_name = localStorage.getItem('username');
    function loadAnnouncements() {
        $.ajax({
            url: 'http://localhost:4000/user/announcements/',
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    data.forEach((el, index) => {
                        var data_row = `
                                        <tr id="row${index}">
                                            <th scope="row" class="ann_check">
                                                <input id="c_${el.id}" type="checkbox" class="checkbox" value="">
                                            </th>
                                            <td>${el.poster}</td>
                                            <td class="row">
                                                <div class="col-12">
                                                    <strong>${el.title}</strong>
                                                </div>
                                                <div class="col-12">
                                                    ${el.body}
                                                </div>
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
    loadAnnouncements();

    function refreshData() {
        $('#table_data').empty();
        loadAnnouncements();
    }
    $('#del-ann').on('click', () => {
        var row = $('#table_data').children('tr');
        var id_arr = [];
        row.each((i, e) => {
            var checkbox = $(e).find('.checkbox');
            if (checkbox.is(':checked') === true) {
                var c_id = checkbox.attr('id').split('_');
                var id = c_id[1];
                id_arr.push({name: "id", value: id});
            }
        })
        console.log(id_arr);
        $.ajax({
            url: 'http://localhost:4000/user/announcements',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            type: 'DELETE',
            data: id_arr,
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    if (data == 'success') {
                        console.log('saved');
                        refreshData();
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
    $('#add-ann').on('click', () => {
        $('#addAnnounce').modal('show');
    })
    $('#save-add').on('click', () => {
        var f_data = $('#ann-form').serializeArray();
        f_data.push({name: "name", value: user_name})
        console.log(f_data);
        $.ajax({
            url: 'http://localhost:4000/user/announcements',
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
                        refreshData();
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
});