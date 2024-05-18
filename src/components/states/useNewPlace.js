import NewPlace from "@/models/NewPlace";
import { placeAPI } from "@/services/place.api";
import { reactive, computed, ref } from "vue";

const isFormOpen = ref(false);

const newPlace = reactive({ value: null });

async function addNewPlace(photoFiles) {
  if (newPlace.value.isValid()) {
    const formData = newPlace.value.toFormData();

    photoFiles?.forEach((file) => {
      formData.append("photos", file);
    });

    // Check if FormData contains the data
    for (const [key, value] of formData.entries()) {
      console.log(`formData: ${key}:`, value);
    }

    await placeAPI.addPlace(formData);

    // TODO: 로딩 보여주기 -> 저장 완료 -> places에 넣기 -> 창 닫기
    closeForm();
  } else {
    alert("부정확한 입력");
  }
}

function closeForm() {
  newPlace.value = null;
  isFormOpen.value = false;
}

function openForm(event) {
  isFormOpen.value = true;
  newPlace.value = new NewPlace({
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  });
}

export default function useNewPlace() {
  return {
    isFormOpen: computed(() => isFormOpen.value),
    openForm,
    closeForm,

    newPlace: computed(() => newPlace.value),
    addNewPlace,
  };
}
