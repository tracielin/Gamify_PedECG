My design considerations:

-For longevity (i.e. less likely for functionality to fail over time): 
I chose to use only HTML, CSS, and vanilla JavaScript. 
That is, I intentionally avoided using external libraries like JQuery. 

-To avoid storage mechanisms that are often disabled or erased on individual computers:
I keep all the content for a given "game level" on a single webpage,
I use javascript functions that use only a browser's current runtime memory.
