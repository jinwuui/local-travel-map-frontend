import { reactive, computed, ref } from "vue";
import imageCompression from "browser-image-compression";

import NewPlace from "@/models/NewPlace";
import { placeAPI } from "@/services/place.api";
import usePlace from "@/components/states/usePlace";

const { addPlaceOnMap } = usePlace();

const isFormOpen = ref(false);
const step = ref(0);
const newPlace = reactive({ value: null });
const isLoading = ref(false);

function markerDragend(event) {
  newPlace.value.lat = event.latLng.lat();
  newPlace.value.lng = event.latLng.lng();
}

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
  isLoading.value = true;

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

  isLoading.value = false;
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

function openForm(lat, lng) {
  console.log("-- openForm");

  newPlace.value = new NewPlace({
    lat: lat,
    lng: lng,
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
    markerDragend,
    changeRating,
    toggleCategory,

    isFormOpen: computed(() => isFormOpen.value),
    isLoading: computed(() => isLoading.value),
    openForm,
    closeForm,

    newPlace: computed(() => newPlace.value),
    addNewPlace,

    step: computed(() => step.value),
    prevStep,
    nextStep,
  };
}
