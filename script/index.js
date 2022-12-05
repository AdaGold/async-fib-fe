// const { default: axios } = require("axios");

const BASE_URL = "http://localhost:5000"

let lblTime;
let txtN;
let lblResult;
let lblRuntime;
let btnLocal;
let btnRemote;
let localStart;
let remoteStart;
let radColor;
let txaInput;

const fib = (n) => {
  if (n <= 1) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
};

const fibApi = (n) => {
  return axios.get(`${BASE_URL}/fib/${n}`)
    .then(response => response.data.result)
};

const updateTime = () => {
  const now = new Date();
  lblTime.textContent = now;
};

const showRuntime = (t) => {
  lblRuntime.textContent = ` runtime: ${t / 1000}s`;
};

const remoteFib = () => {
  const n = parseInt(txtN.value);
  remoteStart = new Date();
  return fibApi(n)
    .then(result => {
      const finished = new Date();
      lblResult.textContent = result;
      const runtime = finished - remoteStart;
      showRuntime(runtime);
    });
};

const localFib = () => {
  const n = parseInt(txtN.value);
  localStart = new Date();
  const result = fib(n);
  const finished = new Date();
  lblResult.textContent = result;
  const runtime = finished - localStart;
  showRuntime(runtime);
};

const handleColorChange = (event) => {
  const checked = event.target.checked;
  const color = event.target.value;

  if (!checked) { return; }

  txaInput.classList.remove("red");
  txaInput.classList.remove("green");
  txaInput.classList.remove("blue");

  txaInput.classList.add(color);
};

const registerEvents = () => {
  btnLocal.addEventListener("click", event => localFib());
  btnRemote.addEventListener("click", event => remoteFib());
  for (radio of radColor) {
    radio.addEventListener("change", handleColorChange);
  }
  setInterval(updateTime, 250);
};

const loadControls = () => {
  lblTime = document.getElementById("lblTime");
  txtN = document.getElementById("txtN");
  lblResult = document.getElementById("lblResult");
  lblRuntime = document.getElementById("lblRuntime");
  btnLocal = document.getElementById("btnLocal");
  btnRemote = document.getElementById("btnRemote");
  txaInput = document.getElementById("txaInput");
  radColor = document.querySelectorAll("[type='radio']");
};

const onLoad = () => {
  loadControls();
  registerEvents();
};

document.addEventListener("DOMContentLoaded", onLoad);