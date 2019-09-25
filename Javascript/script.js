let person = {
    name: "Vaclav",
    surname: "Pfudl",
    age: 28
};

console.log(person);

console.log(person["surname"]);

let selectedColors = ['red', 'blue'];

console.log(selectedColors);
console.log(selectedColors[1])

function greet(name)
{
    console.log("Hello " + name);
}

function printAge(number){
    console.log("Tvuj vek je: " + number)
}

greet(person.name);
printAge(person["age"]);

