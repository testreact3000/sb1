import Cities from 'Cities';
import React, {Component} from 'react';
import _ from 'lodash';
import 'Form/css/Form.css';
class Form extends Component{
   constructor(props){
     super(props);
     this.state= this.props.defaults || {
       list: [],
       comment : "",
       info: null,
       error: false,	     
     }	   
   } 	
   handleSubmit(e){
     e.preventDefault();
     let state = _.clone(this.state,true); 
     if(state.info.city!==""){
       state.error = false;	     
       state.list.push({ 
	comment: state.comment,
	info: state.info,
       });
       state.comment="";
       	     
     }else{
       state.error = true;
     }
	   
     this.setState(state,()=>{
      if(this.props.onSubmit!==undefined){
        this.props.onSubmit(this.state);
      }
     });   
   }
   changeCity(info){
     this.setState({info});
   }
   changeComment(e){
     this.setState({comment:e.target.value});	   
   }
   listItem(data,id){
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
    return <div>
     {table}		   
     <form onSubmit={this.handleSubmit.bind(this)} className="form"> 	   
       {error}
       <Cities 
	   cities={this.props.cities} 
	   change={this.changeCity.bind(this)} 
	   city={_.get(this.state,"info.city")}
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
