import React, {Component} from 'react'
import axios from 'axios'

const URLPrefix = "http://localhost:3050/"

class Fib extends Component {
    state = {
        seenIndexes: [],
        values:{},
        index:""
    }

    componentDidMount(){
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues(){
        const values = await axios.get(`${URLPrefix}/api/values/current`)
        this.setState({
            values: values.data
        })
    }


    async fetchIndexes(){
        const seenIndexes = await axios.get(`${URLPrefix}/api/values/all`)
        this.setState({
            seenIndexes:seenIndexes.data
        })
    }

    renderSeenIndexes (){
        return this.state.seenIndexes.map((val, i)=>{
           return val.number
        }).join(', ')
    }

    renderValues (){
        let entries=[]

        for (let key in this.state.values){
             entries.push(
               "For value: "+key+", I saw this: "+this.state.values[key]
            ) 
        }


      //  console.log('entries :>> ', entries);
        return entries.map((val, i)=>{
            return val
        }).join(', ')
    }

    handleSubmit = async(event)=>{
        event.preventDefault()

        var indexToAdd = this.state.index
        await axios.post(`${URLPrefix}/api/values`,{
            index:indexToAdd 
        })
        this.addToSeenIndexes(indexToAdd)
        this.setState({
            index:''
        })
    }

    addToSeenIndexes = (indexToAdd)=>{
       // this.state.seenIndexes.push(indexToAdd)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input 
                    value={this.state.index}
                    onChange={event=>this.setState({index: event.target.value})}
                    />
                    <button>Submit</button>
                </form>

                <h3>Values I have seen</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated values</h3>
                {this.renderValues()}
            </div>
        )
    }
}

export default Fib;
