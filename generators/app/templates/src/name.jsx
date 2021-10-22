import "preact/debug";
import <%= camelName %>App from "./app/<%= camelName %>App.jsx";

for (let el of document.getElementsByClassName("<%= name %>-container"))
	render(<<%= camelName %>App {...el.dataset}/>,el);
