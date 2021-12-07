const main = document.querySelector('.main');
const btnSettings = document.querySelector('.form__btn-settings');
const btnClearInput = document.querySelector('.form__btn-clear-input');
const btnCopy = document.querySelector('.form__btn-copy');
const btnGeneratePass = document.querySelector('.form__btn-generagte');
const formInput = document.querySelector('.form__input');

const modalSettings = document.querySelector('.modal-settings');
const btnCloseModalSettings = document.querySelector('.modal-settings-wrapper__btn-close');
const attributePasswordLength = document.querySelector('.block-attributes__input-password-length');
const attributeArrSymbols = document.querySelectorAll('.symbols');
const attributeSymbolsRepeat = document.querySelector('.checkbox-repeat-symbols');

const defaultPasswordSettings = {
  passwordLength: 12,
  attiributeStatus: [true, true, true, false],
  symbolsRepeat: true,
}

const settingsGeneration = localStorage.getItem('settingsPassGeneration') ? 
  JSON.parse(localStorage.getItem('settingsPassGeneration')) : defaultPasswordSettings;

if (!localStorage.getItem('settingsPassGeneration')) {
  localStorage.setItem('settingsPassGeneration', JSON.stringify(defaultPasswordSettings))
}

const changeStartPasswordSettings = (attribute1, attribute2, attribute3) => {
  const tempObjSettings = JSON.parse(localStorage.getItem('settingsPassGeneration'));

  attribute1.value = tempObjSettings.passwordLength;
  attribute3.checked = tempObjSettings.symbolsRepeat;

  for (let i = 0; i < attribute2.length; i++) {
    className = attribute2[i].classList[1];
    if (tempObjSettings.attiributeStatus[i] == true) {
      attribute2[i].classList.toggle(`${className}_active`, true)
    } else {
      attribute2[i].classList.toggle(`${className}_active`, false)
    }
  }
};

changeStartPasswordSettings(attributePasswordLength, attributeArrSymbols, attributeSymbolsRepeat);

const getArrAttributeStatus = (arrAttribute) => {
  arrAttributeStatus = [];

  for (let i = 0; i < arrAttribute.length; i++) {
    arrAttributeStatus.push(arrAttribute[i].classList.contains(`${arrAttribute[i].classList[1]}_active`));
  }

  return arrAttributeStatus
};

const changeObjSettingPassGeneration = (obj, attribute1, attribute2, attribute3) => {
  obj.passwordLength = attribute1.value;
  obj.attiributeStatus = attribute2
  obj.symbolsRepeat = attribute3.checked;
};

const setToggleAttributeArr = (arrItems) => {
  for (let i = 0; i < arrItems.length; i++) {
    arrItems[i].addEventListener('click', () => {
      className = arrItems[i].classList[1];
      arrItems[i].classList.toggle(`${className}_active`)
    })
  }
};

const setClipboardValue = (text) => {
  navigator.clipboard.writeText(text.trim())
};

const changeVisibleBtnClearInput = (input, btn) => {
  if (input.value != '') {
    btn.style.visibility = 'visible';
  } else {
    btn.style.visibility = 'hidden';
  }
};

const openModalSettings = (parentAddShadow, modal) => {
  parentAddShadow.classList.add('main-bg-shadow');
  modal.classList.remove('modal-settings__transparent');
  // modal.style.display = 'block';
};

const closeModalSettings = (parentRemoveShadow, modal) => {
  // setTimeout(() => {
  //   parentRemoveShadow.classList.remove('main-bg-shadow')
  // }, 500)
  parentRemoveShadow.classList.remove('main-bg-shadow')
  modal.classList.add('modal-settings__transparent');
  // modal.style.display = 'none';
};

btnSettings.addEventListener('click', (e) => {
  e.preventDefault()

  openModalSettings(main, modalSettings)
  console.log(settingsGeneration);
});

btnCloseModalSettings.addEventListener('click', () => {
  closeModalSettings(main, modalSettings)
  changeObjSettingPassGeneration(settingsGeneration, attributePasswordLength, getArrAttributeStatus(attributeArrSymbols), attributeSymbolsRepeat)
  
  localStorage.setItem('settingsPassGeneration', JSON.stringify(settingsGeneration))
})

formInput.addEventListener('input', () => {
  changeVisibleBtnClearInput(formInput, btnClearInput)
})

btnClearInput.addEventListener('click', (e) => {
  e.preventDefault()
  formInput.value = '';
  changeVisibleBtnClearInput(formInput, btnClearInput)
})

btnCopy.addEventListener('click', (e) => {
  e.preventDefault()
  setClipboardValue(formInput.value)
  
})

setToggleAttributeArr(attributeArrSymbols)