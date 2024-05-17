import { placeAPI } from "@/services/place.api";
import { reactive, computed, ref } from "vue";

const isFormOpen = ref(false);

const newPlace = reactive({
  lat: 0,
  lng: 0,
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

const addNewPlace = async () => {
  //TODO: lat, lng 추가
  if (isValid()) {
    console.log("addNewPlace", newPlace);

    await placeAPI.addPlace({
      lat: newPlace.lat,
      lng: newPlace.lng,
      name: newPlace.name,
      description: newPlace.description,
      rating: newPlace.rating,
      category: newPlace.category,
    });

    // TODO: 로딩 보여주기 -> 저장 완료 -> places에 넣기 -> 창 닫기
    closeForm();
  } else {
    alert("부정확한 입력");
  }
};

function closeForm() {
  isFormOpen.value = false;
}

function openForm(event) {
  isFormOpen.value = true;
  newPlace.lat = event.latLng.lat();
  newPlace.lng = event.latLng.lng();
}

export default function useNewPlace() {
  return {
    isFormOpen: computed(() => isFormOpen.value),
    openForm,
    closeForm,

    newPlace,
    addNewPlace,
  };
}
