import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import { randomWord } from './words';


class Hangman extends Component {

  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]

  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(letter => (this.state.guessed.has(letter) ? letter : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let letter = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      nWrong: st.nWrong + (this.state.answer.includes(letter) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button
        value={letter}
        key={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  reset() {

    this.setState(() => { return { nWrong: 0, guessed: new Set(), answer: randomWord() } });

  }

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
    let gameState = this.generateButtons();
    if (isWinner) gameState = 'You Win!';
    if (gameOver) gameState = 'You Loose!';

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText} />
        {gameOver ? <p>Game Over!</p> : <p>Number of incorrect guesses: {this.state.nWrong}</p>}
        <p className='Hangman-word'>{!gameOver ? this.guessedWord() : this.state.answer}</p>
        <p className='Hangman-btns'>{gameState}</p>
        <button id="reset" onClick={this.reset} disabled={!gameOver && !isWinner}>Restart?</button>
      </div>
    );
  }
}

export default Hangman;
