/* Características:
Segundero, minutero, hora: cada uno es un div con height: 0 y un borde.
seconds: 360º / 60 => 6º
minutes: 360º / 60 => 6º
hours: 360º / 12 => 30º
*/
let clockElement = document.querySelector('#analogClock');
let offset = -90; // Rotate inicia a la derecha de la circunferencia.

// For accesibility options: reduce animations
let reducedMotion = false;

/* The clock is continuously updating: 60 fps */
/**
 * This function ends up creating a loop where the timer function
 * gets called 60 times a second because
 * requestAnimationFrame tries to sync when it runs to our
 * screen's refresh/redraw rate.
 * On most of our devices, that rate is 60 times a second.
 */
function timer() {
  let date = new Date();

  let milliseconds = date.getMilliseconds();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();

  // We want to show the progression of times values to be more realistic
  if (!reducedMotion) seconds += milliseconds / 1000;
  minutes += seconds / 60;
  hours += minutes / 60;

  // Normalize to the 12 hour clock
  if (hours > 12) hours -= 12;

  // Updating handlers
  clockElement.style.setProperty('--seconds', seconds * 6 + offset + 'deg');
  clockElement.style.setProperty('--minutes', minutes * 6 + offset + 'deg');
  clockElement.style.setProperty('--hours', hours * 30 + offset + 'deg');

  requestAnimationFrame(timer);
}

timer();

let reduceMotionQuery = matchMedia('(prefers-reduced-motion)');
function setAccesibilityState() {
  if (reduceMotionQuery.matches) {
    reducedMotion = true;
  } else {
    reducedMotion = false;
  }
}
setAccesibilityState();
reduceMotionQuery.addListener(setAccesibilityState);
