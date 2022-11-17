async function asyncPromise(par1) {
  return new Promise((resolve, reject) => {
    if (!Number(par1) || Number(par1) < 0 || Number(par1) > 50000) {
      reject(new Error('Par1 is invalid'))
      return
    }
    const timer = 1000 + par1
    setTimeout(() => {
      if (timer > 25000) {
        reject(new Error('Server Timeout'))
        return
      }
      resolve(par1 * 2)
    }, timer)
  })
}

async function asyncParallel1(par1) {
  return new Promise((resolve, reject) => {
    if (!Number(par1) || Number(par1 / 2) > 10000) {
      reject(new Error('Parallel #1 timed out'))
      return
    }
    setTimeout(() => {
      resolve(true)
    }, par1 / 2)
  })
}

async function asyncParallel2(par1) {
  return new Promise((resolve, reject) => {
    if (!Number(par1) || Number(par1 / 3) > 10000) {
      reject(new Error('Parallel #2 timed out'))
      return
    }
    setTimeout(() => {
      resolve(true)
    }, par1 / 3)
  })
}

async function asyncParallel3(par1) {
  return new Promise((resolve, reject) => {
    if (!Number(par1) || Number(par1 / 4) > 10000) {
      reject(new Error('Parallel #3 timed out'))
      return
    }
    setTimeout(() => {
      resolve(true)
    }, par1 / 4)
  })
}

async function runAsyncParallels(par1) {
  const results = await Promise.allSettled([
    asyncParallel1(par1),
    asyncParallel2(par1),
    asyncParallel3(par1),
  ])

  console.log('All parallel calls completed')
  results.forEach((element) => {
    if (element.status === 'rejected') {
      console.log(`ERROR: ${element.reason.message}`)
      return
    }
    console.log(String(element.value))
  })
}

function asyncCB(par1, cb) {
  asyncPromise(par1)
    .then((result) => {
      cb(null, result)
      asyncCB(result, cb)
    })
    .catch((err) => cb(err))

  runAsyncParallels(par1)
}

function myCallback(err, result) {
  if (err) {
    console.log(`ERR: ${err.message} \n`)
  } else {
    console.log(`SUCCESS: ${result} \n`)
  }
}

asyncCB(300, myCallback)
