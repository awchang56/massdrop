import React from 'react';
import { Grid, Button, Modal, Segment, Icon, Header, Form } from 'semantic-ui-react';

const JobStatus = (props) => (
  <Grid.Row>
    <Grid.Column width={11}>
      <Form.Input fluid onChange={props.handleJobId} placeholder="Enter Job ID here" />
    </Grid.Column>
    <Grid.Column width={5}>
      <Modal trigger={<Button onClick={props.checkJobStatus}>Job Status</Button>} open={props.modalState} basic size='small' closeIcon onClose={props.close}>
        <Header icon='browser' content={props.job.url} />
        <Modal.Content>
          <p>{props.job.html}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={props.close} color='green' inverted>
            <Icon name='checkmark' /> DONE
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid.Column>
  </Grid.Row>
);

export default JobStatus;