//***********************************************************************************************
// ******* ******* Hantering av navigerings sido byte ******* *******
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
      scrollToTargetAdjusted(target)
    } else {
      console.log('Sektionen hittades inte: ' + target);
    }
  });
});

//***********************************************************************************************
// ******* ******* Scroll Reload ******* *******
function scrollToTargetAdjusted(target){
  var element = document.getElementById(target);
  var headerOffset = 85;
  var elementPosition = element.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}


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
    document.getElementById("days").innerHTML = `<span>${days}</span> `;
    document.getElementById("hours").innerHTML = `<span>${hours}</span> `;
    document.getElementById(
      "minutes"
    ).innerHTML = `<span>${minutes}</span> `;
    document.getElementById(
      "seconds"
    ).innerHTML = `<span>${seconds}</span> `;

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
  document.body.classList.toggle("scrollPrevent");
});

document.querySelectorAll("#mynav li").forEach((element) => {
  element.addEventListener("click", function () {
    var nav = document.getElementById("mynav");
    nav.classList.toggle("visible");
    document.body.classList.toggle("scrollPrevent");
  });

});

/**
 * A class to handle dynamic language translations for web elements.
 * 
 * The LanguageHandler class allows you to change the displayed language of specified sections
 * on a webpage based on user interactions with buttons. It supports adding languages dynamically
 * and updating sections based on the selected language.
 */
class LanguageHandler {
  _language // urrent language
  _sections; // Array of section translations
  _buttons; // Array of button configurations
  _languages; // Object to hold supported languages

  /**
   * Creates an instance of LanguageHandler.
   * 
   * @param {Array<{target: string, language: string}>} buttons - An array of button configurations. Each object should contain:
   *   - target: A CSS selector for the button element.
   *   - language: The language code to set when the button is clicked.
   * 
   * @param {Array<{target: string, [key: string]: string}>} sec - An array of sections with translations. Each object should contain:
   *   - target: A CSS selector for the section element.
   *   - For each language code supported, provide the corresponding translation string (e.g., swe, ger).
   * 
   * @param {Array<string>} langList - An array of supported language codes (e.g., ['swe', 'ger', 'eng']).
   * 
   * @example
   * const buttons = [
   *   { target: '#lang-swe', language: 'swe' },
   *   { target: '#lang-ger', language: 'ger' },
   *   { target: '#lang-eng', language: 'eng' }
   * ];
   * 
   * const sections = [
   *   { target: '#section1', swe: 'Hej', ger: 'Hallo', eng: 'Hello' },
   *   { target: '#section2', swe: 'Världen', ger: 'Welt', eng: 'World' }
   * ];
   * 
   * const langHandler = new LanguageHandler(buttons, sections, ['swe', 'ger', 'eng']);
   */
  constructor(buttons, sec, langList) {
    this._buttons = buttons;
    this._sections = sec;
    this._languages = langList.reduce((acc, lang) => {
      acc[lang] = {};
      return acc;
    }, {});
    this._language = langList[0]

    this.addListeners();
    this.updateSections();
  }

  /**
   * Sets the current language.
   * 
   * @param {string} lang - The language code to set. It must be one of the supported languages.
   * 
   * @example
   * langHandler.language = 'ger'; // Sets the current language to German
   */
  set language(lang) {
    if (this._languages[lang]) {
      this._language = lang;
    } else {
      console.error(`Language "${lang}" is not supported.`);
    }
  }

  /**
   * Sets the sections for translation.
   * 
   * @param {Array<{target: string, [key: string]: string}>} sec - An array of sections with translations.
   * 
   * @example
   * const newSections = [
   *   { target: '#section3', swe: 'Välkommen', ger: 'Willkommen', eng: 'Welcome' },
   *   { target: '#section4', swe: 'God Morgon', ger: 'Guten Morgen', eng: 'Good Morning' }
   * ];
   * langHandler.sections = newSections; // Updates sections for translation
   */
  set sections(sec) {
    this._sections = sec;
  }

  /**
   * Adds event listeners to buttons to change the language.
   * Each button will update the displayed language when clicked.
   * 
   * @example
   * // Assuming buttons have been defined in the constructor
   * langHandler.addListeners(); // Not needed if called in the constructor
   */
  addListeners() {
    for (const button of this._buttons) {
      document.querySelector(button.target).addEventListener('click', () => {
        console.log(`Changed language to ${button.language}`);
        this.language = button.language; // Set language using setter
        this.updateSections();
      });
    }
  }

  /**
   * Updates the sections on the webpage with the current language translations.
   * Each section's innerHTML will be updated based on the currently selected language.
   * 
   * @example
   * // Call this method to refresh the displayed text after changing language
   * langHandler.updateSections(); // Not needed if called automatically on language change
   */
  updateSections() {
    for (const section of this._sections) {
      const element = document.querySelector(section.target);
      if (element) {
        if (element.hasAttribute('data-translate')) {
          element.innerHTML = section[this._language] || ''; // Use dynamic key for translation
        } else {
          console.error(`Element "${section.target}" does not have the required "data-translate" property, please add it`);
        }
      } else {
        console.error(`Element with id "${section.target}" does not exist`);
      }
    }
  }
}

//***********************************************************************************************
// ******* ******* Bord placering ******* *******

 document.querySelectorAll('.chair').forEach(chair => {
  chair.addEventListener('mouseover', function(event) {
    if (window.innerWidth > 768) {
      showGuestInfo(this);
    }
  });

  chair.addEventListener('click', function(event) {
    // Kolla om popup-rutan är synlig och om det är samma stol som klickas på igen
    const infoBox = document.getElementById('guest-info');
    if (infoBox.style.display === 'block' && infoBox.getAttribute('data-active-chair') === this.getAttribute('data-guestnr')) {
      infoBox.style.display = 'none';
      infoBox.removeAttribute('data-active-chair');
    } else {
      showGuestInfo(this);
    }
  });

  function showGuestInfo(chair) {
    const guestId = chair.getAttribute('data-guestnr');
    const guestDescription = chair.getAttribute('data-description');

    // Hämta stolens position
    const rect = chair.getBoundingClientRect();

    // Placera pop-up-rutan nära stolen
    const infoBox = document.getElementById('guest-info');
    infoBox.style.top = `${rect.bottom + window.scrollY + 10}px`; // 10px under stolen
    infoBox.style.left = `${rect.left + window.scrollX}px`; // Samma vänsterposition som stolen

    // Sätt innehåll för pop-up baserat på data-guestnr och data-description
    // document.getElementById('guest-image').src = `images/${guestId}.jpg`; DEN ÄKTA 
    document.getElementById('guest-image').src = `./imagesBrollopsfolje/${guestId}.jpg`;
    
    document.getElementById('guest-description').innerText = guestDescription;

    // Visa pop-up-rutan
    infoBox.style.display = 'block';
    infoBox.setAttribute('data-active-chair', guestId);
  }
});

{/* // Lägg till en click-händelse på hela dokumentet för att stänga popupen om du klickar någonstans utanför stolen */}
document.addEventListener('click', function(event) {
  if (!event.target.classList.contains('chair') && !document.getElementById('guest-info').contains(event.target)) {
    document.getElementById('guest-info').style.display = 'none';
    document.getElementById('guest-info').removeAttribute('data-active-chair');
  }
});

