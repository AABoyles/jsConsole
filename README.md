jsConsole
=========

A Sandbox for data manipulation using LoDash.js, super-powered by Underscore.string and Underscore-contrib

by Tony Boyles

Why is this a thing?
--------------------

I frequently find myself having JSON strings and needing to refactor them.  There are some easy ways to do this, and some harder ways to do this. The easiest way for me has always been to write some sort of mapper using the functional style and chaining of Underscore.js.  It's just the way my brain works.  As such, I have written a little browser utility for working with JSON strings.

If you want to, give it a try.

How do you use it?
------------------

Go to http://code.aaboyles.com/jsConsole 

The left pane is the script you write to modify your data.  The right pane contains tabs for Input and Output data.

1. Paste your Input Data into the right pane under the Input Data. It must be valid, parsable JSON.
2. Write your mapper.  The input data is available as a parsed Javascript object under the variable name "input".  Assign the final value you need to a Javascript object called "output".
3. Click Execute.  Your mapper will run, and the value found in output will be JSON.stringify'ed.  That JSON string will appear in the output tab, which will materialize over the input data when execute is clicked.
4. Copy your output data and go on your way!


Couldn't you just use the Node.js CLI?
--------------------------------------

Sure.  I just don't like it very much, and I often find myself wanting to write little javascripts that eat JSON and return different JSON, but not wanting to play with a much heavier solution like Node.js or a NoSQL database like Mongo.  Sometimes, you just want to open a browser, paste in some JSON, write code to transform it, and copy the output JSON for use somewhere else. Quick and dirty.

Couldn't you just use jsfiddle?
-------------------------------

Sure.  Fiddles don't ingest JSON and output JSON, but that's a very small problem.  You could write HTML for a couple of textareas, then use javascript to pipe input from the first one through some algorithm, and output it to the second one.  But then, that's exactly what jsConsole is.

Couldn't you just use the Firebug or Chrome Developer Tools Consoles?
---------------------------------------------------------------------

Sure.  But this is a slightly nicer environment, and it's a bit easier to plug features for it, if I ever want to.

Couldn't you just use jQ or jqplay?
-----------------------------------

Possibly.  jQ is a great little tool, and it can do some amazing things.  But it doesn't necessarily preserve JSON in its outputs.  That's fine for a lot of use cases, but I wrote jsConsole for the simple case in which I have some JSON and I need to restructure that JSON.  jQ should often be able to accomplish that, but not always.  Plus, I find the syntax a little weird. With jsConsole, you just write a little bit of ordinary, valid javascript using Underscore.

Couldn't you just u...
----------------------

STOP IT; I GET IT!  It's a crowded field.  If you like another solution, the use that!  I wrote this one because I *like* this one.
