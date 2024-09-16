//***********************************************************************************************
// ******* ******* Hantering av navigerings sido byte ******* ******* 
document.querySelectorAll('#mynav li a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Hämta alla sektioner och dölj dem
    document.querySelectorAll('.content-section').forEach(section => {
      section.style.display = 'none';
    });

    // Visa den sektion som motsvarar den klickade länken
    const target = this.getAttribute('data-target');
    document.getElementById(target).style.display = 'block';
  });
});

//***********************************************************************************************
// ******* ******* Time Conter Down ******* ******* 
function TimeCountDown() {
  // Sätt datumet för nedräkningen
  const targetDate = new Date("August 23, 2025 00:00:00").getTime();

  // Uppdatera nedräkningen varje sekund
  const interval = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Beräkna dagar, timmar, minuter och sekunder
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Visa resultatet i respektive element
    document.getElementById("days").innerHTML = `<span>${days}</span> DAGAR`;
    document.getElementById("hours").innerHTML = `<span>${hours}</span> TIMMAR`;
    document.getElementById("minutes").innerHTML = `<span>${minutes}</span> MINUTER`;
    document.getElementById("seconds").innerHTML = `<span>${seconds}</span> SEKUNDER`;

    // Om nedräkningen är klar, visa ett meddelande
    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("TimeCountDown").innerHTML = "Event has started!";
    }
  }, 1000); // Uppdatera varje sekund (1000 ms)
}

TimeCountDown();

//***********************************************************************************************
// ******* ******* menuToggle ******* ******* 
document.getElementById('menuToggle').addEventListener('click', function() {
  var nav = document.getElementById('mynav');
  nav.classList.toggle('visible');
});