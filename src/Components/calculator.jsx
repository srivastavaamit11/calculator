import React, {Component} from 'react';

class Calculator extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          current: "0",
          previous: [],
          nextIsReset: false,
        };
      }
    reset = () => {
        this.setState({ current: "0", previous: [], nextIsReset: false });
    };

    addToCurrent = (symbol) => {
        const sym=['%','/','*','-','+'];

        if(sym.includes(symbol))
        {
            let {previous} = this.state;
            previous.push(this.state.current + " " + symbol);
            this.setState({ previous, nextIsReset: true });
        }
        else {
            if (
              (this.state.current === "0" && symbol !== ".") ||
              this.state.nextIsReset
            ) {
              this.setState({ current: symbol, nextIsReset: false });
            }
            else
            {
                this.setState({ current: this.state.current + symbol });
            }
    }
    };

    calculate = () => {
        let { current, previous } = this.state;
        if(previous.length > 0)
        {
            current = eval(String(previous[previous.length - 1] + current));
            if(current=='Infinity' || current=='NaN')
            {
                this.setState({ current: 'Not Defined', previous: [], nextIsReset: true });
            }
            else{
                this.setState({ current, previous: [], nextIsReset: true });
            }
            
        }
    }

    del = () => {
        let { current } = this.state;
        if (current.length >= 2 && !this.state.nextIsReset) {
          this.setState({ current: current.slice(0, -1) });
        } else {
          this.setState({ current: "0" });
        }
    };

    render ()
    {

        return <div className='calc'>
            <div><h1>Calculator </h1></div>
            <div className="prev-display">
              {this.state.previous[this.state.previous.length - 1]}
            </div>
          <div className="result"> {this.state.current}</div>
            <div>
                <button className='btn clr' onClick={()=> this.reset()}>Clear </button>
                <button className='btn' onClick={()=> this.addToCurrent('%')}>%</button>
                <button className='btn' onClick={()=> this.addToCurrent('*')}>X</button>
                <button className='btn' onClick={()=> this.addToCurrent('/')}>/</button>
            </div>
            <div>
                <button className='btn' onClick={()=> this.addToCurrent('7')}>7</button>
                <button className='btn' onClick={()=> this.addToCurrent('8')}>8</button>
                <button className='btn' onClick={()=> this.addToCurrent('9')}>9</button>
                <button className='btn' onClick={()=> this.addToCurrent('-')}>-</button>
            </div>
            <div>
                <button className='btn' onClick={()=> this.addToCurrent('4')}>4</button>
                <button className='btn' onClick={()=> this.addToCurrent('5')}>5</button>
                <button className='btn' onClick={()=> this.addToCurrent('6')}>6</button>
                <button className='btn' onClick={()=> this.addToCurrent('+')}>+</button>
            </div>
            <div>
                <button className='btn' onClick={()=> this.addToCurrent('1')}>1</button>
                <button className='btn' onClick={()=> this.addToCurrent('2')}>2</button>
                <button className='btn' onClick={()=> this.addToCurrent('3')}>3</button>
                <button className='btn' onClick={()=> this.calculate()}>=</button>
            </div>
            <div>
                <button className='btn' onClick={()=> this.addToCurrent('0')}>0</button>
                <button className='btn' onClick={()=> this.addToCurrent('.')}>.</button>
                <button className='btn' onClick={()=> this.del()}>del</button>
            </div>
        </div>
    }
}

export default Calculator;