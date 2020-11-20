import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import classes from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import LoginPage from "./components/LoginPage/LoginPage";
import { UserProvider } from "./context/userContext";
import { NgoProvider } from "./context/ngoContext";
import Ngos from "./components/Ngos/Ngos";
import Donation from "./containers/donation/donation";
import About from "./components/About/About";
import SimpleForm from "./components/Chatbot/SimpleForm";
import Profile from "./components/Profile/Profile";

class App extends Component {
	state = {
		showChat: false,
	};
	startChat = () => {
		this.setState({ showChat: true });
	};

	hideChat = () => {
		this.setState({ showChat: false });
	};
	render() {
		let Classes = [classes.App];
		if (this.state.showChat) {
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
									<Route path="/donate/:id" component={Donation} />
									<Route path="/about" component={About} />
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
					<div style={{ display: this.state.showChat ? "" : "none" }}>
						<SimpleForm></SimpleForm>
					</div>
					{/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}
					<div>
						{!this.state.showChat ? (
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
}

export default App;
