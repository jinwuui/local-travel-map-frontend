import PlaceMarker from "@/models/PlaceMarker";
import { placeAPI } from "@/services/place.api";
import { reactive, watch } from "vue";
import { selectedPlace } from "./selected-place";

const places = reactive({ value: [] });

// TODO: 경도 위도 범위 내의 마커 호출
const fetchPlaceMarkers = async () => {
  console.log("fetch place markers");
  places.value = await placeAPI.fetchPlaceMarkers();

  places.value = [
    new PlaceMarker({
      placeId: 1,
      lat: 35.169,
      lng: 129.119,
      category: "adventure",
    }),
    new PlaceMarker({
      placeId: 2,
      lat: 35.168,
      lng: 129.117,
      category: "adventure",
    }),
    new PlaceMarker({
      placeId: 3,
      lat: 35.167,
      lng: 129.115,
      category: "adventure",
    }),
    new PlaceMarker({
      placeId: 4,
      lat: 35.166,
      lng: 129.113,
      category: "adventure",
    }),
    new PlaceMarker({
      placeId: 5,
      lat: 35.165,
      lng: 129.111,
      category: "adventure",
    }),
  ];
};

watch(selectedPlace, (newSelectedPlace) => {
  console.log("   watch - selected place:");

  places.value = places.value.map((place) =>
    place.placeId === newSelectedPlace.value.placeId
      ? newSelectedPlace.value
      : place
  );
});

export { places, fetchPlaceMarkers };
