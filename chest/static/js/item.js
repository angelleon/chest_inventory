window.addEventListener("load", () => {
  let edit_btns = document.getElementsByClassName("item-edit-btn");
  debugger;
  for (button of edit_btns) {
    let item_id = `/${button.getAttribute("item-id")}/edit`;
    button.addEventListener("click", () => {
      location.href += item_id;
      debugger;
    });
    debugger;
  }
});
