# async-exercise-2

Spec:
We need to create an asynchronous function that accepts a numeric parameter from 0 to 20000. If the parameter is invalid, throw an Error indicating "Par1 is invalid". The function will resolve after waiting for 1 second plus the value of par 1 (using setTimeout). This means if par1 value is 500, then the resolve (or reject) will occur after 1500 ms. 

// something like this
async function asyncPromise(par1) {
  	setTimeout(() => {
       ???
    }, 1000 + par1)
  
}

On resolve, the value of 2x par1 is returned (if par1 was 500, resolving the asynchronous function returns 1000). Whenever the setTimeout took more than 25 seconds, the asynchronous function will reject with an Error("Server Timeout")

We also need to create another function that uses callback 

function asyncCB(par1, cb) {
  asyncPromise(par1)
}

it will call the asyncPromise and once it resolves or rejects, it will call the callback

function myCallback(err, result) {
	if (err) {
		console.log(`ERR: ${err.message}`);
  } else {
		console.log(`SUCCESS: ${result}`);
  }
}

----
the entire code will be utilized with the following sample call
asyncCB(30, myCallback)
----

Add a new async parallel functions that also runs slower each iteration. These will be called on the asyncCB similar to asyncPromise. Each of these functions just resolves true. If the par1 value is above 10000, it will still perform the computed delay but will reject with Error("Parallel #{1-3} timed out!"); 

asyncParallel1(par1) {} <- interval is half of par1
asyncParallel2(par1) {} <- interval is 1/3rd of par1 
asyncParallel3(par1) {} <- interval is 1/4rd of par1 

async function runAsyncParallels(par1) {
	asyncParallel1(par1)
	asyncParallel2(par1)
	asyncParallel3(par1)
	// I want to resolve when all are done and console.log (all parallels calls result)
        // if one errors out, I want to continue the rest of the parallel calls and console log all the rejects.
}

//once all (and only when all) 3 parallel calls complete result could yield the following
all parallel calls completed
true
true
true

all parallel calls completed
Error("Parallel #1 timed out!")
true
true

all parallel calls completed
Error("Parallel #1 timed out!")
Error("Parallel #2 timed out!")
true