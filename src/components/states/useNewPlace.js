import NewPlace from "@/models/NewPlace";
import { placeAPI } from "@/services/place.api";
import { reactive, computed, ref } from "vue";
import usePlace from "@/components/states/usePlace";

const { addPlaceOnMap } = usePlace();

const isFormOpen = ref(false);
const step = ref(0);
const newPlace = reactive({ value: null });

function changeRating(rating) {
  rating = Math.min(Math.max(rating, 0), 5);
  newPlace.value.rating = rating;
}

function toggleCategory(category) {
  if (newPlace.value.categories.includes(category)) {
    newPlace.value.categories = newPlace.value.categories.filter(
      (c) => c !== category
    );
  } else {
    newPlace.value.categories.push(category);
  }
}

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

    const result = await placeAPI.addPlace(formData);
    result.lat = parseFloat(result.lat);
    result.lng = parseFloat(result.lng);
    addPlaceOnMap(result);

    // TODO: 로딩 보여주기 -> 저장 완료 -> places에 넣기 -> 창 닫기
    closeForm();
  } else {
    alert("부정확한 입력");
  }
}

function prevStep() {
  step.value--;
  console.log("  -- prevStep", step.value);
}

function nextStep() {
  step.value++;
  console.log("  -- nextStep", step.value);
}

function openForm(event) {
  console.log("-- openForm");
  newPlace.value = new NewPlace({
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  });
  isFormOpen.value = true;
  step.value = 0;
}

function closeForm() {
  console.log("-- closeForm");
  newPlace.value = null;
  isFormOpen.value = false;
}

export default function useNewPlace() {
  return {
    changeRating,
    toggleCategory,

    isFormOpen: computed(() => isFormOpen.value),
    openForm,
    closeForm,

    newPlace: computed(() => newPlace.value),
    addNewPlace,

    step: computed(() => step.value),
    prevStep,
    nextStep,
  };
}
