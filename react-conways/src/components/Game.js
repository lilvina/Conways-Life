import React from 'react';
import Cell from './Cell.js';
import './Game.css';

// const CELL_SIZE = 10;
// const WIDTH = 500;
// const HEIGHT = 500;

class Game extends React.Component {

  state = {
    cells: [],
    interval: 100,
    isRunning: false,
    CELL_SIZE: 10,
    WIDTH: 500,
    HEIGHT: 500
  }

  rows = this.state.HEIGHT / this.state.CELL_SIZE
  cols = this.state.WIDTH / this.state.CELL_SIZE
  board = this.makeEmptyBoard()

  runGame = () => {
    this.setState({
      isRunning: true
    })
    this.runIteration()
  }

  stopGame = () => {
    this.setState({
      isRunning: false
    })
    if(this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler)
      this.timeoutHandler = null
    }
  }

  handleIntervalChange = (e) => {
    this.setState({
      interval: e.target.value
    })
  }

  runIteration() {
    console.log('running iteration')
    let newBoard = this.makeEmptyBoard()

    for(let y = 0; y < this.rows; y++) {
      for(let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y)
        if(this.board[y][x]) {
          if(neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true
          } else {
            newBoard[y][x] = false
          }
        } else {
          if(!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true
          }
        }
      }
    }

    //add logic for each iteration
    this.board = newBoard
    this.setState({
      cells: this.makeCells()
    })
    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration()
    }, this.state.interval)
  }
  // create an empty board
  makeEmptyBoard() {
    let board = []
    for(let y = 0; y < this.rows; y++) {
      board[y] = []
      for(let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  // create cells from this.board
  makeCells() {
    let cells = []
    for(let y = 0; y < this.rows; y++) {
      for(let x = 0; x < this.cols; x++) {
        if(this.board[y][x]) {
          cells.push({ x, y })
        }
      }
    }
    return cells
  }

  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect()
    console.log(rect)
    const doc = document.documentElement
    console.log({
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop
    })
    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop
    }
  }

  handleClick = (e) => {
    const elemOffset = this.getElementOffset()
    console.log(e.clientY, elemOffset.y)
    const offsetX = e.clientX - elemOffset.x
    const offsetY = e.clientY - elemOffset.y
    const x = Math.floor(offsetX / this.state.CELL_SIZE)
    const y = Math.floor(offsetY / this.state.CELL_SIZE) + 1
    console.log(y, x)

    if(x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x]
    }
    this.setState({
      cells: this.makeCells()
    })
  }

  handleClear = () => {
    this.board = this.makeEmptyBoard()
    this.setState({
      cells: this.makeCells()
    })
  }

  handleRandom = () => {
    for(let y = 0; y < this.rows; y++) {
      for(let x = 0; x < this.cols; x++) {
        this.board[y][x] = (Math.Random() >= 0.5)
      }
    }
    this.setState({
      cells: this.makeCells()
    })
  }

  calculateNeighbors(board, x, y) {
    let neighbors = 0
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1]
    ]
    for(let i = 0; i < dirs.length; i++) {
      const dir = dirs[i]
      let y1 = y + dir[0]
      let x1 = x + dir[1]

      if(x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
        neighbors++
      }
    }
    return neighbors

  }

  render() {
    const { cells, interval, isRunning } = this.state
    return (
      <div>
        <div className="Board"
          style={{ width: this.state.WIDTH, height: this.state.HEIGHT, backgroundSize: `${this.state.CELL_SIZE}px ${this.state.CELL_SIZE}px`}}
          onClick={this.handleClick}
          ref={(n) => { this.boardRef = n}}>
            {cells.map(cell => (
              <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`} CELL_SIZE={this.state.CELL_SIZE} />
            ))}
        </div>
        <div className="controls">
          Update every
          <input
            value={this.state.interval}
            onChange={this.handleIntervalChange}
          />
          msec{' '}
          { this.state.isRunning ? (
            <button className="button" onClick={this.stopGame}>
              Stop
            </button>
          ) : (
            <button className="button" onClick={this.runGame}>
              Run
            </button>
          )}{' '}
          <button className="button" onClick={this.handleRandom}>Random</button>
          <button className="button" onClick={this.handleClear}>Clear</button>
        </div>
      </div>
    )
  }
}

export default Game;
