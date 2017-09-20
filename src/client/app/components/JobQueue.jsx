import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

const JobQueue = (props) => (
  <Grid.Row>
    <Grid.Column textAlign="center" width={6}><Segment inverted color="teal">Submitted URL</Segment></Grid.Column>
    <Grid.Column textAlign="center" width={3}><Segment inverted color="teal">Fetched</Segment></Grid.Column>
    <Grid.Column textAlign="center" width={7}><Segment inverted color="teal">Job ID</Segment></Grid.Column>
  </Grid.Row>
);

export default JobQueue;