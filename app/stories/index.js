import React from 'react';
import City from 'City'; 
import Cities from 'Cities';
import Form from 'Form';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

/*storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
*/
storiesOf('City', module)
    .add('weather', ()=> (<City weather={{weather:[{icon:"09d"}], main:{temp: 40}}}/> ));

storiesOf('Cities', module)
    .add('Not selected', ()=>(<Cities cities={["London","Moscow"]}/>))
    .add('Selected', () => (<Cities cities={["London","Moscow"]} city="London"/>))	
storiesOf('Form', module)
    .add('Initial', () => <Form cities={["London","Moscow","Dhaka","Mata Utu","Apia","Ouagadougou"]}/>)
