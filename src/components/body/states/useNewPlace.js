import { computed, ref } from "vue";
import imageCompression from "browser-image-compression";

import NewPlace from "@/models/NewPlace";
import { placeAPI } from "@/services/place.api";
import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useSelectedPlace from "@/components/body/states/useSelectedPlace";

const {
  toggleSideTabLoading,
  navigateToComponent,
  navigateToPreviousComponent,
} = uiState;
const { selectPlace } = useSelectedPlace();

const nameText = ref("");
const descriptionText = ref("");

const step = ref(0);
const newPlace = ref(null);

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
    try {
      toggleSideTabLoading();

      const formData = newPlace.value.toFormData();

      if (imageFiles) {
        const compressedImageFiles = await Promise.all(
          imageFiles.map(async (file) => await compressImageFile(file))
        );

        compressedImageFiles?.forEach((file) => {
          formData.append("photos", file);
        });
      }

      const data = await placeAPI.addPlace(formData).then((result) => {
        result.lat = parseFloat(result.lat);
        result.lng = parseFloat(result.lng);
        closeNewPlaceForm();
        return result;
      });

      await selectPlace(data);
    } catch (error) {
      console.error("Error during add new place", error);
      throw error;
    } finally {
      toggleSideTabLoading();
    }
  } else {
    alert("부정확한 입력");
  }
}

async function compressImageFile(imageFile) {
  const options = {
    maxSizeMB: 1,
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
}

function nextStep() {
  step.value++;
}

function openNewPlaceForm(lat, lng) {
  newPlace.value = new NewPlace({
    lat: lat,
    lng: lng,
  });

  navigateToComponent(COMPONENT_NAMES.NEW_PLACE_FORM);
  step.value = 0;
}

function closeNewPlaceForm() {
  newPlace.value = null;
  nameText.value = "";
  descriptionText.value = "";
  navigateToPreviousComponent();
}

export default function useNewPlace() {
  return {
    nameText: computed(() => nameText.value),
    descriptionText: computed(() => descriptionText.value),
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
