import { reactive, computed, ref } from "vue";
import imageCompression from "browser-image-compression";

import NewPlace from "@/models/NewPlace";
import { placeAPI } from "@/services/place.api";
import uiState from "@/components/states/uiState";
import useSelectedPlace from "@/components/states/useSelectedPlace";

const { toggleNewPlaceLoading, toggleNewPlaceForm } = uiState;
const { selectPlace } = useSelectedPlace();

const nameText = ref("");
const descriptionText = ref("");

const step = ref(0);
const newPlace = reactive({ value: null });

function updateName(event) {
  nameText.value = event.target.value;
}

function updateDescription(event) {
  descriptionText.value = event.target.value;
}

function setNewPlacePosition(lat, lng) {
  newPlace.value.lat = lat;
  newPlace.value.lng = lng;
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
  newPlace.value.name = nameText.value;
  newPlace.value.description = descriptionText.value;

  if (newPlace.value.isValid()) {
    console.log("imagefiles", imageFiles);
    try {
      toggleNewPlaceLoading();

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

      console.log("before result");
      await placeAPI
        .addPlace(formData)
        .then((result) => {
          result.lat = parseFloat(result.lat);
          result.lng = parseFloat(result.lng);
          selectPlace(result);
        })
        .catch((error) => {
          throw error;
        });

      closeNewPlaceForm();

      // TODO: 로딩 보여주기 -> 저장 완료 -> places에 넣기 -> 창 닫기
    } catch (error) {
      console.error("Error during add new place", error);
      throw error;
    } finally {
      toggleNewPlaceLoading();
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

function openNewPlaceForm(lat, lng) {
  console.log("-- openNewPlaceForm");

  newPlace.value = new NewPlace({
    lat: lat,
    lng: lng,
  });

  toggleNewPlaceForm();
  step.value = 0;
}

function closeNewPlaceForm() {
  console.log("-- closeNewPlaceForm");
  newPlace.value = null;
  nameText.value = "";
  descriptionText.value = "";
  toggleNewPlaceForm();
}

export default function useNewPlace() {
  return {
    nameText,
    descriptionText,
    updateName,
    updateDescription,

    setNewPlacePosition,
    changeRating,
    toggleCategory,

    openNewPlaceForm,
    closeNewPlaceForm,

    newPlace: computed(() => newPlace.value),
    addNewPlace,

    step: computed(() => step.value),
    prevStep,
    nextStep,
  };
}
