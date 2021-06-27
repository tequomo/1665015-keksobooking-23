
const maptileskey = '24980534c7msh53c767dede27442p1cabb4jsnc1ef2c21e7d3';
function callAjax(url, callback) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      callback(xmlhttp.response);
    }
  };
  xmlhttp.onloadstart = function () {
    xmlhttp.responseType = 'blob';
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.setRequestHeader('X-RapidAPI-Key', maptileskey);
  xmlhttp.send();

}
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

L.tileLayer.mapTilesAPI = function (url, options) {
  return new L.TileLayer.MapTilesAPI(url, options);
};
