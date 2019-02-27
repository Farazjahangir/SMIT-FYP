import * as firebase from 'firebase';
require("firebase/firestore");
var config = {
  apiKey: "AIzaSyA1a6vHSlGgMbH4aB8feCpKxadatGX-uqM",
  authDomain: "smit-fyp.firebaseapp.com",
  databaseURL: "https://smit-fyp.firebaseio.com",
  projectId: "smit-fyp",
  storageBucket: "smit-fyp.appspot.com",
  messagingSenderId: "1029702576653"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const storageRef = firebase.storage().ref()

const loginWithFacebook = async () => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    '2240305036240222',
    { permissions: ['public_profile', 'email'] }
  );

  if (type === 'success') {
    const credential = await firebase.auth.FacebookAuthProvider.credential(token)
    const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential)
      const userObj = {
        userName: user.user.displayName,
        userUid: user.user.uid,
        profilePic: user.user.photoURL + '?type=large'
      }
      return userObj
  }
  else{
    throw 'Login error'
  }
}


const SavingUserData = async (userObj) =>{
  const uid = userObj.userUid
  // let profilePic = ''
  console.log('UserObject' , userObj.profilePicUrl);

  if(typeof userObj.profilePicUrl === 'object'){
    console.log('FirebaseIf' , userObj.profilePicUrl);
    
    let name = `${Date.now()} - ${uid}`
    let message = userObj.profilePicUrl
    await storageRef.child(name).put(message)
    const url = await storageRef.child(name).getDownloadURL();
    userObj.profilePicUrl = url
  //  console.log('ProfilePioc' , profilePicUrl);
  }

    const userDataUploaded =  await db.collection('users').doc(uid).set({
        userName : userObj.userName,
        profilePicUrl : userObj.profilePicUrl,
        contactNum : userObj.contactNum,
        userUid : userObj.userUid
      })  
      return userDataUploaded
}

const saveUserSkill = (userSkillObj)=>{
  const userUid = firebase.auth().currentUser.uid;
  return new Promise((resolve ,reject)=>{
    db.collection('Skills').doc(userUid).set({
      SkillName : userSkillObj.skillName,
      Description : userSkillObj.description,
      Rate : userSkillObj.rate
    })
    .then(()=>{
      resolve("Data Has Been Saved")
  })
  })
}

const checkingUserProfile = async () =>{
  try{
      const userUid =  firebase.auth().currentUser.uid;
      const userData = await db.collection('users').doc(userUid).get()
      return userData
  }
  catch(e){
    throw 'not found'
  }
}

export {
  firebase,
  loginWithFacebook,
  SavingUserData,
  saveUserSkill,
  checkingUserProfile
}