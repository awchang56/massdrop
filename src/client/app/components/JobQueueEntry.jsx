import React from 'react';
import { Grid } from 'semantic-ui-react';

const JobQueueEntry = (props) => (
  <Grid.Row>
    <Grid.Column textAlign="center" width={6}>{props.job.url}</Grid.Column>
    <Grid.Column textAlign="center" width={3}>{props.job.html ? 'yes' : 'no'}</Grid.Column>
    <Grid.Column textAlign="center" width={7}>{props.job.jobID}</Grid.Column>
  </Grid.Row>
);

export default JobQueueEntry;