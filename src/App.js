import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      initialValues : [],
      id:'',
      age:'',
      gender:'',
      pinCode:'',
      checked:true

    }
  }
  onSaveClick(event){

    fetch('http://localhost:3001/saveValues', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
          {
            id:this.state.id,
            age:this.state.age,
            gender:this.state.gender,
            pinCode:this.state.pinCode,
            checked:this.state.checked
          }
      )
    }).then(function(response) {
      alert("Data saved!!");
    })
  }
  onIdChange(event){
    this.setState({
      id:event.target.value
    })
  }
  onAgeChange(event){
    this.setState({
      age:event.target.value
    })
  }
  onPinChange(event){
    this.setState({
    pin:event.target.value
    })
  }
  handleCheck(){
      if(this.state.checked){
        this.setState({
          checked:false
        })
      }else{
        this.setState({
          checked:true
        })
      }
  }
  handleChange(event) {
    this.setState({gender: event.target.value});
  }
  componentDidMount() {
    fetch('http://localhost:3001/initialValues')
        .then(response =>  response.json())
        .then(resData => {
          console.log(resData);
          this.setState({ initialValues: resData });
          resData.forEach((value)=>{
            let key = value.key;
            if(key==='id'){
                this.setState({
                  id : value.value
                })
            }
            if(key==='age'){
              this.setState({
                age : value.value
              })
            }
            if(key==='gender'){
              this.setState({
                gender : value.value
              })
            }
            if(key==='pin'){
              this.setState({
                pin : value.value
              })
            }
            if(key==='status'){
              this.setState({
                checked : value.value
              })
            }
          })
        })
  }

  render(){
    return (
        <div className="App">
          <table className="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.initialValues.map((e,i) =>{
                let input = null;

                if(e.type==='text' && e.key==='id' ){
                  input = <input type='text' value={this.state.id} className="form-control" onChange={this.onIdChange.bind(this)} />
                }
                if(e.type==='text' && e.key==='age' ){
                  input = <input type='number' value={this.state.age} className="form-control" onChange={this.onAgeChange.bind(this)} />
                }
                if(e.type==='text' && e.key==='pin' ){
                  input = <input type='number'  value={this.state.pin} className="form-control" onChange={this.onPinChange.bind(this)} />
                }
                if(e.type==='select'){
                  let options = e.options;
                  console.log(options)
                  input =  <select className="form-control" onChange={this.handleChange.bind(this)}>
                    {
                      options.map((value)=>{
                        console.log(value);
                        return(
                            <option key={value} onChange={this.onchange} value={this.state.gender}>{value}</option>
                        )
                      })
                    }
                  </select>

                }
                if(e.type==='check'){
                    input = <input type='checkbox' className="form-check-input"
                                   onChange={this.handleCheck.bind(this)} defaultChecked={this.state.checked}/>
                }
                  return(
                      <tr key={i}>
                        <td>{e.label}</td>
                        <td>
                          {input}
                        </td>
                        <td>{e.description}</td>
                      </tr>
                  )
              })
            }


            </tbody>
          </table>
          <button style={{float:'right',marginRight:30}} className='btn btn-danger' onClick={this.onSaveClick.bind(this)}>Save</button>
        </div>
    );
  }
}

export default App;
