//import Magnet from "../../magnet.js/libs/magnet";
//debugger;

/**
 * TODO: Add magnet button to enable/disable snap
 * TODO: Add logic to avoid overlap
 *
 */

function add_qr(magnet, url, uuid) {
  console.log(`Adding QR code with url: ${url}`);
  let screen_w = window.innerWidth;
  let screen_h = window.innerHeight;
  let canvas = document.getElementById("canvas");
  let qr_w = 100;
  let qr_h = 100;

  let qr_container = document.createElement("div");
  qr_container.classList.add("qr-container");
  console.log(qr_container);
  qr_container.style.width = `${qr_w}px`;
  qr_container.style.height = `${qr_h}px`;
  qr_container.style.top = "150px";
  qr_container.style.left = "150px";
  qr_container.style.backgroundColor = "magenta";
  qr_container.setAttribute('uuid', uuid);
  console.log(qr_container);

  let qr_img = document.createElement("img");
  qr_img.src = url;

  let close_btn = document.createElement("button");
  close_btn.innerHTML = "X";
  close_btn.addEventListener("touchstart", (ev) => ev.stopPropagation());
  close_btn.addEventListener("mousedown", (ev) => ev.stopPropagation());
  close_btn.addEventListener("click", () => {
    console.log("Delete button clicked");
  });

  qr_container.appendChild(qr_img);
  qr_container.appendChild(close_btn);
  canvas.appendChild(qr_container);
  magnet.add(qr_container);
}

function serialize_canvas() {
  //debugger;
  let canvas = document.getElementById("canvas");
  let origin = {
    x: canvas.getBoundingClientRect().left,
    y: canvas.getBoundingClientRect().top,
  };
  console.log(origin);
  let paper_selector = document.getElementById("paper-selector");
  paper_size = paper_selector.value;
  let qrs = [];

  for (qr of canvas.querySelectorAll(".qr-container")) {
    //console.log(qr);
    let qr_box = qr.getBoundingClientRect();
    if (!qr_box) {
      throw new Error("qr rectangle undefined");
    }
    let serialized_qr = {
      x: qr_box.left - origin.x,
      y: qr_box.top - origin.y,
      w: qr_box.width,
      h: qr_box.height,
      uuid: qr.getAttribute("uuid"),
    };
    if (!serialized_qr.uuid) {
      console.log(qr.getAttribute('uuid'));
      throw new Error("Qr object does not contain uuid");
    }
    qrs.push(serialized_qr);
  }
  let page = {
    paper_size,
    qrs,
  };
  debugger;
  return page;
}

async function send_page_definition() {
  let body = {
    param1: "value1",
    param2: "value2",
    param3: "value3",
  };
  const url = "localhost:8000/chest/print/add";
  let pdf_url = await fetch(url, {
    body,
    method: "POST",
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}`);
      }
      return resp.json();
    })
    .catch((err) => {
      console.error(err);
    });
  //debugger;
}

function render_codes(data) {
    let qr_inventory = document.getElementById("sidebar").querySelector('#qr-inventory');
    for (let qr of data) {
        let item = document.createElement("div");
        let img = document.createElement("img");
        let code = document.createElement("div");
        let text = document.createElement("i");
        text.innerHTML = qr.name;
        img.setAttribute('href', data.image_url);
        code.appendChild(img);
        item.appendChild(code);
        item.appendChild(text);
        item.setAttribute('uuid', qr.uuid);
        qr_inventory.appendChild(item);
    }
}

const magnet = new Magnet();

magnet.distance(15);
magnet.attractable(true);
magnet.allowCtrlKey(true);

async function load_data() {
  const url = "localhost:8000/chest/codes";
  let codes = await fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}`);
      }
      return resp.json();
    })
    .catch((err) => {
      console.error(err);
    });
    return codes;
}

window.addEventListener("load", () => {
  let container = document.getElementById("canvas");
  let mask = document.getElementById("lines");
  let v_magnet = mask.querySelector("#v-magnet");
  let h_magnet = mask.querySelector("#h-magnet");

  magnet
    .on("start change end", ({ type }) => {
      console.log(`magnet${type}`);
    })
    .on("end", () => {
      h_magnet.classList.remove("show");
      v_magnet.classList.remove("show");
    })
    .on("change", (ev) => {
      let result = ev.detail;
      let result_x = result.x;
      let result_y = result.y;
      console.log(result);
      // add distance logic

      if (!result_x) {
        v_magnet.classList.remove("show");
      } else {
        v_magnet.style.left = `${result_x.position}px`;
        v_magnet.classList.add("show");
      }

      if (!result_y) {
        h_magnet.classList.remove("show");
      } else {
        h_magnet.style.left = `${result_y.position}px`;
        h_magnet.classList.add("show");
      }
    });
  //debugger;
  let add_qr_btn = document.getElementById("add-qr-btn");
  add_qr_btn.addEventListener("click", () => {
    add_qr(magnet);
  });

  let print_btn = document.getElementById("print-btn");
  print_btn.addEventListener("click", () => {
    serialize_canvas();
    send_page_definition();
  });
  //let qrs = load_data();
  //render_codes(qrs);

  let delete_buttons = document.getElementsByClassName('delete-qrs');
  for (let button of delete_buttons) {
    button.addEventListener('click', () => {
    });
  }

  let add_single_buttons = document.getElementsByClassName('add-single-qr');
  //debugger;
  for (let button of add_single_buttons) {
    console.log(button);
    let qr_src = `${button.getAttribute('src')}`;
    let qr_uuid = `${button.getAttribute('uuid')}`;
    console.log(qr_src);
    button.addEventListener('click', () => {
      //console.log(this);
      console.log(qr_src);
      add_qr(magnet, qr_src, qr_uuid);
    });
  }
});
