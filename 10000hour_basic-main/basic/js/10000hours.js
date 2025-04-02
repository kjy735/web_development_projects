const startButton = document.querySelector(".start_btn");
const result = document.querySelector(".result");
const modal = document.querySelector("#modal");
const openButton = document.querySelector(".modal_btn");
const closeButton = document.querySelector(".close_btn");
const shareButton = document.querySelector(".share_button");
const loading = document.querySelector(".result_loading");

function calculator() {
  // 바뀔일이 없으면 const로
  const fieldValue = document.querySelector("#field_value");
  const timeValue = document.querySelector("#time_value");
  const timeValue_int = Number(timeValue.value);

  const fieldResult = document.querySelector(".field_result");
  const timeResult = document.querySelector(".time_result");

  if(fieldValue == "") {
    alert('분야가 입력되지 않았습니다.');
    fieldValue.focus();
    return false;
  } else if(timeValue_int == "") {
    alert('시간이 입력되지 않았습니다.');
    timeValue.focus();
    return false;
  } else if(timeValue_int > 24) {
    alert('잘못된 값입니다. 24이하의 값을 입력해 주세요.');
    return false;
  }

  result.style.display = "none";
  loading.style.display = "flex";

  setTimeout(function() {
    // 순서 수정함
    loading.style.display = "none"; // 로딩창 닫고
    fieldResult.innerText = fieldValue.value; // 값을 집어넣고
    timeResult.innerText = parseInt((10000/timeValue_int), 10); 
    // 소수점 자리 빼고(나눈값을 나타내겠다, 10진수로)
  }, 1800); // 1.8초 뒤에 (1800ms)
    result.style.display = "flex"; // 결과값 로딩
}

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if(event.target == modal) {
    closeModal();
  }
}

function copyUrl() {
  const url = window.location.href;

  navigator.clipboard.writeText(url).then(() => {
    alert("URL이 복사되었습니다.")
  });

}

shareButton.addEventListener('click', copyUrl);
openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
startButton.addEventListener('click', calculator);