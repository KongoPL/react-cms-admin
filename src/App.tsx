import React from 'react';
//import { BrowserRouter, Route } from "react-router-dom";
import Index from 'pages/index/Index';
import {Appka} from "./test";

const App: React.FC = () =>
{
	//<BrowserRouter>
	//	<Route path="/" exact component={Index} />
	//	<Route path="/news/:id" component={News} />
	// </BrowserRouter>

	return (
		<Index />
		// <Appka />
	);
}

export default App;
