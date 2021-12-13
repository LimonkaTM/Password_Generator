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

const modalErrorMessage = document.querySelector('.error-message');
const errorMessage = document.querySelector('.error-body__error-text');
let errorStatus = false;

const blockEvent = document.querySelector('.block-event');
const eventBodyMessage = document.querySelector('.event-body__message');

const passwordAlphabet = [
  `ABCDEFGHIJKLMNOPQRSTUVWXYZ`, 
  `abcdefghijklmnopqrstuvwxyz`, 
  `0123456789`, 
  `,.;:?'!@|/\\_~*+-\`)(}{<>[]#%&$^="`
];
// let activeAlphabet = '';
let activeAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let password = '';

const defaultPasswordSettings = {
  passwordLength: 12,
  attiributeStatus: [true, true, true, false],
  symbolsRepeat: true,
}

//* Проверка на наличие LocalStorage

const settingsGeneration = localStorage.getItem('settingsPassGeneration') ? 
  JSON.parse(localStorage.getItem('settingsPassGeneration')) : defaultPasswordSettings;

if (!localStorage.getItem('settingsPassGeneration')) {
  localStorage.setItem('settingsPassGeneration', JSON.stringify(defaultPasswordSettings))
}

//*

const showErrorOrLogMessage = (parentBlock, childBlock, styleCalss,textMessage, showTime) => {
  childBlock.innerHTML = '';
  childBlock.innerHTML = textMessage;

  parentBlock.classList.remove(styleCalss) 

  setTimeout(() => {
    parentBlock.classList.add(styleCalss)
  }, showTime)
};

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
    if (arrAttribute[i].classList.contains(`${arrAttribute[i].classList[1]}_active`)) {
      activeAlphabet += passwordAlphabet[i];
    }
    arrAttributeStatus.push(arrAttribute[i].classList.contains(`${arrAttribute[i].classList[1]}_active`));
  }

  return arrAttributeStatus
};

console.log(attributeArrSymbols);
console.log(getArrAttributeStatus(attributeArrSymbols));
console.log(activeAlphabet);

const changeObjSettingPassGeneration = (obj, attribute1, attribute2, attribute3) => {
  obj.passwordLength = attribute1.value;
  obj.attiributeStatus = attribute2;
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
  activeAlphabet = '';
  parentAddShadow.classList.add('main-bg-shadow');
  modal.classList.remove('modal-settings_transparent');
};

const closeModalSettings = (parentRemoveShadow, modal) => {
  parentRemoveShadow.classList.remove('main-bg-shadow')
  modal.classList.add('modal-settings_transparent');
};

btnSettings.addEventListener('click', (e) => {
  e.preventDefault()

  openModalSettings(main, modalSettings)
  showErrorOrLogMessage(blockEvent, eventBodyMessage, 'block-event_transparent', 'Открыты настройки генерации', 2000)

  main.style.overflow = 'hidden';
});

btnCloseModalSettings.addEventListener('click', (e) => {
  e.preventDefault()

  changeObjSettingPassGeneration(settingsGeneration, attributePasswordLength, getArrAttributeStatus(attributeArrSymbols), attributeSymbolsRepeat)

  //* Обработка ошибок

  if (settingsGeneration.passwordLength <= 0 || settingsGeneration.passwordLength == '' || settingsGeneration.passwordLength > 32) {
    showErrorOrLogMessage(modalErrorMessage, errorMessage, 'error-message_transparent', '<span>Ошибка:</span> Недопустимое значение длинны пароля!', 8000)
    activeAlphabet = '';
    errorStatus = true;
    return
  } else if (!settingsGeneration.attiributeStatus.includes(true)) {
    showErrorOrLogMessage(modalErrorMessage, errorMessage, 'error-message_transparent', '<span>Ошибка:</span> Не выбран алфавит генератора пароля!', 8000)
    errorStatus = true;
    activeAlphabet = '';
    return
  } else if (activeAlphabet.length < +settingsGeneration.passwordLength && !settingsGeneration.symbolsRepeat) {
    showErrorOrLogMessage(modalErrorMessage, errorMessage, 'error-message_transparent', '<span>Ошибка:</span> Длинна алфавита генерации меньше указанной длинны пароля!', 8000)
    errorStatus = true;
    activeAlphabet = '';
    return
  } else {
    errorStatus = false;
  }

  if (!errorStatus) {
    closeModalSettings(main, modalSettings)
    
    main.style.overflow = '';

    showErrorOrLogMessage(blockEvent, eventBodyMessage, 'block-event_transparent', 'Настройки сохранены', 2000)

    localStorage.setItem('settingsPassGeneration', JSON.stringify(settingsGeneration))
  }
})

formInput.addEventListener('input', () => {
  changeVisibleBtnClearInput(formInput, btnClearInput)
})

btnClearInput.addEventListener('click', (e) => {
  e.preventDefault()
  
  formInput.value = '';

  changeVisibleBtnClearInput(formInput, btnClearInput)
  showErrorOrLogMessage(blockEvent, eventBodyMessage, 'block-event_transparent', 'Очищено', 2000)
})

btnCopy.addEventListener('click', (e) => {
  e.preventDefault()

  setClipboardValue(formInput.value)
  showErrorOrLogMessage(blockEvent, eventBodyMessage, 'block-event_transparent', 'Скопировано', 2000)
})

setToggleAttributeArr(attributeArrSymbols)