$(document).ready(() => {
    var table_body = $('#table_data');

    function getUsers() {
        $.ajax({
            url: 'http://localhost:4000/users/list',
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
                                            <th scope="row">${el.id}</th>
                                            <td class="row-role">${el.role}</td>
                                            <td>${el.email}</td>
                                            <td>${el.password}</td>
                                            <td>${el.fname}</td>
                                            <td>${el.mname}</td>
                                            <td>${el.lname}</td>
                                            <td class="actions">
                                                <button type="button" class="btn btn-warning data-edit" data-toggle="modal" data-target="#editModal">Edit</button>
                                                <button type="button" class="btn btn-danger data-delete">Delete</button>
                                            </td>
                                        </tr>
                                        `
                        table_body.append(data_row)
                    });
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    getUsers();

    function refreshUsers() {
        $('#table_data').empty();
        getUsers();
    }

    var row_id;
    $('#staff_table').on('click', '.data-edit', (event) => {
        var row = $(event.target.closest('tr')).children('td');
        var r_id = $(event.target.closest('tr')).find('th');
        var existing = [];
        row.each((i, item) => {
            if ($(item).attr('class') != 'actions') {
                // console.log(item.innerHTML);
                existing.push(item.innerHTML);
            }
        });
        $('#edit-form').children('div').each((i, el) => {
            var input = $(el).find('input');
            if (input.attr('placeholder') != undefined) {
               input.attr('placeholder', existing[i]);
               input.val(existing[i]);
            }
        });
        row_id = r_id.html();
    });
    $('#save-edit').on('click', () => {
        var f_data = $('#edit-form').serializeArray();
        f_data.push({name: "id", value: row_id});

        $.ajax({
            url: 'http://localhost:4000/users/edit',
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
                        refreshUsers();
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
    $('#staff_table').on('click', '.data-delete', (event) => {
        var r_id = $(event.target.closest('tr')).find('th');
        var r_role = $(event.target.closest('tr')).find('.row-role').html();
        if (r_role == 'admin') {
            console.log('cannot delete: reason admin');
        } else {
            $.ajax({
                url: 'http://localhost:4000/users/edit',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                type: 'DELETE',
                data: {name: "id", value: r_id.html()},
                crossDomain: true,
                xhrFields: {
                    withCredentials: false
                },
                success: (data) => {
                    if (data) {
                        if (data == 'success') {
                            console.log('saved');
                            refreshUsers()
                        }
                    }
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    });
    $('#add-row').on('click', () => {
        var f_data = $('.table_add form').serializeArray();
        $.ajax({
            url: 'http://localhost:4000/users/add',
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
                        refreshUsers()
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
});