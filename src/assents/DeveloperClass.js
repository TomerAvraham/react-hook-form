class Developer {
  constructor(firstName, lastName, age, type) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.type = type;
  }

  get formalName() {
    return `${this.lastName} ${this.firstName}`;
  }

  get summary() {
    return `Hey, my name is: ${this.firstName}. My age is: ${this.age}. I work as ${this.type} dev.`;
  }
}

export default Developer;
