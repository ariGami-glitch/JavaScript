import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/*class Square extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }
    render() {
        return (
            <button 
            className="square" 
            onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}*/

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    /*
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares, 
            xIsNext: !this.state.xIsNext
        });
    }*/

    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)} 
            />
        );
    }

    render() {
        /*const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }*/
        
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>

        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                position: null,
                selected: false
            }],
            stepNumber:0,
            xIsNext: true
        };
    }

    determinePosition(i) {
        let location;
        switch(i) {
                case 0:
                    location = "(1, 1)";
                    break;
                case 1:
                    location = "(2, 1)";
                    break;
                case 2:
                    location = "(3, 1)";
                    break;
                case 3:
                    location = "(1, 2)";
                    break;
                case 4:
                    location = "(2, 2)";
                    break;
                case 5:
                    location = "(3, 2)";
                    break;
                case 6:
                    location = "(1, 3)";
                    break;
                case 7:
                    location = "(2, 3)";
                    break;
                default:
                    location = "(3, 3)";
                    break;
        }
        return location;
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                position: this.determinePosition(i),
                selected: false
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
        this.state.history[step].setState({
            selected: true
        })
    }

    movePosition(move, step) {
        let moveDesc;
        moveDesc = 'Go to move #' + move + ',';
        // Determine column and row
        // get the square given the stepNumber
        moveDesc += " " + this.state.history[move].position;
        return moveDesc;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                this.movePosition(move, step) :
                'Go to game start';
            /*return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                    {desc}</button>
                </li>
            )*/
            if (this.state.history[move].selected === true) {
                return React.createElement('li', 'key={move}', React.createElement('button', 'onClick={() => this.jumpTo(move)}', 'b', desc));

            }
            else {
                return React.createElement('li', 'key={move}', React.createElement('button', 'onClick={() => this.jumpTo(move)}', desc));
            }
        })
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ===============================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}