import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import classes from "./App.module.css";
import Navbar from "./components/UI/Navbar/Navbar";
import Home from "./components/Home/Home";
import LoginPage from "./components/LoginPage/LoginPage";
import { UserProvider } from "./context/userContext";
import { NgoProvider } from "./context/ngoContext";
import Ngos from "./components/Ngos/Ngos";
import Donation from "./containers/donation/donation";
import About from "./components/About/About";
import SimpleForm from "./components/Chatbot/SimpleForm";
import Profile from "./components/Profile/Profile";
import RegisterNgo from './components/RegisterNgo/registerNgo';
import ngoLogin from './components/ngoLogin/ngoLogin';

const App = () => {
	const [showChat, setShowChat] = useState(false);

	const startChat = () => {
		setShowChat(true);
	};

	const hideChat = () => {
		setShowChat(false);
	};
	let Classes = [classes.App];
	if (showChat) {
		Classes.push(classes.blur);
	}
	return (
		<div>
			<div className={Classes.join(" ")}>
				<UserProvider>
					<NgoProvider>
						<Router>
							<Navbar />
							<Switch>
								<Route path="/login" exact>
									<LoginPage />
								</Route>
								<Route
									path="/Ngo/:id"
									render={(props) => <Ngos {...props} />}
								/>
								<Route path="/registerNgo" exact component={RegisterNgo} />
								<Route path="/loginNgo" exact component={ngoLogin} />
								<Route path="/donate/:id" exact component={Donation} />
								<Route path="/about" exact component={About} />
								<Route path="/profile" component={Profile} />
								<Route path="/" exact>
									<Home />
								</Route>
							</Switch>
						</Router>
					</NgoProvider>
				</UserProvider>
			</div>
			<div className={classes.bot}>
				<div style={{ display: showChat ? "" : "none" }}>
					<SimpleForm></SimpleForm>
				</div>
				{/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}
				<div>
					{!showChat ? (
						<button className={classes.btn} onClick={() => this.startChat()}>
							click to chat...{" "}
						</button>
					) : (
						<button className={classes.btn} onClick={() => this.hideChat()}>
							click to hide...{" "}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}


export default App;
