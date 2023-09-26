let txt = document.getElementById('txt')

function clickHandler() {
  console.log(this.value)

  const lastValue = txt.value[txt.value.length - 1]
  const operators = ['+', '-', '*', '/', '.']
  const thisIsOperator = operators.includes(this.value)

  if (this.value != '') {
    if (!operators.includes(lastValue) || !thisIsOperator) {
      txt.value += this.value
    }
  } else {
    let txtTemporaly = txt.value
    try {
      txt.value = eval(txt.value)
      txtTemporaly = `${txtTemporaly} = ${txt.value}`

      const historyArray = JSON.parse(localStorage.getItem('history'))

      if (!historyArray) {
        localStorage.setItem('history', JSON.stringify([txtTemporaly]))
      } else {
        historyArray.push(txtTemporaly)
        localStorage.setItem('history', JSON.stringify(historyArray))
      }


      renderHistory()
    } catch (err) {
      txt.value = 'Error'
      console.log(err)
    }
  }
}

const buttons = document.getElementsByClassName('btn')

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', clickHandler)
}

document.getElementById('btnClear').addEventListener('click', function () {
  txt.value = ''
})

document
  .getElementById('btnClearHistory')
  .addEventListener('click', function () {
    localStorage.removeItem('history')
    document.getElementById('history').innerHTML = ''
  })

function renderHistory() {
  const historyArray = JSON.parse(localStorage.getItem('history'))
  console.log(historyArray)
  if (historyArray) {
    document.getElementById('history').innerHTML = ''
    historyArray.forEach((item) => {
      const li = document.createElement('li')
      li.innerHTML = item
      document.getElementById('history').appendChild(li)
    })
  }
}

renderHistory()