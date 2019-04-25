import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      togglePlayer: 1,
      player1: 'Player 1',
      player2: 'Player 2',
      winner: '',
      gameOver: false,
    }
  }

  componentDidMount = () => {
    this.initGame();
  }

  initGame = () => { 
    this.setState({ winner: '', gameOver: false })
    let startBoard = [];
    for (let r = 0; r < 7; r++) {
      startBoard.push(new Array(6).fill(0))
      }
    this.setState({ board: startBoard })
  }

  game = (col) => {
    const board = [...this.state.board]
    let newBoard = board[col]
    let addLast = newBoard.lastIndexOf(0);
    if (addLast === -1) {
      return;
    }
    newBoard[addLast] = this.state.togglePlayer;
    this.checkHorizontally(board); 
    this.checkVertically(board);
    this.checkDiagonalLeft(board);
    this.checkDiagonalRight(board);
    this.checkDraw(board);
    this.changePlayer(); 
  }

  declareWinner = () => {
    if (this.state.togglePlayer === 1) {
      this.setState({ winner: 'Congratulation! the winner is ' + this.state.player1 })
    } else if (this.state.togglePlayer === 2) {
      this.setState({ winner: 'Congratulation! the winner is ' + this.state.player2 }) 
    }
  }

  changePlayer = () => {
    this.setState({togglePlayer: this.state.togglePlayer === 2 ? 1 : 2})
  }

  renderBoard = (tr, id) => {
    return ( 
      <tr key={ id }>
        {tr.map((td, tdId) => <td key={ tdId } className="box">
        <div disabled={ this.state.gameOver } className={ "circle player"+td } onClick={() => this.game(id)}></div></td>)}
      </tr>
    )
  }

  handleInputPlayer1 = (e) => {
    this.setState({ player1: e.target.value })
  }

  handleInputPlayer2 = (e) => {
    this.setState({ player2: e.target.value })
  }

  checkVertically(board) {
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row][col + 1] && 
              board[row][col] === board[row][col + 2] &&
              board[row][col] === board[row][col + 3]) {
              this.declareWinner();
              this.setState({ gameOver: true });
          }
        }
      }
    }
  }

  checkHorizontally(board) {
    for (let row = 3; row < 7; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row - 1][col] &&
              board[row][col] === board[row - 2][col] &&
              board[row][col] === board[row - 3][col]) {
              this.declareWinner();
              this.setState({ gameOver: true })
          }
        }
      }
    }
  }

  checkDiagonalLeft(board) {
    for (let row = 3; row < 7; row++) {
      for (let c = 0; c < 6; c++) {
        if (board[row][c]) {
          if (board[row][c] === board[row - 1][c + 1] &&
              board[row][c] === board[row - 2][c + 2] &&
              board[row][c] === board[row - 3][c + 3]) {
              this.declareWinner();
              this.setState({ gameOver: true })
          }
        }
      }
    }
  }

  checkDiagonalRight(board) {
    for (let row = 3; row < 7; row++) {
      for (let col = 3; col < 7; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row - 1][col - 1] &&
              board[row][col] === board[row - 2][col - 2] &&
              board[row][col] === board[row - 3][col - 3]) {
              this.declareWinner();
              this.setState({ gameOver: true })
          }
        }
      }
    }
  }

  checkDraw(board) {
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 6; col++) {
        if (board[row][col] === 0) {
          return null;
        }
      }
    }
    this.setState({ winner: 'Sorry, no winner. Its a draw', gameOver: true }) 
  }

  render() {
    let board = this.state.board;
    return (
      <>
      <div className="logo">Connect 4</div>
        <header>
          <span className="header-left"><input className="input_player1" onChange={ this.handleInputPlayer1 } value={ this.state.player1 }></input></span>
          <span className="header-right"><input className="input_player2" onChange={ this.handleInputPlayer2 } value={ this.state.player2 }></input></span>
        </header>
        <div className="information"><button className="header-button" onClick={ this.initGame }>Start over</button><div className="winner">{ this.state.winner }</div></div>
        <div className="board-wrapper">
          <table>
            <tbody>
              { board.map(this.renderBoard) }
          </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default App;

/*
board: [
        1, 2, 3, 4, 5, 6, 7,
        8, 9, 10,11,12,13,14,
        15,16,17,18,19,20,21,
        22,23,24,25,26,27,28,
        29,30,31,32,33,34,35,
        36,37,38,39,40,41,42
      ],

*/

