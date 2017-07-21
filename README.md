# I Love You More - A Full Stack Web App

<h2>Summary</h2>
<p><a href="https://iloveyoumore.herokuapp.com" target="_blank">I Love You More</a> is a responsive full-stack (i.e. Mongo, Express, and  Node) app that allows users to send one-on-one messages to a loved one. </p>
 
<p>The primary goal of I Love You More is to allow users to send messages to another user and keep track of messages sent and received creating a lasting memory of love notes.  When users sign up for the app, they sign up themselves and a partner…at this point the two are inseparable. </p>
 
<img src ="http://adamr714.com/love_you_more/Love_You_More.jpg" alt="I love you more screen shots" />
 
<h2>Getting Started:</h2>


> git clone https://github.com/adamr714/love_you_more.git

> cd love_you_more

> npm install

If you woudl like the canned messages dropdown to be populated, please upload the Canned_Messages.json file to your database.  The file can be located in the canned_messages directory.

<h2>Launching:</h2>

```
> npm run watch
```
 
<h2>Testing:</h2>

```
>  npm test
```

<p><strong>Note:</strong> Due to this project using promises Node.js version 7 or greater must be used.  To determine your version on Node, please type node –v from your terminal window.</p>
 
<h2>Technology</h2>
 
<strong>Front End:</strong>
<ul>
    <li>HTML 5</li>
    <li>CSS3</li>
    <li>JavaScript</li>
    <li>JQuery</li>
</ul>
 
<strong>Back End:</strong>
<ul>
    <li>Node.js + Express.js (web server)</li>
    <li>Babel (Using ES6 and ES7)</li>
    <li>MongoDB (database)</li>
    <li>Mocha + Chai (testing)</li>
    <li>Continuous integration and deployment with Travis CI</li>
</ul>

<strong>Security</strong>
<ul>
    <li>bcrypt.js to hash and encrypt passwords</li>
    <li>Passport is protect API endpoints</li>
</ul>

<h2>Additional Resources include:</h2>
<ul>
    <li>Font-Awesome (<a href="http://fontawesome.io/" target="_blank">http://fontawesome.io/</a>)– For the heart image used in the name and slider</li>
    <li>Fabio Ottaviani (<a href="https://codepen.io/supah/" target="_blank">https://codepen.io/supah/</a>) - for the inpiration and starter code for the split slide</li>
    <li>StackOverflow – Used to look for similar programming difficulties to overcome challenges</li>
</uL

<h2>I would also like to thank:</h2>

<ul>
    <li>Neville Bonavia – An amazing programmer and mentor who answered numerous questions and challenged me to make this project all it could be!</li>
    <li>Derek Fogge - For being an awesome program manager and having the time to sit down and help me sort out issues and give suggestions on how to make my coding better</li>
</ul>



<strong>Development Roadmap</strong>
<ol>
<li>Delete Messages</li>
<li>Show Messages Sent Screen</li>
<li>Modify message sent</li>
<li>Create Twillio to send text</li>
<li>Server side strict validation</li>
<ol>    
<li>Password</li>
<li>Email</li>
<li>Username (min-length, no spaces)</li>
</ol>
<li>Curse word  removal</li>
<li>Convert UI to React</li>
<li>Add to Canned Messages</li>
<li>Get Messages since date – display last 20</li>
<li>Pull system to get messages automatically</li>
<li>User profile – change password</li>
</ol>
