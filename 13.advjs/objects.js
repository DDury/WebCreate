const job = {
  title: "Developer",
  location: "Daegu",
  salary: 100000,
};

const job1 = {
  title: "Shef",
  location: "Daegu",
  salary: 50000,
};

console.log(new Date().toDateString());

class Profile {
  constructor(a, b, c) {
    this.title = a;
    this.place = b;
    this.salary = c;
  }
  descrive() {
    console.log(
      `I'm a ${this.title}, work in ${this.place}, salary is ${this.salary}`
    );
  }
}

const job2 = new Profile("SH", "Daegu", 100000);

job2.descrive();
