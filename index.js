async function asyncPromise(par1) {
  if (par1 < 0 || par1 > 50000) {
    throw new Error('Par1 is invalid')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (par1 > 25000) {
        reject(new Error('Server Timeout'))
        return
      }
      resolve(par1 * 2)
    }, 1000 + par1)
  })
}

function asyncCB(par1, cb) {
  asyncPromise(par1)
    .then((result) => {
      cb(null, result)
      asyncCB(result, cb)
    })
    .catch((err) => cb(err))
}

function myCallback(err, result) {
  if (err) {
    console.log(`ERR: ${err.message}`)
  } else {
    console.log(`SUCCESS: ${result}`)
  }
}

asyncCB(30, myCallback)
