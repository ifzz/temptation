const start = Symbol('start')
const retry = Symbol('retry')
const abort = Symbol('abort')
const finish = Symbol('finish')

const prepareToBegin = Symbol('prepareToBegin')
const execAmountChange = Symbol('execAmountChange')
const consumeValid = Symbol('consumeValid')

class TaskCapsule {
  // func must be an asynchronized function
  // if it's not
  // why you need task queue?
  constructor(func, ctx, ...args) {
    this.exec = func
    this.ctx = ctx
    this.args = args
    this[retry] = 0
  }
  run() {
    return this.exec.apply(this.ctx || this, this.args)
  }
}

export class TaskQueue {
  constructor() {
    this.queue = [] // task queue
    this[abort] = false // is abort
    this.done = false // has done
    this.onHandle = false // is handlering
    this.total = 0
    this.succ = 0
    this.fail = 0
    this.printFinishLog = true
    this.onExecAmount = 0
    this.onFinished = null
  }

  add(task) {
    if (!(task instanceof TaskCapsule)) {
      throw new TypeError('Task must be an instance of type - <TaskCapsule>.')
    }
    this.queue.push(task)
  }

  getLength() {
    return this.queue.length
  }

  getState() {
    return {
      onHandle: this.onHandle,
      done: this.done,
    }
  }

  [prepareToBegin]() {
    if (!this.onHandle) {
      this[abort] = false
      this.done = false
      this.onHandle = true
      this.total = this.queue.length
      this.succ = 0
      this.fail = 0
      this.onExecAmount = 0
      this.printFinishLog = true
      return true
    }
    return false
  }

  [execAmountChange](num) {
    this.onExecAmount += num
    if (this.onExecAmount <= 0 && this.queue.length === 0) {
      this[finish]()
    }
  }

  [consumeValid]() {
    if (this.done) {
      if (this.onExecAmount > 0) {
        console.warn('Called consume after the tasks were handled.')
      }
      return false
    } else if (this[abort]) {
      console.warn('Tasks abort.')
      this[finish]()
      return false
    } else if (this.queue.length === 0) {
      console.warn('No task.')
      this[finish]()
      return false
    } else {
      return true
    }
  }

  [finish]() {
    this.onHandle = false
    this.done = true
    this.printFinishLog = false
    if (this.onFinished) {
      this.onFinished.call(this)
    }
  }

  abort() {
    this[abort] = true
  }

  flush() {
    this.queue = []
  }
}

export class ParallelQueue extends TaskQueue {
  constructor(limit = 5, span = 300, toleration = 3) {
    super()
    this.limitation = limit
    this.timespan = span
    this.toleration = toleration
  }

  [start]() {
    if (this[consumeValid]()) {
      if (this.onExecAmount < this.limitation && this.queue.length > 0) {
        let task = this.queue.shift()
        this[execAmountChange](1)
        task
          .run()
          .then(() => {
            // exec success
            this.succ += 1
            this[execAmountChange](-1)
          })
          .catch((e) => {
            if (task[retry] >= this.toleration) {
              // retried many times still failed
              this.fail += 1
            } else {
              // failed but retry it
              task[retry] += 1
              this.queue.unshift(task)
            }
            this[execAmountChange](-1)
          })
      }
      if (this.timespan > 0) {
        setTimeout(this[start].bind(this), this.timespan)
      } else {
        this[start].call(this)
      }
    }
  }

  consume() {
    if (this[prepareToBegin]()) {
      for (let _i = 0; _i < this.limitation; _i += 1) {
        this[start]()
      }
    }
  }
}

export class SerialQueue extends TaskQueue {
  constructor(abortAfterFail = false) {
    super()
    this.abortAfterFail = abortAfterFail
  }

  [start]() {
    if (this[consumeValid]()) {
      this[execAmountChange](1)
      let task = this.queue.shift()
      task.run()
        .then(() => {
          this.succ += 1
          this[execAmountChange](-1)
          this[start].call(this)
        })
        .catch(() => {
          this.fail += 1
          this[execAmountChange](-1)
          if (this.abortAfterFail) {
            this[finish]()
            return false
          } else {
            this[start].call(this)
          }
        })
    }
  }

  consume() {
    if (this[prepareToBegin]()) {
      this[start]()
    }
  }
}

