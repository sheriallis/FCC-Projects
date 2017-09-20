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
      const url = `https://fcc-weather-api.glitch.me/api/current?lon=${lon}&lat=${lat}`;

      $.getJSON(url, function(data) {
        weather.print(data);
      });
    },
    print: function(data) {
      const location = data.name + ", " + data.sys.country;
      const descr = data.weather[0].description;
      const icon = data.weather[0].icon;
      let cTemp = Math.round(data.main.temp);
      let fTemp = Math.round(cTemp * 1.8 + 32);
      let metric = "celsius";

      $(".location").html(location);
      $(".description").html(descr);
      $(".temp").html(`${cTemp} <span class="metric"> °C</span>`);
      $(".icon").html(`<img src="${icon}">`);

      $(".temp").on("click", ".metric", function() {
        if (metric === "celsius") {
          $(".temp").html(`${fTemp} <span class="metric"> °F</span>`);
          metric = "fahrenheit";
        } else {
          $(".temp").html(`${cTemp} <span class="metric"> °C</span>`);
          metric = "celsius";
        }
      });
    }
  };
  weather.getLocation();
});
