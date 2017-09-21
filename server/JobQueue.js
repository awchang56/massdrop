class JobQueue {
  constructor() {
    this.oldestIndex = 1;
    this.newestIndex = 1;
    this.storage = {};
  }

  enqueue(job) {
    this.storage[this.newestIndex] = job;
    this.newestIndex++;
  }

  dequeue() {
    let oldestIndex = this.oldestIndex;
    let newestIndex = this.newestIndex;
    let deletedJob;

    if (oldestIndex !== newestIndex) {
      deletedJob = this.storage[oldestIndex];
      delete this.storage[oldestIndex];
      this.oldestIndex++;

      return deletedJob;
    }
  }

  size() {
    return this.newestIndex - this.oldestIndex;
  }
}

module.exports = JobQueue;