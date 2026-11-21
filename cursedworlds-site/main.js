// Nav toggle
var t = document.querySelector('.nav-toggle');
if (t) t.addEventListener('click', function () {
  document.querySelector('.nav-links').classList.toggle('open');
});

// Countdown to Satyr Arcana II — Halloween 2026 (midnight Phoenix time, UTC-7)
var cd = document.getElementById('countdown');
if (cd) {
  var target = new Date('2026-10-31T00:00:00-07:00').getTime();
  function tick() {
    var d = target - Date.now();
    if (d <= 0) { cd.innerHTML = '<span><b>OUT NOW</b></span>'; return; }
    var days = Math.floor(d / 864e5),
      hrs = Math.floor(d % 864e5 / 36e5),
      min = Math.floor(d % 36e5 / 6e4);
    cd.innerHTML =
      '<span><b>' + days + '</b> days</span>' +
      '<span><b>' + hrs + '</b> hrs</span>' +
      '<span><b>' + min + '</b> min</span>';
  }
  tick();
  setInterval(tick, 30000);
}
