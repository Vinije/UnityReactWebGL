let person = {
    name: "Vaclav",
    surname: "Pfudl",
    age: 28
};

console.log(person);

console.log(person["surname"]);

let selectedColors = ['red', 'blue'];

console.log(selectedColors);

function greet(name)
{
    console.log("Hello " + name);
}

greet(person.name);

