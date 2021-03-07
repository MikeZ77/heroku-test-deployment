const request = require('request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWljaGFlbC16MTQiLCJhIjoiY2tsb3NlbjN0MGdsYzJ4b2doanY2d3NiOSJ9.9ldNGDGhx4Q-jJ_9oMPWkg&limit=1`

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback('Unabable to connect to location services', undefined);
    } else if (typeof response.body.features[0] === 'undefined') {
      callback('Unable to connect to weather service!');
    } else {
      const lat = response.body.features[0].center[1];
      const lon = response.body.features[0].center[0];
      const location = response.body.features[0].place_name;
      
      callback(undefined, {lat, lon, location});
    }
  });
};

const weather = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0200d988102502fbc1f66a5911373fbe&query=${lat},${lon}&units=f`;

  request({url: url, json: true}, (error, response) => {
    if(error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location.", undefined);
    } else {
      data = {
        desc: response.body.current.weather_descriptions[0],
        curTemp: response.body.current.temperature,
        feelsLike: response.body.current.feelslike,
      }
      callback(undefined, `${data.desc}. The current temperature is ${data.curTemp}, but it feels like ${data.feelsLike} degrees out.`);
    }
  });
};


module.exports = {geoCode, weather};