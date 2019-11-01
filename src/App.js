import React, { Component } from 'react';

import './App.css';
import background from './background.jpg';
import beep from './sounds/beep.mp3'
import danger from './sounds/danger.mp3'
import correct from './sounds/correct.mp3'
import warningSound from './sounds/warning.mp3'

import Button from './components/Button';
import compareAnswers from './utils/compareAnswers';

const correctAnswer = [1, 0, 2, 2]

class App extends Component {
  state = {
    currentAnswer: [],
    boom: false,
    success: false,
    warning: false,
    attempts: 3,
  }

  componentDidMount() {
      const state = localStorage.getItem('state')
      if (state) {    
        const parsed = JSON.parse(state);    
        this.setState(parsed)
      }
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state))    
  }
  

  checkAnswers = () => {
    const { currentAnswer, attempts } = this.state;

    const result = compareAnswers(currentAnswer, correctAnswer)

    if (result === 'INCORRECT') {

      if (attempts === 1) {
        this.setState({ boom: true });
        document.getElementById('danger').play()
      } else {
        this.setState({ warning: true })
        document.getElementById('warning').play()
        setTimeout(() => {
          this.setState({ warning: false })
        }, 2000);
      }

      this.setState({
        attempts: attempts - 1,
        currentAnswer: [],
      })
    }

    if (result === 'CORRECT') {
      this.setState({ success: true });
      document.getElementById('correct').play()
    }
  }

  handleButtonClick = index => () => {
    const { currentAnswer, warning, boom, success } = this.state;
    document.getElementById('beep').cloneNode().play()

    if (warning || boom || success) return;

    const newAnswer = [ ...currentAnswer ]
    newAnswer.push(index)
    this.setState({ currentAnswer: newAnswer }, this.checkAnswers);
  }

  render() {
    const { attempts, warning, success, boom } = this.state;

    return(
      <div className="app-container">
        <img src={background} alt="fondo" className="background-image" />
        <Button backgroundColor="red" onClick={this.handleButtonClick(0)} />
        <Button backgroundColor="blue" onClick={this.handleButtonClick(1)} />
        <Button backgroundColor="purple" onClick={this.handleButtonClick(2)} />
        <div className="attempts-text">
          Tenés {attempts} intento{attempts > 1 ? 's' : ''} restante{attempts > 1 ? 's' : ''} de ingresar el código correcto, sino ¡CORRÉ!
        </div>
        {warning && (
          <div className="attempts-warning">
            INCORRECTO
            {attempts === 1 && ', ¡ÚLTIMO INTENTO!'}
            {attempts === 2 && ', ¡SEGUNDO INTENTO!'}
          </div>
        )}
        {success && (
          <div className="modal modal-success">
            <div className="modal-title">проклятие</div>
            <div className="modal-subtitle">SALVASTE LA PLANTA NUCLEAR</div>
            <div className="modal-body">¡ARRUINASTE TODO MI TRABAJO!</div>
          </div>
        )}
        {boom && (
          <div className="modal modal-error">
            <div className="modal-title">опасность</div>
            <div className="modal-subtitle">ACELERASTE EL PROCESO DE DESTRUCCIÓN</div>
            <div className="modal-body">¡TODOS MORIRAN!</div>
          </div>
        )}
        <audio preload="true" id="beep" src={beep} />
        <audio preload="true" id="danger" src={danger} />
        <audio preload="true" id="correct" src={correct} />
        <audio preload="true" id="warning" src={warningSound} />
      </div>
    )
  }
}

export default App;
