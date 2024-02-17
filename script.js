// //your JS code here. If required.
// document.addEventListener("DOMContentLoaded", () => {
//     const outputDiv = document.getElementById('output');

//     // Function to create a promise with a 50% chance of rejection
//     function createPromise() {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 const randomNumber = Math.floor(Math.random() * 10) + 1;
//                 if (Math.random() < 0.5) {
//                     resolve(randomNumber);
//                 } else {
//                     reject(new Error(``));
//                 }
//             }, 1000); // Simulating an asynchronous operation with a delay of 1 second
//         });
//     }

//     // Array of promises
//     const promises = Array.from({ length: 5 }, createPromise);

//     // Using Promise.all to wait for all promises to settle
//     Promise.all(promises.map((promise, index) => {
//         return promise
//             .then(result => ({ result }))
//             .catch(error => ({ error, index }));
//     }))
//     .then(results => {
//         // Display results or errors in the output div
//         results.forEach(item => {
//             const p = document.createElement('p');
//             if (item.result) {
//                 p.textContent = `Promise ${item.index + 1} resolved with result: ${item.result}`;
//             } else {
//                 p.textContent = `Promise ${item.index + 1} rejected with error: ${item.error.message}`;
//             }
//             outputDiv.appendChild(p);
//         });
//     });
// });


const res = document.getElementById("output");
const promises = [];
for (let i = 0; i < 5; i++) {
  promises.push(
    new Promise((resolve, reject) => {
      const rand = Math.random();
      if (rand < 0.5) {
        const num = Math.floor(Math.random() * 10) + 1;
        resolve(num);
      } else {
        reject(new Error(`Promise ${i + 1} rejected with error`));
      }
    })
  );
}
Promise.allSettled(promises)
  .then((results) => {
    const output = results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return result.reason.message;
      }
    });
    output.map((e) => {
      res.innerHTML += `
            <p>${e}</p>
        `;
    });
  })
  .catch((error) => {
    console.log(error);
  });
