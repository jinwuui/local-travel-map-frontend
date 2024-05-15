import { placeAPI } from "@/services/place.api";
import { reactive } from "vue";

const newPlace = reactive({
  name: "",
  description: "",
  rating: 0,
  category: "",
});

const isValid = () => {
  return (
    newPlace.name.trim() &&
    newPlace.rating != 0 &&
    newPlace.category.trim() &&
    newPlace.description.trim()
  );
};

const addPlace = async () => {
  if (isValid()) {
    console.log("addPlace", newPlace);
    await placeAPI.addPlace({
      name: newPlace.name,
      description: newPlace.description,
      rating: newPlace.rating,
      category: newPlace.category,
    });
  } else {
    alert("부정확한 입력");
  }
};

export { newPlace, addPlace };
