import firebase from "firebase/app";
import "firebase/auth";

export default function Login(){
  var firebaseui = require('firebaseui');
	var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessWithAuthResult: function(authResult, redirectUrl){
        return true;
      }
    }
    ui.start('#firebaseui-auth-container', uiConfig);
    return null;
}