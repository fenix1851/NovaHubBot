async function sendForm(type) {
  let toSend = {};
  try {
    var button = document.getElementById("submit_button");
    button.addEventListener("click", function (e) {
      e.preventDefault();
      // check if all fields are filled
      let inputs = document.querySelectorAll("input");
      let selects = document.querySelectorAll("select");
      let allFilled = true;
      for (let i = 0; i < inputs.length; i++) {
        if (
          (inputs[i].value == "" ||
            (inputs[i].type == "file" && inputs[i].files.length == 0)) &&
          inputs[i].required
        ) {
          console.log(inputs[i]);
          allFilled = false;
          break;
        }
      }
      for (let i = 0; i < selects.length; i++) {
        if (selects[i].value == "") {
          console.log(selects[i]);
          allFilled = false;
          break;
        }
      }
      if (allFilled) {
        var form = document.getElementById("formid");
        var formData = new FormData(form);
        fetch("/form", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result.data);
            toSend = result.data;
            toSend.type = type;
            console.log("Success:", result);
            tg.sendData(JSON.stringify(toSend));
            tg.close();
            console.log(JSON.stringify(toSend))
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        alert("Please fill all the fields");
      }
    });
  } catch (error) {
    console.error(error);
  }
}
