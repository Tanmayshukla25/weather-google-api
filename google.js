const input = document.querySelector("#input");
const results = document.querySelector("#results");
const btn = document.querySelector("#btn");
const url = "https://api.openweathermap.org/data/2.5/weather?APPID=a3ff0ea5e54fa5a846957f72620b0699&units=metric"; 

let date = new Date();
let datetime = date.toDateString() + " || " + date.toLocaleTimeString();

document.getElementById("now").innerHTML = datetime;




btn.addEventListener("click", async (e) => {
    e.preventDefault();
   
    const forminput = input.value.trim();    
    fetchdata(forminput);
    input.value = "";

    
});



async function fetchdata(place) {
    try {
        const response = await fetch(url + "&q=" + place);
       
        const data = await response.json();

        results.innerHTML = `

            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp_min} C</p>
            <p>Temperature_max: ${data.main.temp_max} C</p>
            <p>Temperature_min: ${data.main.temp} C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>wind-speed:${data.wind.speed}<P>
            <p>wind-deg:${data.wind.deg}<P>
            <p>clouds:${data.clouds.all}<P>

        `;

        const lat = data.coord.lat;
        const lon = data.coord.lon;

        console.log(lat);
        console.log(lon);
        updateMap(lat, lon)
        
    } catch (error) {
        results.innerHTML = `<p>city not found</p>`;
    }
}








((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
      
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyDIeyZ9d3DtKrh_ufgNi5Inmf3dIbKUgCM",
  v: "weekly",
});

// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 26.8778614, lng: 75.6394958 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 8,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

}

function updateMap(lat, lon) {
  const newPosition = { lat, lng: lon };

  if (map) {
      map.setCenter(newPosition);  
  }


  if (map.marker) {
      map.marker.setPosition(newPosition);
  } else {
      // Create a new marker if it doesn't exist
      map.marker = new google.maps.Marker({
          position: newPosition,
          map: map,
          title: "Location",
      });
  }
}



initMap();
