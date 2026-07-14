export const TYPING_SNIPPETS = [
  `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
  `const users = data.filter((u) => u.active).map((u) => u.name);`,
  `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + " ovoz chiqardi");
  }
}`,
  `async function getData(url) {
  const res = await fetch(url);
  return res.json();
}`,
  `for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) console.log(i);
}`,
];
