$(function() {
  let weather = {
    getLocation: function() {
      function success(pos) {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        weather.get(lat, lon);
      }

      function error(err) {
        // Use ipinfo API instead
        $.get("https://ipinfo.io/geo").then(function(location) {
          const lat = location.loc.split(",")[0];
          const lon = location.loc.split(",")[1];

          weather.get(lat, lon);
        });
      }

      navigator.geolocation.getCurrentPosition(success, error);
    },
    get: function(lat, lon) {
      const url =
        "https://fcc-weather-api.glitch.me/api/current?lon=" +
        lon +
        "&lat=" +
        lat;

      $.getJSON(url, function(data) {
        weather.print(data);
      });
    },
    print: function(data) {
      const location = data.name + ", " + data.sys.country;
      const descr = data.weather[0].description;
      const icon = data.weather[0].icon;
      let temp = Math.round(data.main.temp);

      $(".temp").html(temp);
      $(".location").html(location);
      $(".description").html(descr);
      $(".temp").html(temp);
      $(".icon").html('<img src="' + icon + '">');
    }
  };
  weather.getLocation();
});
