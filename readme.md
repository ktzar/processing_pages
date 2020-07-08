 ## 8/7/2020

 Please note that I've used asyncronous functions as a way to implement the delay requirement.
 Another way would be to use callbacks, but as the signature of the function was provided and a callback wasn't specified, I decided to go down this way.
 One of the use cases is left uncommented, but the others can be uncommented (one by one, unless multiple states should be processed at the same time)

 I've added code to handle unknown states and unknown error codes (which wasn't part of the spec).

To run it:

```sh
node index.js
```
