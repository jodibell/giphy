$(document).ready(function () {
    var topicsArray = ["ghosts", "vampires", "vikings", "bigfoot", "white walkers"];

    function renderButtons() {
        $("#topicButtons").empty();
        for (var i = 0; i < topicsArray.length; i++) {
            var button = $("<button class='giphButton'>");
            //create topicButton for every string in the array by appending
            //when topicButton is clicked, run ajax call to api to return giphs
            button.attr("data-name", topicsArray[i]);
            button.text(topicsArray[i]);
            $("#topicButtons").append(button);
        }
    }
    renderButtons();

    function queryGiphy(query) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=21LFDra2nxHUUd9fzOUi9H3e4qw8EJDa&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#topics").empty();
            for (var i = 0; i < response.data.length; i++) {
                var div = $("<div>");
                var image = $("<img class='giphThumbs'>");
                image.attr("src", response.data[i].images.fixed_height.url);
                var h5 = $("<h5>");
                h5.text(response.data[i].rating);
                div.append(image).append(h5);
                $("#topics").append(div);
            }
        })
    }
    //var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=21LFDra2nxHUUd9fzOUi9H3e4qw8EJDa");
    //xhr.done(function (data) { console.log("success got data", data); });


    $("#searchButton").on("click", function (event) {
        // get text value from form. Use that to create a new button to append to the other buttons (recreates form from scratch)
        event.preventDefault();
        var topic = $("#topicInput").val().trim();
        topicsArray.push(topic);
        $("#topicInput").val("");
        renderButtons();
        //create buttons at the top of the page
    });
    //on click event to route api request
    $(document).on("click", ".giphButton", function () {
        var topic = $(this).attr("data-name");
        queryGiphy(topic);
    })

    //display results to the page with rating and limit
});