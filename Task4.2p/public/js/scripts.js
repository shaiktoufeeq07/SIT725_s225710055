const clickMe = () => {
    let formData = {};
    formData.first_name = $("#first_name").val();
    formData.last_name = $("#last_name").val();
    formData.email = $("#email").val();
    formData.message = $("#message").val();
    console.log("form data submitted", formData);
};

const addCards = (items) => {
    $("#card-section").empty(); // clear any existing cards before rendering

    if (items.length === 0) {
        $("#card-section").html('<p class="center-align white-text">No products found in the database.</p>');
        return;
    }

    items.forEach(item => {
        let itemToAppend =
            '<div class="col s12 m6 l4 center-align">' +
                '<div class="card medium">' +
                    '<div class="card-image waves-effect waves-block waves-light">' +
                        '<img class="activator" src="' + item.image + '" alt="' + item.title + '">' +
                    '</div>' +
                    '<div class="card-content">' +
                        '<span class="card-title activator grey-text text-darken-4">' +
                            item.title +
                            '<i class="material-icons right">more_vert</i>' +
                        '</span>' +
                        '<p><a href="#">' + item.link + '</a></p>' +
                    '</div>' +
                    '<div class="card-reveal">' +
                        '<span class="card-title grey-text text-darken-4">' +
                            item.title +
                            '<i class="material-icons right">close</i>' +
                        '</span>' +
                        '<p class="card-text">' + item.description + '</p>' +
                    '</div>' +
                '</div>' +
            '</div>';

        $("#card-section").append(itemToAppend);
    });
};

const getProjects = () => {
    $.get('/api/projects', (response) => {
        if (response.statusCode === 200) {
            addCards(response.data);
        } else {
            console.error("Failed to fetch projects:", response.message);
            $("#card-section").html('<p class="center-align white-text">Failed to load products.</p>');
        }
    }).fail((err) => {
        console.error("API error:", err);
        $("#card-section").html('<p class="center-align white-text">Error connecting to server.</p>');
    });
};

$(document).ready(function () {
    $('.materialboxed').materialbox();
    M.Modal.init($('.modal'));

    getProjects(); // load all cards from MongoDB on page load

    $('#formSubmit').click(() => {
        clickMe();
    });
});