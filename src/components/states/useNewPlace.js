import { reactive, computed, ref } from "vue";
import imageCompression from "browser-image-compression";

import NewPlace from "@/models/NewPlace";
import { placeAPI } from "@/services/place.api";
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

async function addNewPlace(imageFiles) {
  if (newPlace.value.isValid()) {
    console.log("imagefiles", imageFiles);
    try {
      let compressedImageFiles = null;
      if (imageFiles) {
        compressedImageFiles = await Promise.all(
          imageFiles.map(async (file) => await compressImageFile(file))
        );
        console.log("--compressedImageFiles", compressedImageFiles);
      }

      const formData = newPlace.value.toFormData();

      imageFiles?.forEach((file) => {
        console.log("--image file", file);
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
    } catch (error) {
      console.error("Error during add new place", error);
      throw error;
    }
  } else {
    alert("부정확한 입력");
  }
}

async function compressImageFile(imageFile) {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  const compressedBlob = await imageCompression(imageFile, options);
  const compressedImage = new File([compressedBlob], imageFile.name, {
    type: imageFile.type,
  });
  return compressedImage;
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
  if (newPlace.value) {
    newPlace.value.setLatLng(event.latLng.lat(), event.latLng.lng());
  } else {
    if (event.latLng) {
      newPlace.value = new NewPlace({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    } else {
      newPlace.value = new NewPlace({
        lat: 35.16748,
        lng: 129.11503,
      });
    }
  }
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
