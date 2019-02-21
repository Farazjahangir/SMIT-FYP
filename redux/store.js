import { createStore , applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


// import rootReducer from './rootReducer'
// import { createStore, applyMiddleware, compose } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import thunk from 'redux-thunk'
// import { AsyncStorage } from 'react-native'
// import promise from 'redux-promise-middleware'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// //import logger from 'redux-logger'

// const enhancer = compose(
//     applyMiddleware(thunk, promise())
// );

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     stateReconciler: autoMergeLevel2,
//     timeout: null
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// //let store = createStore(rootReducer, enhancer);
// export let store = createStore(persistedReducer, enhancer);

// store.subscribe(() =>
//     console.log(store.getState())
// );

// export let persistor = persistStore(store);