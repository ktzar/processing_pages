const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const errorMessages = {
    NO_STOCK: 'No stock has been found',
    INCORRECT_DETAILS: 'Incorrect details have been entered' 
};

const generateErrorPage = message => ({ title: 'Error page', message });


const stateProcessors = {
    error: state => {
        const { errorCode } = state;
        if (errorCode === undefined || errorCode === null) {
            return generateErrorPage(null);
        }
        if (errorMessages[errorCode]) {
            return generateErrorPage(errorMessages[errorCode]);
        }
        return generateErrorPage('Unknown error code');
    },
    processing: async (state) => {
        await sleep(2000);
        return false;
    },
    success: state => ({ title: 'Order complete', message: null })
}

const getProcessingPage = async function (states) {
    for (let i = 0 ; i < states.length ; i ++) {
        const {state} = states[i];

        if (stateProcessors[state]) {
            const result = await stateProcessors[state](states[i]);
            if (result) {
                return result;
            }
        } else {
            return { title: 'Error page', message: 'Invalid state' };
        }
    }
};

// One of these cases should be uncommented to be run. One left uncommented so it runs.
console.log('Processing and then undefined error');
getProcessingPage([{state: 'processing'}, {state: 'error'}])
    .then(console.log);

/*
console.log('Processing and then success');
getProcessingPage([{state: 'processing'}, {state: 'success'}])
    .then(console.log);

console.log('Processing and then error with no stock');
getProcessingPage([
    {state: 'processing'},
    {state: 'error', errorCode: 'NO_STOCK'}
]).then(console.log);

console.log('Processing and then error with incorrect details');
getProcessingPage([
    {state: 'processing'},
    {state: 'error', errorCode: 'INCORRECT_DETAILS'}
]).then(console.log);

console.log('Invalid state');
getProcessingPage([
    {state: 'processing'},
    {state: 'some_dodgy_state'}
]).then(console.log);
*/
