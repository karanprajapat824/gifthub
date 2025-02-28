import './../css/Board.css';

const Board = ({mainHeading,board})=>{
    return(
        <div className='board'>
            <div className='board-content'>
                <div className='board-top'>
                    <div className='board-heading'>{mainHeading}</div>
                        <button>View All</button>
                </div>
                <div className='board-down'>
                    <div className='round-board'>
                        <div className='round-image'>
                            <img src={board[0].image}></img>
                        </div>
                        <div className='round-board-heading'>{board[0].name}</div>
                    </div>
                    <div className='round-board'>
                        <div className='round-image'>
                        <img src={board[1].image}></img>
                        </div>
                        <div className='round-board-heading'>{board[1].name}</div>
                    </div>
                    <div className='round-board'>
                        <div className='round-image'>
                        <img src={board[2].image}></img>
                        </div>
                        <div className='round-board-heading'>{board[2].name}</div>
                    </div>
                    <div className='round-board'>
                        <div className='round-image'>
                        <img src={board[3].image}></img>
                        </div>
                        <div className='round-board-heading'>{board[3].name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board;