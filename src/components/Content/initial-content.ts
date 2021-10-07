const initialContent  = `
<div class="tpara">xThis project basically implements<img src="https://www.mifo.com/images/Training.jpg" alt="My Alt Text" style="width:200px;border:4px solid green;"></img> the basic examples that are on the TipTap site at [<a href="https://www.tiptap.dev/examples/default">https://www.tiptap.dev/examples/default</a>] within a Quasar Framework project.</div>
<p>I have added a few custom extensions to provide the capability of Font Color, Font Size and Font Background Color. Additionally, I added an interactive node for image property management.</p>
<p>This is just meant to be a starter.</p>
<h4>IMPORTANT DISCLAIMER</h4>
<p>To get this to work I had to add a resolutions property to the package.json file telling it to use vue 3.1.4. Because of this I believe you need to use yarn instead of npm to install the dependencies (I do not think that npm looks at the resolutions property). Without adding this the editor was not displaying.</p>
<h4>Clone the repository</h4>
<pre><code class="bash language-bash">git clone https://github.com/mfoitzik/quasar2-tiptap2.git</code></pre>
<h5>Install the dependencies (use yarn!)</h5>
<pre><code class="bash language-bash">yarn install</code></pre>
<h5>Start the dev server</h5>
<pre><code class="bash language-bash">quasar dev</code></pre>
<h4>Please support the projects that make this project possible</h4>
<h5>Me</h5>
<p>I am building some commercial stuff so if you want to support me, just help spread the word about <a href="https://www.SimplicityBlocks.com">SimplicityBlocks.com</a>, <a href="https://www.SimplicityBuilder.com">SimplicityBuilder.com</a> or try these out (free - no credit card required) and give me some feedback on them, or just  <a href="https://twitter.com/MikeFoitzik">follow me on twitter</a> to keep up with me</a>.</p>
<p>The following are listed in alphabetical order as I think for this particular project they are all equally important.</p>
<h5>ProseMirror</h5>
<p>ProseMirror is the "engine" under the hood of the TipTap project.</p>
<p>Support ProseMirror at: [<a href="https://marijnhaverbeke.nl/fund/">https://marijnhaverbeke.nl/fund/</a>]</p>
<h5>Quasar Framework</h5>
<p>Quasar Framework is an awesome framework built on top of Vue.js that provides UI components as well as many other features that simplify building a Vue.js project.</p>
<p>Support the Quasar Framework project at: [<a href="https://github.com/sponsors/rstoenescu">https://github.com/sponsors/rstoenescu</a>]</p>
<h5>TipTap</h5>
<p>TipTap is the headless editor framework for web artisans. </p>
<p>Support TipTap at: [<a href="https://github.com/sponsors/ueberdosis">https://github.com/sponsors/ueberdosis</a>]</p>
<h5>Vue.js</h5>
<p>Vue is a progressive framework for building user interfaces.</p>
<p>Support Vue at: [<a href="https://vuejs.org/support-vuejs/">https://vuejs.org/support-vuejs/</a>]</p>
`
export default initialContent
