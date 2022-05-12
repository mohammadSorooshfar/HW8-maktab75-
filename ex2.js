let people = {
  get fullName() {
    return `${this._name} ${this._family}`;
  },

  set fullName(value) {
    [this._name, this._family] = value.split(" ");
    LocalStorage.Update("student");
    LocalStorage.Update("teacher");
    LocalStorage.Update("manager");
  },
  get birthday() {
    return this._birthday;
  },

  set birthday(value) {
    this._birthday = value;
    LocalStorage.Update("student");
    LocalStorage.Update("teacher");
    LocalStorage.Update("manager");
  },
  get age() {
    return new Date().getFullYear() - this._birthday.year;
  },

  set age(value) {
    this._birthday.year = new Date().getFullYear() - value;
    LocalStorage.Update("student");
    LocalStorage.Update("teacher");
    LocalStorage.Update("manager");
  },
  get address() {
    let addressOfThis = this._address;
    return `${addressOfThis.country} ${addressOfThis.state} ${addressOfThis.city} ${addressOfThis.street} ${addressOfThis.No} ${addressOfThis.unit}  `;
  },

  set address(value) {
    this._address = value;
    LocalStorage.Update("student");
    LocalStorage.Update("teacher");
    LocalStorage.Update("manager");
  },
  get nationalId() {
    return this._nationalId;
  },

  set nationalId(value) {
    this._nationalId = value;
    LocalStorage.Update("student");
    LocalStorage.Update("teacher");
    LocalStorage.Update("manager");
  },
  get gender() {
    return this._gender;
  },

  set gender(value) {
    this._gender = value;
    LocalStorage.Update("student");
    LocalStorage.Update("teacher");
    LocalStorage.Update("manager");
  },
};

function Student(
  name,
  family,
  birthday,
  address,
  nationalId,
  gender,
  phoneNumber,
  grade,
  studyYear
) {
  this._name = name;
  this._family = family;
  this._birthday = birthday;
  this._address = address;
  this._nationalId = nationalId;
  this._gender = gender;
  this._phoneNumber = phoneNumber;
  this._grade = grade;
  this._studyYear = studyYear;
  Object.defineProperty(this, "grade", {
    get() {
      return this._grade;
    },
    set(value) {
      this._grade = value;
      LocalStorage.Update("student");
    },
  });
  Object.defineProperty(this, "studyYear", {
    get() {
      return this._studyYear;
    },
    set(value) {
      this._studyYear = value;
      LocalStorage.Update("student");
    },
  });
}
function Teacher(
  name,
  family,
  birthday,
  address,
  nationalId,
  gender,
  phoneNumber,
  email,
  salary,
  field
) {
  this._name = name;
  this._family = family;
  this._birthday = birthday;
  this._address = address;
  this._nationalId = nationalId;
  this._gender = gender;
  this._phoneNumber = phoneNumber;
  this._email = email;
  this._salary = salary;
  this._field = field;
  Object.defineProperty(this, "field", {
    get() {
      return this._field;
    },
    set(value) {
      this._field = value;
      LocalStorage.Update("teacher");
    },
  });
  Object.defineProperty(this, "email", {
    get() {
      return this._email;
    },
    set(value) {
      this._email = value;
      LocalStorage.Update("teacher");
    },
  });
  Object.defineProperty(this, "salary", {
    get() {
      return this._salary;
    },
    set(value) {
      this._salary = value;
      LocalStorage.Update("teacher");
    },
  });
}
function Manager(
  name,
  family,
  birthday,
  address,
  nationalId,
  gender,
  phoneNumber,
  email,
  salary,
  major
) {
  this._name = name;
  this._family = family;
  this._birthday = birthday;
  this._address = address;
  this._nationalId = nationalId;
  this._gender = gender;
  this._phoneNumber = phoneNumber;
  this._email = email;
  this._salary = salary;
  this._major = major;
  Object.defineProperty(this, "major", {
    get() {
      return this._major;
    },
    set(value) {
      this._major = value;

      LocalStorage.Update("manager");
    },
  });
  Object.defineProperty(this, "email", {
    get() {
      return this._email;
    },
    set(value) {
      this._email = value;
      LocalStorage.Update("manager");
    },
  });
  Object.defineProperty(this, "salary", {
    get() {
      return this._salary;
    },
    set(value) {
      this._salary = value;
      LocalStorage.Update("manager");
    },
  });
}

Student.prototype = people;
Teacher.prototype = people;
Manager.prototype = people;

let LocalStorage = {
  Add(obj = {}, type) {
    let id = Object.keys(this.database[type]).length;
    let targetObject = this.database[type];
    let target = this.Find(
      { name: obj.name, family: obj.family, nationalId: obj.nationalId },
      type
    );
    if (target == -1) {
      switch (type) {
        case "student":
          targetObject[id] = new Student(...Object.values(obj));
          break;
        case "teacher":
          targetObject[id] = new Teacher(...Object.values(obj));
          break;

        case "manager":
          targetObject[id] = new Manager(...Object.values(obj));
          break;

        default:
          break;
      }
      this.Update(type);
    }
  },
  Remove(id, type) {
    let targetObject = this.database[type];
    delete targetObject[id];
    this.Update(type);
  },
  Find(obj = {}, type) {
    let { name, family, nationalId } = obj;
    let targetObject = this.database[type];
    let arr = Object.values(targetObject);
    return arr.indexOf(
      arr.find((value) => {
        let full = `${name} ${family}`;
        if ((value.fullName == full, value.nationalId == nationalId)) {
          return value;
        }
      })
    );
  },
  getInformation(id, type) {
    let targetObject = this.database[type];
    return Object.values(targetObject).find((value, index) => {
      if (index == id) {
        return value;
      }
    });
  },
  Update(type) {
    localStorage.setItem(type, JSON.stringify(LocalStorage.database[type]));
  },
  database: {
    student: {},
    teacher: {},
    manager: {},
  },
};
LocalStorage.Add(
  {
    name: "mamad",
    family: "soroosh",
    birthday: {},
    address: {},
    nationalId: 22,
    gender: "male",
    phoneNumber: "099999999",
    grade: 20,
    studyYear: 1999,
  },
  "student"
);
LocalStorage.Add(
  {
    name: "mamad",
    family: "soroosh",
    birthday: {},
    address: {},
    nationalId: 22,
    gender: "male",
    phoneNumber: "09871249",
    grade: 20,
    studyYear: 1999,
  },
  "student"
);
LocalStorage.Add(
  {
    name: "akbar",
    family: "soroosh",
    birthday: {},
    address: {},
    nationalId: 25,
    gender: "male",
    phoneNumber: "124135623",
    grade: 20,
    studyYear: 1999,
  },
  "student"
);
LocalStorage.Add(
  {
    name: "kamran",
    family: "kamrani",
    birthday: {},
    address: {},
    nationalId: 676767,
    gender: "male",
    phoneNumber: "0912345",
    email: "kamran.kamrani@gmail.com",
    salary: 700,
    field: "math",
  },
  "teacher"
);
LocalStorage.Add(
  {
    name: "fateme",
    family: "fatemi",
    birthday: {},
    address: {},
    nationalId: 449788544,
    gender: "female",
    phoneNumber: "09371884290",
    email: "fateme.fatemi@gmail.com",
    salary: 600,
    field: "science",
  },
  "teacher"
);
LocalStorage.Add(
  {
    name: "ali",
    family: "hasani",
    birthday: {},
    address: {},
    nationalId: 55874254,
    gender: "male",
    phoneNumber: "0912123456",
    email: "alihasan@gmail.com",
    salary: 520,
    major: "MBA",
  },
  "manager"
);
// LocalStorage.Remove(2, "student");
// console.log(
//   LocalStorage.Find(
//     { name: "akbar", family: "soroosh", nationalId: 25 },
//     "student"
//   )
// );
// console.log(LocalStorage.getInformation(2, "student"));
