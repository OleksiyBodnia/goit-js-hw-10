import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputDelay = document.querySelector('input[name="delay"]');
    const radioBtnChecked = document.querySelector('input[name="state"]:checked');

    const delay = parseInt(inputDelay.value);

    const promise = new Promise((resolve, reject) => {

        const callback = () => {
            if (radioBtnChecked.value == 'fulfilled'){
                resolve(delay);
            } else {
                reject(delay);
            }
        }

        setTimeout(callback, delay);
    });

    promise.then(delay => {
        iziToast.success({title: '✅',
        message: ` Fulfilled promise in ${delay}ms`,
        position: "topCenter",})
    })
    .catch(delay => {
        iziToast.error({
            title: '❌',
            message: ` Rejected promise in ${delay}ms`,
            position: "topCenter"
        })
    })

    form.reset();
})