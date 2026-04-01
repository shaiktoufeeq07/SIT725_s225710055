const cardList = [
    {
        title: "Optimum Nutrition",
        image: "https://thrivehn.au/cdn/shop/files/61d7c631-bbe4-477e-bd3c-2191fd218960.png?v=1753950751&width=1946",
        link: "About the product",
        desciption: "High protein whey powder "
    },
    {
        title: "Musashi",
        image: "https://assets.kogan.com/images/prosupplementsau/PSA-596-459%3A%3A1359~9400581054026/2-32ccdc4786-musashi_whey_isolate_chocolate_900g-0__95153175016888112801280.jpg?auto=webp&bg-color=fff&canvas=1200%2C800&dpr=1&enable=upscale&fit=bounds&height=800&quality=90&width=1200",
        link: "About the product",
        desciption: "High protein whey powder "
    }
]
const clickMe = () => {
    let formData = {};
    formData.first_name = $("#first_name").val();
    formData.last_name = $("#last_name").val();
    formData.email = $("#email").val();
    formData.message = $("#message").val();
    console.log("form data submitted",formData);
}
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.desciption + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}
$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('#clickMeButton').click(() => {
    $('#modal1').modal('open');
});

$('#formSubmit').click(() => {
    clickMe();
});
    addCards(cardList);
});
