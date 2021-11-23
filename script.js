const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const double = document.getElementById("double");
const showMillioners = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculateWealth = document.getElementById("calculate-wealth");

let data = [];

const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last} `,
    wealth: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, wealth: user.wealth * 2 };
  });

  updateDOM();
}

function sortUsers() {
  data.sort((a, b) => {
    return b.wealth - a.wealth;
  });

  updateDOM();
}

function whoIsMillioner() {
  data = data.filter((user) => {
    return user.wealth > 1000000;
  });
  updateDOM();
}

function totalWealth() {
  totalMoney = data.reduce((acc, user) => {
    return (acc += user.wealth);
  }, 0);

  updateDOM();
  const element = document.createElement("div");
  element.innerHTML = `<h2><strong>Total Money:</strong> ${formatMoney(
    totalMoney
  )}</h2>`;
  main.insertAdjacentElement("beforeend", element);
}

function addData(newUser) {
  data.push(newUser);

  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.wealth
    )}`;
    main.insertAdjacentElement("beforeend", element);
  });
}

getRandomUser();
getRandomUser();
getRandomUser();

function formatMoney(amount) {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortUsers);
showMillioners.addEventListener("click", whoIsMillioner);
calculateWealth.addEventListener("click", totalWealth);
