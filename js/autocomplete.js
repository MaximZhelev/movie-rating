/*!
 File created to refactor the code.
 So it can be reusable.
*/

//Destructuring properties from given object paramater so we can use it separately.
const createAutoComplete = ({root, renderOption,onOptionSelect,inputValue,fetchData}) => {
  root.innerHTML = `  
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
    </div>
  </div>`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  //Takes user input and  fetch results.
  const onInput = async (event) => {
    const items = await fetchData(event.target.value.trim());
    //console.log("".trim())
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    resultsWrapper.innerHTML = " "; //Empty content on new search.
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");
      

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);

      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value =inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };
  //Retrieve data while typing with 0.5 seconds delay
  input.addEventListener("input", debounce(onInput, 500));
  //If user hid dropdown, retrieve results after click on input.
  input.addEventListener("click", debounce(onInput, 0));

  //Hide dropdown on click anywehere on site unless
  //user click is in search area.
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
