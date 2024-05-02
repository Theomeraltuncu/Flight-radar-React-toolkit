export const options = {
  method: "GET",
  url: "https://flight-radar1.p.rapidapi.com/flights/list-in-boundary",

  params: {
    bl_lat: "34.51455",
    bl_lng: "-14.088082",
    tr_lat: "69.948849",
    tr_lng: "33.281227",
    limit: "300",
  },
  
};

export const dOptions = {
  headers: {
    "X-RapidAPI-Key": "903f85e181msh699b588da79c405p111e0ajsne80db8e842e2",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};
