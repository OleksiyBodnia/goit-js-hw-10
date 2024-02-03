// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('[data-start]');
const timeInput = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const userSelectedDate = selectedDates[0];
        const currentDate = new Date();
    
        if (userSelectedDate <= currentDate) {
          iziToast.warning({title: "Caution",
          message: "Please choose a date in the future",
          position: "topCenter"});
          startBtn.disabled = true;
        } else {
          startBtn.disabled = false;
        }
      },
  };

const flatpickrInstance = flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', () => {
    const userSelectedDate = flatpickrInstance.selectedDates[0];
    const currentDate = new Date();
    const timeDifference = userSelectedDate.getTime() - currentDate.getTime();

    startBtn.disabled = true;

    startTimer(timeDifference);
  });

function startTimer(timeDifference) {
    startBtn.disabled = true;
    timeInput.disabled = true;

    const timerInterval = setInterval(() => {
      const {days, hours, minutes, seconds} = convertMs(timeDifference);
      
      daysValue.textContent = padStartFunc(days);
      hoursValue.textContent = padStartFunc(hours);
      minutesValue.textContent = padStartFunc(minutes);
      secondsValue.textContent = padStartFunc(seconds);
      
      timeDifference -= 1000;
      
      if (timeDifference < 0) {
        clearInterval(timerInterval);
        timeInput.disabled = false;
      }
    }, 1000);
  }

function padStartFunc(time){
    return String(time).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}
  