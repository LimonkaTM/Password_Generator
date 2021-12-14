function randomizePassword () {
  const tempObjSettings = JSON.parse(localStorage.getItem('settingsPassGeneration'));

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

  const getNoneRepeatSymbol = () => {
    for (let i = 0; i < tempObjSettings.passwordLength; i++) {
      randomIndex = getRandomNumber(activeAlphabet.length);
      checkAllPasswordSymbols()
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
  password = '';
}

btnGeneratePass.addEventListener('click', (e) => {
  e.preventDefault()

  randomizePassword(passwordAlphabet)
  changeVisibleBtnClearInput(formInput, btnClearInput)
  showErrorOrLogMessage(blockEvent, eventBodyMessage, 'block-event_transparent', 'Пароль сгенерирован', 2000)
})