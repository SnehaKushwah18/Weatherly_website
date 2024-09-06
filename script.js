document.addEventListener("DOMContentLoaded", () => {
    const temperatureField = document.querySelector(".temp p");
    const locationField = document.querySelector(".time_location p:first-child");
    const dateandtimeField = document.querySelector(".time_location p:last-child");
    const conditionField = document.querySelector(".condition p:last-child");
    const searchField = document.querySelector(".search_area");
    const form = document.querySelector(".form");
  
    
    console.log(form); 
  
    if (!form) {
      console.error("Form element not found! Please check the HTML structure.");
      return;
    }
  
    form.addEventListener("submit", searchForLocation);
  
    let target = "Gwalior";
  
   
    const fetchResults = async (targetLocation) => {
      let url = `http://api.weatherapi.com/v1/current.json?key=25693220c5a34b3396e145445240509&q=${targetLocation}&aqi=no`;
  
      try {
        const res = await fetch(url);
  
        if (!res.ok) {
          console.error(`Error: ${res.status}`);
          return;
        }
  
        const data = await res.json();
        console.log(data);
  
        // Update fields with the fetched data
        updateDetails(
          `${data.current.temp_c}°C`,
          data.location.name,
          data.location.localtime,
          data.current.condition.text
        );
      } catch (error) {
        console.error("Error fetching the weather data:", error);
      }
    };
  
    // Function to update the weather details on the page
    function updateDetails(temp, locationName, time, condition) {
      let splitDate = time.split(" ")[0];
      let splitTime = time.split(" ")[1];
  
      let currentDay = getDayName(new Date(splitDate).getDay()); 
  
      temperatureField.innerText = temp;
      locationField.innerText = locationName;
      dateandtimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
      conditionField.innerText = condition;
    }
  
    // Handle form submission and fetch new weather data
    function searchForLocation(e) {
      e.preventDefault();
      target = searchField.value;
      fetchResults(target);
    }
  

    fetchResults(target);
  
    function getDayName(number) {
      switch (number) {
        case 0:
          return "Sunday";
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday"
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
        default:
          return ""; 
      }
    }
  });
  