//***********************************************************************************************
// ******* ******* Hantering av navigerings sido byte ******* *******
// Hämtar länkar som har 'data-target' attribut
document.querySelectorAll('a[data-target]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Felsökning: skriv ut vilken sektion som är tänkt att visas
    console.log('Navigerar till sektion: ' + this.getAttribute('data-target'));

    // Dölj alla sektioner
    document.querySelectorAll(".content-section").forEach((section) => {
      section.style.display = "none";
    });

    // Visa den sektion som länken pekar på
    const target = this.getAttribute("data-target");
    const targetElement = document.getElementById(target);

    if (targetElement) {
      targetElement.style.display = "block";
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      console.log('Sektionen hittades inte: ' + target);
    }
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
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Visa resultatet i respektive element
    document.getElementById("days").innerHTML = `<span>${days}</span> DAGAR`;
    document.getElementById("hours").innerHTML = `<span>${hours}</span> TIMMAR`;
    document.getElementById(
      "minutes"
    ).innerHTML = `<span>${minutes}</span> MINUTER`;
    document.getElementById(
      "seconds"
    ).innerHTML = `<span>${seconds}</span> SEKUNDER`;

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
document.getElementById("menuToggle").addEventListener("click", function () {
  var nav = document.getElementById("mynav");
  nav.classList.toggle("visible");
});

document.querySelectorAll("#mynav li").forEach((element) => {
  element.addEventListener("click", function () {
    var nav = document.getElementById("mynav");
    nav.classList.toggle("visible");
  });
});