import React from 'react';
import {render} from 'react-dom';
import { Grid, Header } from 'semantic-ui-react';
import axios from 'axios';

import JobQueue from './components/JobQueue.jsx';
import JobQueueEntry from './components/JobQueueEntry.jsx';
import Fetch from './components/Fetch.jsx';
import JobStatus from './components/JobStatus.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      jobId: '',
      jobs: [],
      job: {},
      validURL: true,
      validJobID: true,
      modalState: false,
      alreadyFetched: false
    };
  }

  componentDidMount() {
    this.fetchJobs();
    setInterval(() => this.fetchJobs(), 3000);
  }

  handleUrl(e) {
    e.preventDefault();
    this.setState({
      url: e.target.value
    });
  }

  handleJobId(e) {
    e.preventDefault();
    this.setState({
      jobId: e.target.value
    });
  }

  close() {
    this.setState({
      modalState: false
    });
  }

  fetchJobs() {
    axios.get('/job')
      .then(response => {
        this.setState({
          jobs: response.data
        });
      })
      .catch(err => {
        console.log('error retrieving all jobs from server');
      });
  }

  fetchHTML() {
    axios.post('/url', {
        url: this.state.url
      })
      .then(res => {
        if (res.data === 'already fetched') {
          this.setState({
            validURL: false,
            alreadyFetched: true
          });
        } else {
          this.setState({
            jobs: this.state.jobs.concat(res.data),
            validURL: true,
            alreadyFetched: false
          });
        }
      })
      .catch(err => {
        this.setState({
          alreadyFetched: false,
          validURL: false
        });
        console.log('error receiving job ID from server: ', err);
      });
  }

  checkJobStatus() {
    if (this.state.jobId) {
      axios.get('/job/' + this.state.jobId)
        .then(res => {
          if (res.data) {
            this.setState({
              job: res.data,
              validJobID: true,
              modalState: true
            });
          }
        })
        .catch(err => {
          this.setState({
            validJobID: false,
          });
          console.log('error receiving HTML from server: ', err);
        })
    } else {
      this.setState({
        validJobID: false
      });
    }
  }

  render () {
    let urlValidator = this.state.validURL
                      ? null
                      : (this.state.alreadyFetched
                        ? <label style={{color: "red", fontWeight: 'bold'}}>Already Fetched URL</label>
                        : <label style={{color: "red", fontWeight: 'bold'}}>Invalid URL</label>);

    let jobIdValidator = this.state.validJobID
                           ? null
                           : <label style={{color: "red", textAlign: 'left', fontWeight: 'bold'}}>Invalid Job ID</label>;

    let jobs = this.state.jobs.map((job, i) => {
                 return <JobQueueEntry key={i} job={job} />
               });

    return (
      <Grid centered padded columns={3}>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Header as='h1'>FETCHER</Header>
          </Grid.Column>
        </Grid.Row>
        <Fetch
          handleUrl={this.handleUrl.bind(this)}
          fetchHTML={this.fetchHTML.bind(this)}
        />
        {urlValidator}
        <JobStatus
          handleJobId={this.handleJobId.bind(this)}
          checkJobStatus={this.checkJobStatus.bind(this)}
          close={this.close.bind(this)}
          modalState={this.state.modalState}
          job={this.state.job}
        />
        {jobIdValidator}
        <JobQueue/>
        {jobs}
      </Grid>
    );
  }
}

render(<App/>, document.getElementById('app'));