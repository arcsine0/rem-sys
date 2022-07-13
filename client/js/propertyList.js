$(document).ready(() => {
    function loadProperty() {
        $.ajax({
            url: 'http://localhost:4000/user/propertylist/',
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
                                                <h4 class="card-text">P${el.monthly}</h4>
                                                <a href="#" id="p_${el.id}" class="btn btn-primary property-details">More Details</a>
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
        refreshProperty();
    }
    $('#property-list').on('click', '.property-details', (event) => {
        var buttonID = $(event.target).attr('id').split('_');
        var propertyID = buttonID[1]
        $.ajax({
            url: `http://localhost:4000/user/propertylist/${propertyID}`,
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                if (data) {
                    var propertyModal = `
                                        <div class="modal fade" id="viewProp" tabindex="-1" aria-labelledby="view" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h3 class="modal-title" id="property-name">${data[0].name}</h3>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <img src="../img/placeholder-home.png" class="card-img-top" alt="...">
                                                        <h5>Owned by ${data[0].owner}</h5>
                                                        <h5>${data[0].description}</h5>
                                                        <h5>At the address: <br><span id="property-address">${data[0].address}</span></h5>
                                                        <h4>Starting at P<span id="property-price">${data[0].monthly}</span> Monthly for 12 Months!</h4>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" id="p_${data[0].id}" class="btn btn-success purchase">Purchase</button>
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        `
                    $('#property-modal').empty();
                    $('#property-modal').append(propertyModal);

                    $('#viewProp').modal('show');
                }   
            },
            error: (err) => {
                console.log(err);
            }
        });
    })
    $('#property-modal').on('click', '.purchase', (event) => {
        var buttonID = $(event.target).attr('id').split('_');
        var propertyID = buttonID[1];
        var data = [
                    {name: "id", value: propertyID},
                    {name: "name", value: $('#property-modal #property-name').html()},
                    {name: "address", value:  $('#property-modal #property-address').html()},
                    {name: "price", value:  $('#property-modal #property-price').html() * 12},
                    ]
        $.ajax({
            url: 'http://localhost:4000/user/property/purchase',
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
                        $('#viewProp').modal('hide');
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    })
});