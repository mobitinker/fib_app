import React, { Component } from 'react';
import './App.css';

/* TODO:
Componentize
Globalize

*/
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            iterations: 1,
            sequence: [1],
            errorMsg: ""
        };
    }

    callApi(event) {
        const API_URL = 'http://mist.dynu.com:8080/fib/';
        this.setState({errorMsg: " "})
        fetch(API_URL + this.state.iterations)
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                sequence: data
            })
        }).catch(function(error) {
            this.setState({errorMsg: error})
        })
    }

    saveIterations(event) {
        //TODO add form validation library

        var v = event.target.value;
        v = v.trim().replace(/\D/g,'');
        //TODO dynamically determine value that crosses maxint
        if (v > 91) {
            v = 91
            this.setState({errorMsg: "Upper limit is 91"})
        } else {
            this.setState({errorMsg: " "})
        }
        this.setState({
            iterations: v
        });
    }

    renderSequence() {
        var s = "";
        this.state.sequence.map((e) => {
            s += e + " ";
        })
        return s;
    }

    renderError() {
        if (this.state.errorMsg.length > 0) {
            return(this.state.errorMsg);
        } else {
            return(this.state.errorMsg);
        }
    }
    render() {
        return (
            <div>
                <div>
                    Enter number of iterations: &nbsp;
                    <input type="text" name="iterations" value={this.state.iterations} onChange={this.saveIterations.bind(this)}/>
                    &nbsp;
                    <button onClick={this.callApi.bind(this)}>
                        Get Sequence
                    </button>
                     &nbsp;
                </div>
                <div style={styles.errorText}>
                    {this.renderError()}
                </div>
                <div style={styles.top10}>
                    {this.renderSequence()}
                </div>
            </div>
        )
    }
}
const styles = {
    top10: {
        marginTop: 10
    },
    errorText: {
        marginTop: 10,
        color: '#ff0000'
    }

};

export default App;
