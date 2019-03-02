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

// Function For Facebook Login
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
        profilePicUrl: user.user.photoURL + '?type=large'
      }
      return userObj
  }
  else{
    throw 'Login error'
  }
}


// Saving User's Data To Firestore
const SavingUserData = async (userObj) =>{
  const uid = userObj.userUid

// If Profile Pic Url Is Blob
  if(typeof userObj.profilePicUrl === 'object'){
    console.log('FirebaseIf' , userObj.profilePicUrl);
    
    let name = `${Date.now()} - ${uid}`
    let message = userObj.profilePicUrl
    await storageRef.child(name).put(message)
    const url = await storageRef.child(name).getDownloadURL();
    userObj.profilePicUrl = url
  }

    const userDataUploaded =  await db.collection('users').doc(uid).set({
        userName : userObj.userName,
        profilePicUrl : userObj.profilePicUrl,
        contactNum : userObj.contactNum,
        userUid : userObj.userUid,
        lat : userObj.lat,
        long : userObj.long
      })  
      return userObj
}

// Saving User's Skill In Firestore 
const saveUserSkill = async (userSkillObj)=>{
   const userUid = firebase.auth().currentUser.uid;

  //  If Pic Url IS Blob
   if(typeof userSkillObj.picUrl._data === 'object'){
     
    let name = `${Date.now()} - ${userUid}`
    let message = userSkillObj.picUrl
    await storageRef.child(name).put(message)
    const url = await storageRef.child(name).getDownloadURL();
    userSkillObj.picUrl = url
  }

    await db.collection('Skills').add({
      SkillName : userSkillObj.selectedCateogory,
      Description : userSkillObj.description,
      Rate : userSkillObj.rate,
      picUrl : userSkillObj.picUrl,
      userUid : userUid
    })
    return 'success'
}

// Function To Check Is User Is Already Registered
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
  checkingUserProfile,
}