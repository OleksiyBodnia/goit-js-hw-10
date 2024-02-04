import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputDelay = document.querySelector('input[name="delay"]');
    const radioBtnChecked = document.querySelector('input[name="state"]:checked');

    const delay = parseInt(inputDelay.value);

    const promise = new Promise((resolve, reject) => {
        if (radioBtnChecked.value == "fulfilled"){
            setTimeout(() => {
                resolve(delay)
            }, delay);
        } else {
            setTimeout(() => {
                reject(delay)
            }, delay);
        }
    });

    promise.then(delay => {
        iziToast.success({title: '✅',
        message: ` Fulfilled promise in ${delay}ms`,
        position: "topCenter",})
    })
    .catch(delay => {
        iziToast.warning({
            title: '❌',
            message: ` Rejected promise in ${delay}ms`,
            position: "topCenter"
        })
    })

    inputDelay.value = '';
    radioBtnChecked.checked = false;
})