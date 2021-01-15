import './App.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Validate from './validate.js';

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
 const text = 'The text to translate, e.g. Hello, world!';
 const target = 'The target language, e.g. ru';

async function translateText() {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:');
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
}

translateText();
class App extends React.Component{
  constructor(props){
    
    super(props);
    this.state={
      text: {
        value: '',
        error: ''
      }
    }
  }
  submitForm(event){
    event.preventDefault();
    let state = this.state;
    state.text.error = Validate(this.state.text.value);
    this.setState(state);
  }
  updateForm(event){
    this.setState({
      text:{
        value: event.target.value,
        error:this.state.text.error
      }
    });

  }
  render(){
    return (
    <div className="App">
      <Grid container>
        <Grid item xs={12} align="center">
          <Typography variant="h2">Translator</Typography>
        </Grid>
        <Grid item xs={12}>
      <form onSubmit={(event) =>{this.submitForm(event);}}>
      <TextField 
      fullWidth
       placeholder="Enter text here" 
       variant="outlined" 
       value={this.state.text.value}
       helperText={this.state.text.error}
       error={this.state.text.error !==""} 
       onChange={(event) => {this.updateForm(event)}}/>
      <Button 
      type="submit" 
      variant="contained">
        Translate
        </Button>
      </form>
      </Grid>
      </Grid>
    </div>
  );
  }
  
}

export default App;
