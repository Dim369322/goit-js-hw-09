import { Notify } from 'notiflix/build/notiflix-notify-aio';

// <----------------  1 часть  ----------------> 

const form = {
  body: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

form.body.addEventListener('submit', (e) => {
  e.preventDefault();
  changeFormValue(e);
  startCreatePromise();
});

function changeFormValue(e) {
  form.delay = Number(e.currentTarget.elements.delay.value);
  form.step = Number(e.currentTarget.elements.step.value);
  form.amount = Number(e.currentTarget.elements.amount.value);
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

const secondForm = {
  body: document.querySelector('.form-second'),
  delay: document.querySelector('input[name="delayed"]'),
  amount: document.querySelector('input[name="position"]'),
}

secondForm.body.addEventListener('submit', (e) => {
  e.preventDefault();
  changeSecondFormValue(e);
  createPromise(secondForm.amount, secondForm.delay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
     Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });;
});

function changeSecondFormValue(e) {
  secondForm.delay = Number(e.currentTarget.elements.delayed.value);
  secondForm.amount = Number(e.currentTarget.elements.position.value);
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