import React from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';

const Fetch = (props) => (
  <Grid.Row>
    <Grid.Column width={11} textAlign="center">
      <Form.Input fluid onChange={props.handleUrl} placeholder="Enter URL here" />
    </Grid.Column>
    <Grid.Column width={5}>
      <Button onClick={props.fetchHTML}>
        Fetch HTML
      </Button>
    </Grid.Column>
  </Grid.Row>
);

export default Fetch;