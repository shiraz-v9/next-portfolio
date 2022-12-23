import { format } from "date-fns";
export async function getIP() {
  var axios = require("axios");

  try {
    const response = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=ed649e7ecdb54dcfa2d60ad3e049b80c`
    );
    var json = {
      IP: response.data.ip,
      country: response.data.country_name,
      city: response.data.city,
      district: response.data.district,
      coords: `${response.data.latitude} & ${response.data.longitude}`,
      isporg: `${response.data.isp} & ${response.data.organization}`,
      unixtime: response.data.time_zone.current_time_unix,
    };
    return json;
  } catch (error) {
    return "error";
  }
}

// silly, unused
export function Meme() {
  try {
    var json = { fellForIt: true };

    var axios = require("axios");
    var data = JSON.stringify(json);

    var config = {
      method: "post",
      url: `https://notion-api-kashif-js.vercel.app/dynamic/${data}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export function getTime() {
  let currentDate = new Date();
  return format(currentDate, "d / MMM / yy, h:mm:ss a");
}

export async function saveData() {
  console.log("im running");
  var axios = require("axios");
  var data = JSON.stringify({
    time: await getTime(),
    IP: JSON.stringify(await getIP()),
  });

  var config = {
    method: "post",
    url: "https://notion-api-teal.vercel.app/data",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
