import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyA1a6vHSlGgMbH4aB8feCpKxadatGX-uqM",
  authDomain: "smit-fyp.firebaseapp.com",
  databaseURL: "https://smit-fyp.firebaseio.com",
  projectId: "smit-fyp",
  storageBucket: "smit-fyp.appspot.com",
  messagingSenderId: "1029702576653"
};
firebase.initializeApp(config);

const loginWithFacebook = async () => {

  console.log('LOGIM');

  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    '2240305036240222',
    { permissions: ['public_profile', 'email'] }
  );

  if (type === 'success') {
    return new Promise((resolve, reject) => {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      // Sign in with credential from the Facebook user.
      firebase.auth().signInAndRetrieveDataWithCredential(credential).then((user) => {
        const userObj = {
          userName : user.user.displayName,
          userUid : user.user.uid,
          profilePic : user.user.photoURL
        }
        resolve(userObj)
      })
        .catch((error) => {
          console.log("ERROR", error);

          // Handle Errors here.
        });
    })
  }

}

export {
  firebase,
  loginWithFacebook
}