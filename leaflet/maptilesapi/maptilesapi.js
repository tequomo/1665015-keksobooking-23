const maptileskey = '24980534c7msh53c767dede27442p1cabb4jsnc1ef2c21e7d3';
const CURRENT_STATE = 4;
const CURRENT_STATUS = 200;

const callAjax = (url, callback) => {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === CURRENT_STATE && xmlhttp.status === CURRENT_STATUS) {
      callback(xmlhttp.response);
    }
  };
  xmlhttp.onloadstart = () => {
    xmlhttp.responseType = 'blob';
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.setRequestHeader('X-RapidAPI-Key', maptileskey);
  xmlhttp.send();

};
L.TileLayer.MapTilesAPI = L.TileLayer.extend({
  initialize: function (url, options) {
    L.TileLayer.prototype.initialize.call(this, url, options);
  },
  createTile: function (coords, done) {
    const url = this.getTileUrl(coords);
    const img = document.createElement('img');
    callAjax(
      url,
      (response) => {
        img.src = window.URL.createObjectURL(response);
        done(null, img);
      },
    );
    return img;
  },
});

L.tileLayer.mapTilesAPI = (url, options) => new L.TileLayer.MapTilesAPI(url, options);
