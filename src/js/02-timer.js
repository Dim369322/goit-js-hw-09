import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const clock = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] > options.defaultDate ){
        startBtn.disabled = false;
        return ;
      }
      Notify.warning("Please choose a date in the future");
    },
  };

const data = flatpickr('input[type="text"]', options);

const timer = {
  timeId: null,
    start() {
    startBtn.disabled = true;
    data._input.disabled = true;
    this.timeId = setInterval(() => {
          const deadline = data.selectedDates[0]; 
          const currentTime = Date.now();
          const deltaTime = deadline  - currentTime;
          if(deltaTime > 0){
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            updateClockDays(days);
            updateClockHours(hours);
            updateClockMinutes(minutes);
            updateClockSeconds(seconds);
            console.log(`${days}:${hours}:${minutes}:${seconds}` );
            return;
          }
            return clearInterval(this.timeId);
      }, 1000);
    }
}

startBtn.addEventListener('click', onBtnclick);

function onBtnclick () {
  if (startBtn.nodeName === "BUTTON"){
    return timer.start();
  }
}

function updateClockDays(days){
  clock.days.textContent = days;
}

function updateClockHours(hours){
  clock.hours.textContent = hours;
}

function updateClockMinutes(minutes){
  clock.minutes.textContent = minutes;
}

function updateClockSeconds(seconds ){
  clock.seconds.textContent = seconds;
}

function addLeadingZero(value){
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}