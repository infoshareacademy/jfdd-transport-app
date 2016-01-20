// modules.pickYourStops.model.busStops
window.getModule = function (namespace) {
  var parts = namespace.split('.');

    var prevModule = null;
    parts.forEach(function (partName) {

    });
    window[parts[0]] = window[parts[0]] || {};
    window[parts[0]][parts[1]] = window[parts[0]][parts[1]] || {};
};