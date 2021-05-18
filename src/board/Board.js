import React from 'react';
import Stack from 'stackjs';

export class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            board: [],
            processing: false
        };

        for (let r = 1; r <= 8; r++) {
            this.state.board[r] = Array(8).fill(null);
        }
    }

    renderSquare(r, c) {
        return <Square
            row={r}
            col={c}
            value={this.state.board[r][c]}
            onClick={() => this.handleClick(r, c)}
        />;
    }

    weightSquare(r, c) {

        // Off the board, reject option
        if (r < 1 || r > 8 || c < 1 || c > 8) {
            return -1;
        }

        // Space already filled, reject option
        let board = this.state.board;
        if (board[r][c] != null) {
            return -1;
        }

        // Corner cases, highest weight
        if ((r === 1 && c === 1) || (r === 1 && c === 8) || (r === 8 && c === 8) || (r === 8 && c === 1)) {
            return 4;
        }
        // Edge, but not corner, second highest weight
        if (r === 1 || r === 8 || c === 1 || c === 8) {
            return 3;
        }
        // All others.
        return 1;
    }

    // Starts at 8-oclock position as 1 and proceeds clockwise for all 8
    calcNextPosRow(pos, startrow) {
        if (pos === 1 || pos === 6) {
            return startrow - 1;
        }

        if (pos === 2 || pos === 5) {
            return startrow + 1;
        }

        if (pos === 3 || pos === 4) {
            return startrow + 2;
        }

        if (pos === 7 || pos === 8) {
            return startrow - 2;
        }
    }

    calcNextPosCol(pos, startcol) {
        if (pos === 3 || pos === 8) {
            return startcol - 1;
        }

        if (pos === 4 || pos === 7) {
            return startcol + 1;
        }

        if (pos === 5 || pos === 6) {
            return startcol + 2;
        }

        if (pos === 1 || pos === 2) {
            return startcol - 2;
        }
    }

    weightMoves(r, c) {
        let moves = Array(8).fill(null);
        for (let i = 1; i <= 8; i++) {
            let newrow = this.calcNextPosRow(i, r);
            let newcol = this.calcNextPosCol(i, c)
            moves[i] = this.weightSquare(newrow, newcol);
        }
        return moves;
    }

    getNextPos(record) {
        let moves = record.m;
        let next = -1;
        for (let i = 1; i <= 8; i++) {
            if (moves[i] > next) {
                next = i;
            }
        }
        return next;
    }

    handleClick(r, c) {
        if (!this.state.processing) {
            const board = this.state.board.slice();
            board[r][c] = '1';
            let processing = true;
            this.setState({board: board, processing: processing});

            let stack = new Stack();
            stack.push({
                r: r,
                c: c,
                m: this.weightMoves(r, c)
            });

            while (stack.size() < 64) {
                let current = stack.peek();
                let board = this.state.board.slice();
                board[current.r][current.c] = stack.size();
                this.setState({board: board});
                let bestPos = this.getNextPos(current);
                if (bestPos >= 1 && bestPos <= 8) {
                    let update = stack.pop();
                    update.m[bestPos] = -1;
                    stack.push(update);
                    let newrow = this.calcNextPosRow(bestPos, current.r);
                    let newcol = this.calcNextPosCol(bestPos, current.c)
                    stack.push({
                        r: newrow,
                        c: newcol,
                        m: this.weightMoves(newrow, newcol)
                    });
                    if (stack.size() === 64) {
                        let current = stack.peek();
                        let board = this.state.board.slice();
                        board[current.r][current.c] = stack.size();
                        this.setState({board: board});
                    }
                } else {
                    if (stack.size() < 64) {
                        let current = stack.pop();
                        console.log(stack.size());
                        let board = this.state.board.slice();
                        board[current.r][current.c] = null;
                        this.setState({board: board});
                    }
                }
            }
            console.log('Solved');
            //this.setState({processing: false});
        }
    }

    render() {
        return (
            <div>
                <div className="boardRow">
                    {this.renderSquare(8, 1)}
                    {this.renderSquare(8, 2)}
                    {this.renderSquare(8, 3)}
                    {this.renderSquare(8, 4)}
                    {this.renderSquare(8, 5)}
                    {this.renderSquare(8, 6)}
                    {this.renderSquare(8, 7)}
                    {this.renderSquare(8, 8)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(7, 1)}
                    {this.renderSquare(7, 2)}
                    {this.renderSquare(7, 3)}
                    {this.renderSquare(7, 4)}
                    {this.renderSquare(7, 5)}
                    {this.renderSquare(7, 6)}
                    {this.renderSquare(7, 7)}
                    {this.renderSquare(7, 8)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(6, 1)}
                    {this.renderSquare(6, 2)}
                    {this.renderSquare(6, 3)}
                    {this.renderSquare(6, 4)}
                    {this.renderSquare(6, 5)}
                    {this.renderSquare(6, 6)}
                    {this.renderSquare(6, 7)}
                    {this.renderSquare(6, 8)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(5, 1)}
                    {this.renderSquare(5, 2)}
                    {this.renderSquare(5, 3)}
                    {this.renderSquare(5, 4)}
                    {this.renderSquare(5, 5)}
                    {this.renderSquare(5, 6)}
                    {this.renderSquare(5, 7)}
                    {this.renderSquare(5, 8)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(4, 1)}
                    {this.renderSquare(4, 2)}
                    {this.renderSquare(4, 3)}
                    {this.renderSquare(4, 4)}
                    {this.renderSquare(4, 5)}
                    {this.renderSquare(4, 6)}
                    {this.renderSquare(4, 7)}
                    {this.renderSquare(4, 8)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(3, 3)}
                    {this.renderSquare(3, 4)}
                    {this.renderSquare(3, 5)}
                    {this.renderSquare(3, 6)}
                    {this.renderSquare(3, 7)}
                    {this.renderSquare(3, 8)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(2, 3)}
                    {this.renderSquare(2, 4)}
                    {this.renderSquare(2, 5)}
                    {this.renderSquare(2, 6)}
                    {this.renderSquare(2, 7)}
                    {this.renderSquare(2, 8)}
                </div>
                <div className="boardRow">
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(1, 3)}
                    {this.renderSquare(1, 4)}
                    {this.renderSquare(1, 5)}
                    {this.renderSquare(1, 6)}
                    {this.renderSquare(1, 7)}
                    {this.renderSquare(1, 8)}
                </div>
            </div>
        )
    }
}

export class Square extends React.Component {
    render() {
        return (
            <button className="square"
                    onClick={() => this.props.onClick()}>
                {this.props.row} : {this.props.col}<br/>
                {this.props.value ?? '-'}
            </button>
        );
    }
}



