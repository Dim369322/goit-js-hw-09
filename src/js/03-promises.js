import { Notify } from 'notiflix/build/notiflix-notify-aio';

// <----------------  1 часть  ----------------> 

const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

const form = {
  body: document.querySelector('.form'),
  delay: 0,
  step: 0,
  amount: 0,
}

form.body.addEventListener('submit', (e) => {
  e.preventDefault();
  changeFormValue();
  startCreatePromise();
});

function changeFormValue() {
  form.delay = Number(firstDelay.value);
  form.step = Number(delayStep.value);
  form.amount = Number(amount.value);
}

function startCreatePromise(){
  const amounts = form.amount;
  for (let i = 1; i <= amounts; i += 1 ) {
    const promisesDelay = (form.delay += form.step) - form.step;
    createPromises(i , promisesDelay)
  }
}

function createPromises(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        Notify.success(`✅ Fulfilled promise ${position}  in ${delay } ms`);
      } else {
        Notify.failure(`❌ Rejected promise ${position}  in ${delay } ms`);
      }
    }, delay );
  });
}

// <----------------  2 часть  ----------------> 

const delayOnce = document.querySelector('input[name="delay-second"]');
const promiseNumber = document.querySelector('input[name="amount-second"]');

const secondForm = {
  body: document.querySelector('.form-second'),
  delay: 0,
  amount: 0,
}

secondForm.body.addEventListener('submit', (e) => {
  e.preventDefault();
  changeSecondFormValue();
  createPromise(secondForm.amount, secondForm.delay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
     Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });;
});

function changeSecondFormValue() {
  secondForm.delay = Number(delayOnce.value);
  secondForm.amount = Number(promiseNumber.value);
}

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolved = Math.random() > 0.3;
    const promise = { position, delay }

    setTimeout(() => {
      if (shouldResolved) {
        resolve(promise);
      } else {
        reject(promise);
      }
    }, delay );
  });
}

// function createPromise(delay, step) {
//     return new Promise ((resolve, reject) => {
//       const shouldResolve = Math.random() > 0.3;
//       let amount = 0;

//       let timeout = setTimeout(
//       function check(delay) {
//         delay += step;
//         if (shouldResolve) {
//           console.log(`✅ Fulfilled promise ${amount += 1}  in ${delay } ms`);
//         } else {
//          console.log(`❌ Rejected promise ${amount += 1} in ${delay } ms`);
//        }
//           timeout = setTimeout(check, delay, delay);
//           if(form.amount === amount){
//            clearTimeout(timeout);
//           }
//       },
//       delay ,
//       delay - step);
//   });
// }