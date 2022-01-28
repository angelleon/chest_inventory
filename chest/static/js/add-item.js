function validate_form() {
  let form = document.forms["new_items"];
  console.log(form);
}

window.addEventListener("load", () => {
  let add_item_btn = document.getElementById("add-item-bnt");
  add_item_btn.addEventListener("click", () => {
    let forms = document.forms;
    let items = [];
    for (let item_form of forms) {
      console.log(item_form);
    }
  });

  let save_btn = document.getElementById("save-btn");
  save_btn.addEventListener("click", () => {
    if (!validate_form()) {
      return false;
    }
    return false;
  });
});
