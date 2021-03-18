import React from 'react'; // provides all the core functionality
import ReactDOM from 'react-dom'; // provides the functionality for loading our application into the browser

import '../../styles/app.scss'; // include styling

// JSX is a JavaScript eXtension that enables the easy inclusion of templating into our JavaScript components

export default class Athena extends React.Component { // main functionality

    constructor(props) { // specify the initial state of our component
        super(props);

        this.state = {
            input_a: "",
            input_b: "",
            input_calc: "+", // declare with sign for propper functionality, predeclared with + (even without user input)
            calc_hist: [],   // array of former calculated results
            result: null     // calculated in "calculateOp": "input_a input_calc input_b = eval(input_a input_calc input_b)"
        }
    }

    // function for calculating the input
    calculateOp = () => {
        if (this.state.input_a != "" && this.state.input_b != "") {
            this.setState(state => {
                // no "this.", because recalculating would result in pushing the former calculation
                let resRet = eval(state.input_a + state.input_calc + state.input_b);

                // string for showing the calculation and result
                state.result = state.input_a + ' ' + state.input_calc + ' ' + state.input_b + " = " + resRet;

                // pushing the calculated state on the history with all variables
                state.calc_hist.push({
                  hist_a: state.input_a,
                  hist_b: state.input_b,
                  hist_c: state.input_calc,
                  hist_r: state.input_a + ' ' + state.input_calc + ' ' + state.input_b + " = " + resRet
                });

                return state;
            });
        }
    }

    // update-functions
    updateInputA = (ev) => {
        this.setState({
            input_a: ev.target.value
        });
    }

    updateInputB = (ev) => {
        this.setState({
            input_b: ev.target.value
        });
    }

    updateCalcOp = (ev) => {
        this.setState({
            input_calc: ev.target.value
        });
    }

    // Render-funktion
    render() {    
      let showResult = null;
      let showHist = null;

      // {showResult} - component for rendering the result, if calculated (result != null)
      if (this.state.result != null) {
        showResult = <div id="result">
          <label>Result:
            {this.state.result}
          </label>
        </div>
      }

      // {showHist} - component for listing the history
      // maps each element of the history-array to render it in one line
      if (this.state.calc_hist.length > 0) {
        showHist = <div id="history">
          <label>History:
            {this.state.calc_hist.map((value, index) => (
              <div key={index}>
                <a onClick={(event) => {
                  event.preventDefault();
                  this.setState({
                    hist_a: value.hist_a,
                    hist_b: value.hist_b,
                    input_calc: value.hist_c,
                    result: value.hist_r
                  });
                  this.calculateOp()
                }}>{value.hist_r}</a>
              </div>
            ))}
          </label>
        </div>
      }

      return ( // round brakets for using JSX in the JavaScript
        // instead of class you must always use className
        // all attributes need to be camel-cased (tabindex becomes tabIndex)
        <div className="grid-x medium-offset-1">
          <main>
            <h1>Calculator</h1> {/* first-level heading */}
            
            {/* number inputs named “a” */}
            <div>
              <label>Number input a
                <input type="number" name="a" placeholder="Number input a" tabIndex="1"
                value={this.state.input_a} onChange={this.updateInputA}/>
              </label>
            </div>

            {/* number inputs named “b” */}
            <div>
              <label>Number input b
                <input type="number" name="b" placeholder="Number input b" tabIndex="2"
                value={this.state.input_b} onChange={this.updateInputB}/>
              </label>
            </div>

            {/* select dropdown menu for selecting the calulation */}
            <div>
              <label>Calculator operations
                <select onChange={this.updateCalcOp}>
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="*">*</option>
                  <option value="/">/</option>
                  <option value="%">%</option>
                </select>
              </label>
            </div>

            {/* button for triggering the calculation */}
            <div className="text-left">
              <button tabIndex="3" className="button" onClick={this.calculateOp}>Calculate</button>
            </div>

            {/* {showResult} - component for rendering the result (explained above) */}
            <p/>
            {showResult}
            
            {/* {showHist} - component for listing the history (explained above) */}
            <p/>
            {showHist}
          </main>
        </div>
      );
    }
}

ReactDOM.render(<Athena/>, document.getElementById('app-entry-point'));