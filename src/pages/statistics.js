import React from 'react';
import firebase from "firebase/app";
import "firebase/firestore";

class Statistics extends React.Component{
	
	constructor(props)
	{
	    super(props);
	    this.state = {
	        data: null,
	    };
	}

	
	componentDidMount(){
		var db = firebase.firestore();
		const user = firebase.auth().currentUser;
		const docRef = db.collection('main').doc(user.uid);
		docRef.get().then((doc) => {
			if (doc.exists) {
				let data = doc.data();
				this.setState({ 
					data: data 
				});
				console.log("Document data:", data);
			}else{
				this.setState({ data: null });
				console.log("No such document");
			}
		}).catch(function (error) {
			this.setState({ data:null });
			console.log("Error getting document:", error);
		});
	}
	
	render() {
		let dataUI = this.state.data === null ? null : <pre>{JSON.stringify(this.state.data)}</pre>;
		let currentStreak = "Loading...";
		let maxStreak = "Loading...";
		if(dataUI){
			currentStreak = this.state.data["currentStreak"];
			maxStreak = this.state.data["maxStreak"];
		}

		return(
			<div>
				<ul>
					<li>Current Streak - {currentStreak}</li>
					<li>Max Streak - {maxStreak}</li>
				</ul>
			</div>
		);

	}
}

export default Statistics;