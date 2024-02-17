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
