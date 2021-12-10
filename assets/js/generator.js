const modalErrorMessage = document.querySelector('.error-message');
const errorText = document.querySelector('.error-body__error-text');

const passwordAlphabet = 
  [
    `ABCDEFGHIJKLMNOPQRSTUVWXYZ`, 
    `abcdefghijklmnopqrstuvwxyz`, 
    `0123456789`, 
    `,.;:?'!@|/\\_~*+-\`)(}{<>[]#%&$^="`
  ];
let activeAlphabet = '';
let password = '';
let errorMessage = '<span>Ошибка:</span> Не выбран алфавит генератора пароля!';

function randomizePassword (passwordAlphabet) {
  const tempObjSettings = JSON.parse(localStorage.getItem('settingsPassGeneration'));

  for (let i = 0; i < tempObjSettings.attiributeStatus.length; i++) {
    if (tempObjSettings.attiributeStatus[i]) {
      activeAlphabet += passwordAlphabet[i];
    }
  }

  const getRandomNumber = (max) => {
    return Math.floor( Math.random() * max)
  };

  const checkAllPasswordSymbols = () => {
    if ( password.includes(activeAlphabet[randomIndex]) ) {
      randomIndex = getRandomNumber(activeAlphabet.length);
      checkAllPasswordSymbols()
    } else {
      password += activeAlphabet[randomIndex];
    }
  };

  if (!tempObjSettings.attiributeStatus.includes(true) && tempObjSettings.symbolsRepeat) {
    errorText.innerHTML = errorMessage;
    
    modalErrorMessage.classList.remove('error-message_transparent')
    
    setTimeout(() => {
      modalErrorMessage.classList.add('error-message_transparent')
    }, 8000)

    return
  }

  const getNoneRepeatSymbol = () => {
    for (let i = 0; i < tempObjSettings.passwordLength; i++) {
      randomIndex = getRandomNumber(activeAlphabet.length);

      if (!tempObjSettings.attiributeStatus.includes(true)) {
        errorText.innerHTML = '';
        errorText.innerHTML = errorMessage;
        
        modalErrorMessage.classList.remove('error-message_transparent')
        
        setTimeout(() => {
          modalErrorMessage.classList.add('error-message_transparent')
        }, 8000)

        return
      } else if (activeAlphabet.length < +tempObjSettings.passwordLength && !tempObjSettings.symbolsRepeat) {
        errorMessage = '<span>Ошибка:</span> Длинна алфавита генератора паролей меньше длинны генерируемого пароля.';
        errorText.innerHTML = '';
        errorText.innerHTML = errorMessage;
        
        modalErrorMessage.classList.remove('error-message_transparent')
        
        setTimeout(() => {
          modalErrorMessage.classList.add('error-message_transparent')
        }, 8000)

        return
      } else if (tempObjSettings.passwordLength <= 0 || tempObjSettings.passwordLength == '') {
        errorMessage = '<span>Ошибка:</span> Длинна пароля должна быть больше нуля.';
        errorText.innerHTML = '';
        errorText.innerHTML = errorMessage;

        modalErrorMessage.classList.remove('error-message_transparent')
        
        setTimeout(() => {
          modalErrorMessage.classList.add('error-message_transparent')
        }, 8000)

        return
      } else {
        checkAllPasswordSymbols()
      }
    }
  };

  const getPassword = (activeAlphabet) => {
    if (tempObjSettings.symbolsRepeat) {
      for (let i = 0; i < tempObjSettings.passwordLength; i++) {
        randomIndex = getRandomNumber(activeAlphabet.length);
        password += activeAlphabet[randomIndex];
      }
    } else {
      getNoneRepeatSymbol()
    }
    
  };

  getPassword(activeAlphabet)

  formInput.value = password;
  activeAlphabet = '';
  password = '';
}


btnGeneratePass.addEventListener('click', (e) => {
  e.preventDefault()

  randomizePassword(passwordAlphabet)
  changeVisibleBtnClearInput(formInput, btnClearInput)

  if (formInput.value != '') {
    eventBodyMessage.innerHTML = 'Пароль сгенерирован';

    blockEvent.classList.remove('block-event_transparent')
      
    setTimeout(() => {
      blockEvent.classList.add('block-event_transparent')
    }, 2000)
  }
})