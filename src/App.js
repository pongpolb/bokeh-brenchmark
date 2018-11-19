import React, { Component } from 'react';
import faker from 'faker';
import './App.css';

class App extends Component {
  state = {
    number: 0,
    isFetching: false,
  }

  onChange = (event) => {
    this.reRenderPieGraph(event.target.value)
  }

  reRenderPieGraph = (number) => {
    const pie_data = {
      labels: [],
      values: [],
    }

    faker.seed(123)
    for (let i = 0; i < number; i++) {
      pie_data.labels.push(faker.random.uuid())
      pie_data.values.push(faker.random.number())
    }


    console.log(`Bokeh ${window.Bokeh.version}`)
    window.Bokeh.set_log_level("info")


    const p11 = window.Bokeh.Charts.pie(pie_data)

    const doc = new window.Bokeh.Document()
    doc.add_root(p11)

    const div = document.getElementById("plot")

    div.innerHTML = ""

    window.Bokeh.embed.add_document_standalone(doc, div)
  }

  reRenderBarGraph = (number) => {
    const bar_data = [
      ['AAAAA'],
      ['BBBBB'],
    ]

    faker.seed(123)
    for (let i = 0; i < number; i++) {
      bar_data[0].push(faker.random.uuid())
      bar_data[1].push(faker.random.number())
    }


    console.log(`Bokeh ${window.Bokeh.version}`)
    window.Bokeh.set_log_level("info")

    const p21 = window.Bokeh.Charts.bar(bar_data, {axis_number_format: "0.[00]a"})

    const doc = new window.Bokeh.Document()
    doc.add_root(p21)

    const div = document.getElementById("plot")

    div.innerHTML = ""

    window.Bokeh.embed.add_document_standalone(doc, div)
  }

  render() {
    const { number, isFetching } = this.props
    if (isFetching) {
      return (
        <div>
          isLoading
        </div>
      )
    }
    return (
      <div className="App">
        Input Number: <input type="number" onChange={this.onChange} defaultValue={ number } />
        <div id="plot" />
      </div>
    );
  }
}

export default App;
