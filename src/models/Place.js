export default class Place {
  constructor(name = "", description = "", rating = 0) {
    console.log("this is cons", name, description, rating);
    this.name = name;
    this.description = description;
    this.rating = rating;
  }

  isValid() {
    if (
      this.name.trim() == "" ||
      this.description.trim() == "" ||
      this.rating == 0
    )
      return false;
    return true;
  }
}
