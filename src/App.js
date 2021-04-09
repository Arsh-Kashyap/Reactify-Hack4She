import React, { Component } from "react";
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
import Profile from "./components/Profile/Profile";
import RegisterNgo from './components/RegisterNgo/registerNgo';
import NgoLogin from './components/ngoLogin/ngoLogin';
import NgoProfile from './components/Profile/NgoProfile';

class App extends Component {
	
	render() {
		
		return (
			<div>
				<div className={classes.App}>
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
									<Route path="/donate/:id" exact component={Donation} />
									<Route path="/about" exact component={About} />
									<Route path="/loginNgo" exact component={NgoLogin} />
									<Route path="/profile" component={Profile} />
									<Route path="/ngoProfile" exact component={NgoProfile} />
									<Route path="/" exact>
										<Home />
									</Route>
								</Switch>
							</Router>
						</NgoProvider>
					</UserProvider>
				</div>
			</div>
		);
	}
}

export default App;