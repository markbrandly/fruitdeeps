//_App.js is the top level component in the React component hierarchy.
// All pages will share App as their top level component
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../styles/_reset.css";
import "../styles/main.scss";

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
