import Cities from 'Cities';
import React, {Component} from 'react';
import _ from 'lodash';
import 'Form/css/Form.css';
class Form extends Component{
   constructor(props){
     super(props);
     this.state= {
       list: [],
       comment : "",
       info: null,
       error: false,	     
     }	   
   } 	
   handleSubmit(e){
     e.preventDefault();
     console.log(['submit',this.state.info, this.state.comment]);
     if(this.state.info.city!==""){
       this.state.error = false;	     
       this.state.list.push({ 
	comment: this.state.comment,
	info: this.state.info,
       });
       this.state.comment="";
       	     
     }else{
       this.state.error = true;
     }
     this.setState(this.state);	   
   }
   changeCity(info){
     this.setState({info});
   }
   changeComment(e){
     this.setState({comment:e.target.value});	   
   }
   listItem(data,id){
	   console.log([data,id]);
      let wd = _.get(data,"info.weather_date");
      wd = (wd === undefined)?"—":(wd.toString());
      return <tr key={id}>
        <td>{data.info.city}</td>
        <td>{wd}</td>
        <td>{_.get(data,"info.weather.main.temp","—")}</td>
        <td>{_.get(data,"info.weather.weather[0].description","—")}</td>
        <td>{data.comment}</td>
      </tr>		   
   }
   render(){
	   
     const table = (this.state.list.length > 0)?
     (<table className="form__table">
       <thead>
          <tr>		   
          <th>Cty</th><th>Weather date</th><th>Temp</th><th>Weather</th><th>Comment</th>
          </tr>		   
       </thead>
       <tbody>
	{this.state.list.map( (data, id) => this.listItem(data,this.state.list.length - id))}
       </tbody>		   
     </table>
     ):(<div className="form__table">No weather info yet. Left ther first one.</div>); 
     let error;
	 if(this.state.error) error =<div class="form__error">Please select the city</div>;
    console.log(this.state);
    return <div>
     {table}		   
     <form onSubmit={this.handleSubmit.bind(this)} className="form"> 	   
       {error}
       <Cities 
	   cities={this.props.cities} 
	   change={this.changeCity.bind(this)} 
	   city={this.props.city}
       />
       
       <textarea className="form__comment"
	   value={this.state.comment}
	   onChange={this.changeComment.bind(this)}
       />
	<div className="form__submit">
       <input type="submit" value="Add"/>
	</div>
     </form>
    </div>;
   }
}

export default Form;
