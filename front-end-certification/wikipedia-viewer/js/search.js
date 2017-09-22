$(function() {
  const url = "https://en.wikipedia.org/w/api.php?";
  const limit = 10;

  const getResults = function() {
    let query = $(".search-input").val();
    $.ajax({
      url: url,
      dataType: "jsonp",
      type: "GET",
      data: {
        action: "opensearch",
        search: query,
        limit: limit,
        format: "json"
      }
    }).done(function(data) {
      let title = data[1];
      let description = data[2];
      let url = data[3];

      query
        ? $("#results").html(
            `<p>Showing search results for: <span class="search-term">${query}</span> </p>`
          )
        : $("#results").html(
            `<p>Please enter a search term in the search field</strong></p>`
          );

      for (var i = 0; i < title.length; i++) {
        $("#results").append(`
        <section class="search-result">
        <header>
          <h2>${title[i]}</h2>
        </header>
        <p>${description[i]}</p>
        <footer><a href="${url[i]}">${url[i]}</a></footer>
        </section>
        `);
      }
    });

    return false;
  };

  $(".search-form").submit(getResults);
});
