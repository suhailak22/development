import elevatorImg from "../Assets/amenities/elevator 1.png";
import waterSupply from "../Assets/amenities/water_supply.png";
import securityCam from "../Assets/amenities/security-camera.png";
import weightlifting from "../Assets/amenities/weightlifting 1.png";
import policeman from "../Assets/amenities/policeman 1.png";
import wifi from "../Assets/amenities/wifi.png";
import parkingIcon from "../Assets/amenities/parking.png";
import powerBackup from "./../Assets/amenities/generator.png";

export const formatLargeNumber = (number) => {
  if (number < 1000) {
    return number.toLocaleString(); // Use default formatting for numbers less than 1000
  } else if (number < 100000) {
    // Convert to thousands
    return (
      (number / 1000).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }) + " K"
    );
  } else if (number < 10000000) {
    // Convert to lakhs
    return (
      (number / 100000).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }) + " lac"
    );
  } else {
    return (
      (number / 10000000).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }) + " Cr"
    );
  }
};

export const getStatus = (status) => {
  switch (status) {
    default:
      return ["Rejected"];
    case "1":
      return ["Posted"];
    case "2":
      return ["In Review"];
    case "3":
      return ["Sold"];
  }
};
export const getPostedBy = (seller) => {
  switch (seller) {
    default:
      return "rejected";
    case "1":
      return "Buyer";
    case "2":
      return "Agent";
    case "3":
      return "Builder";
  }
};

export const formatText = (str) => {
  if (!str) return;

  let words = str.split("_");

  // Capitalize the first letter of each word
  let capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

    // Join the words with a space
    return capitalizedWords.join(" ");
  };

  export function capitalizeWords(inputString) {
    // Split the string into words
    const words = inputString?.split(' ');
  
    // Capitalize the first letter of each word
    const capitalizedWords = words?.map(word => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word; // Handle empty words, if any
      }
    });
  
    // Join the words back into a string
    const resultString = capitalizedWords?.join(' ');
  
    return resultString;
  }
 export  function getAmenityBox(item) {
    switch (item) {
      case "Building Wi-Fi":
        return (
          <div className="amenity-col">
            <img src={wifi} loading="lazy" alt="Wifi" />
            <span>Wifi</span>
          </div>
        );
      case "Lift":
        return (
          <div className="amenity-col">
            <img src={elevatorImg} loading="lazy" alt="Lift" />
            <span>Lift</span>
          </div>
        );
      case "Fitness centre":
        return (
          <div className="amenity-col">
            <img src={weightlifting} loading="lazy" alt="Gym" />
            <span>Fitness centre</span>
          </div>
        );
      case "Parking":
        return (
          <div className="amenity-col">
            <img src={parkingIcon} loading="lazy" alt="Parking" />
            <span>Parking</span>
          </div>
        );
      case "Security":
        return (
          <div className="amenity-col">
            <img src={policeman} loading="lazy" alt="Policeman" />
            <span>Security</span>
          </div>
        );
      case "24 / 7 Water":
        return (
          <div className="amenity-col">
            <img src={waterSupply} loading="lazy" alt="Water Supply" />
            <span>24 / 7 Water</span>
          </div>
        );
      case "CCTV":
        return (
          <div className="amenity-col">
            <img src={securityCam} loading="lazy" alt="Security Cam" />
            <span>CCTV</span>
          </div>
        );
      case "Power Backup":
        return (
          <div className="amenity-col">
            <img src={powerBackup} loading="lazy" alt="Power Backup" />
            <span>Power Backup</span>
          </div>
        );
      default:
        break;
    }
  }