import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAZLoPk0vrPCQ3uCZCoQInacgskFlbhOpI',
  authDomain: 'dungeon-runner-6926f.firebaseapp.com',
  projectId: 'dungeon-runner-6926f',
  storageBucket: 'dungeon-runner-6926f.appspot.com',
  messagingSenderId: '40895776536',
  appId: '1:40895776536:web:4b5a28d9b1efdc2f00c06d',
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore()

const Timestamp = firebaseApp.Timestamp

export { db, Timestamp }
