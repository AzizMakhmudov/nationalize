let container = document.createElement("div");
container.setAttribute("id", "container");
document.body.appendChild(container);

let h1 = document.createElement("h1");
h1.innerText = "Check Nationality";
container.append(h1);

let formDiv = document.createElement("div");
container.setAttribute("class", "formDiv");
container.appendChild(formDiv);

let form = document.createElement("form");
form.setAttribute("class", "form");
formDiv.append(form);

let label = document.createElement("label");
label.setAttribute("for", "name");
label.innerText = "Name";
form.append(label);

let inputName = document.createElement("input");
inputName.setAttribute("type", "text");
inputName.setAttribute("id", "name");
inputName.setAttribute("required", "");
inputName.setAttribute("placeholder", "Enter name");
form.append(inputName);

let btn = document.createElement("button");
btn.setAttribute("class", "btn");
btn.innerText = "Check Probability";
form.append(btn);

let result = document.createElement("div");
result.setAttribute("class", "result");
container.append(result);
result.innerHTML = "";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let name = event.target.name.value;

  displayData(name);
  event.target.reset();
});

let displayData = async (name) => {
  let fetchData = await fetch(`https://api.nationalize.io/?name=${name}`);
  let data = await fetchData.json();
  result.innerHTML = "";
  let forResults = document.createElement("h2");
  forResults.innerHTML = `Results for name: ${name}`;
  container.append(forResults);
  for (let i = 0; i < 5; i++) {
    let box = document.createElement("div");
    box.setAttribute("class", "box");

    let id = document.createElement("p");
    id.setAttribute("class", "id");
    id.innerHTML = `Country ID: <span>${data.country[i].country_id}</span>`;

    let probability = document.createElement("p");
    probability.setAttribute("class", "prob");
    probability.innerHTML = `Probability: <span>${data.country[i].probability}</span>`;

    box.append(id);
    box.append(probability);
    result.append(box);
  }
};