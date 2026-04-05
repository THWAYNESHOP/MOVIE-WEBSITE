# Firebase Integration Guide

## 📱 Setup Complete!

Firebase is now integrated into your Patrick Cinema TV website. Here's how to use it.

---

## ✅ What's Set Up

Your site now includes:
- **Firebase Authentication** - User login/signup
- **Firestore Database** - Store shows, user data, watch history
- **Firebase Analytics** - Track user behavior
- **Firebase Realtime Database** (available on demand)

---

## 🔍 How to Access Firebase in Your Code

### Option 1: Global Access (Easiest)
After `firebase-init.js` loads, Firebase is available globally:

```javascript
// Access Firebase services
const firebase = window.firebaseApp.firebase;
const auth = window.firebaseApp.auth;
const db = window.firebaseApp.db;
const analytics = window.firebaseApp.analytics;
```

### Option 2: Direct Firebase Access
```javascript
// Firebase is also available as window.firebase
const user = firebase.auth().currentUser;
const db = firebase.firestore();
```

---

## 👤 User Authentication Examples

### Sign Up
```javascript
const email = "user@example.com";
const password = "password123";

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log("User created:", userCredential.user);
  })
  .catch((error) => {
    console.error("Signup error:", error.message);
  });
```

### Sign In
```javascript
const email = "user@example.com";
const password = "password123";

firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log("User signed in:", userCredential.user);
    // Redirect to dashboard
    window.location.href = 'index.html';
  })
  .catch((error) => {
    console.error("Login error:", error.message);
  });
```

### Sign Out
```javascript
firebase.auth().signOut()
  .then(() => {
    console.log("User signed out");
    window.location.href = 'login.html';
  })
  .catch((error) => {
    console.error("Logout error:", error.message);
  });
```

### Check Current User
```javascript
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("Logged in as:", user.email);
    // Show logged in content
  } else {
    console.log("Not logged in");
    // Show login prompt
  }
});
```

---

## 💾 Firestore Database Examples

### Save Show Data
```javascript
const db = firebase.firestore();
const user = firebase.auth().currentUser;

if (user) {
  db.collection('users').doc(user.uid).set({
    email: user.email,
    displayName: user.displayName || "User",
    favoriteShows: ['lulu', 'ayana'],
    createdAt: new Date()
  })
  .then(() => {
    console.log("User data saved!");
  })
  .catch((error) => {
    console.error("Error saving data:", error);
  });
}
```

### Save Watch History
```javascript
const db = firebase.firestore();
const user = firebase.auth().currentUser;

if (user) {
  db.collection('users').doc(user.uid).collection('watchHistory').add({
    showId: 'lulu',
    episodeId: 1,
    timestamp: new Date(),
    watchedDuration: 1800 // seconds
  });
}
```

### Get User's Favorite Shows
```javascript
const db = firebase.firestore();
const user = firebase.auth().currentUser;

if (user) {
  db.collection('users').doc(user.uid).get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Favorite shows:", doc.data().favoriteShows);
      }
    })
    .catch((error) => {
      console.error("Error getting data:", error);
    });
}
```

### Add Show to Favorites
```javascript
const db = firebase.firestore();
const user = firebase.auth().currentUser;

if (user) {
  db.collection('users').doc(user.uid).update({
    favoriteShows: firebase.firestore.FieldValue.arrayUnion('new-show-id')
  });
}
```

### Get All User's Watch History
```javascript
const db = firebase.firestore();
const user = firebase.auth().currentUser;

if (user) {
  db.collection('users').doc(user.uid).collection('watchHistory')
    .orderBy('timestamp', 'desc')
    .limit(10)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
}
```

---

## 📊 Track Analytics

### Log Custom Events
```javascript
const analytics = firebase.analytics();

// Track when user starts watching
analytics.logEvent('start_watch', {
  show_id: 'lulu',
  episode_id: 1,
  timestamp: new Date()
});

// Track when user finishes episode
analytics.logEvent('complete_episode', {
  show_id: 'lulu',
  episode_id: 1
});

// Track searches
analytics.logEvent('search', {
  search_term: 'drama'
});
```

---

## 🔒 Security Rules (Firestore)

Here's a basic security rule for your Firestore database:

Go to Firebase Console → Firestore Database → Rules → Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      
      // Watch history subcollection
      match /watchHistory/{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
    
    // Public shows data (read-only)
    match /shows/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

---

## 🚀 Practical Implementation Ideas

### 1. Save Login State
```javascript
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.querySelector('.user-avatar').textContent = user.email[0].toUpperCase();
    document.querySelector('.upgrade').textContent = 'Account';
  }
});
```

### 2. Track Video Progress
```javascript
const video = document.querySelector('video');
video.addEventListener('timeupdate', () => {
  // Save progress every 10 seconds
  if (Math.floor(video.currentTime) % 10 === 0) {
    saveWatchProgress(video.currentTime);
  }
});

function saveWatchProgress(seconds) {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  
  if (user) {
    db.collection('users').doc(user.uid).update({
      lastWatchPosition: seconds
    });
  }
}
```

### 3. Personalized Recommendations
```javascript
function getRecommendations() {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  
  if (!user) return;
  
  db.collection('users').doc(user.uid).get().then((doc) => {
    const favoriteGenres = doc.data().favoriteGenres;
    // Find shows matching genres
  });
}
```

### 4. Create Watchlist
```javascript
async function addToWatchlist(showId) {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  
  if (user) {
    await db.collection('users').doc(user.uid).update({
      watchlist: firebase.firestore.FieldValue.arrayUnion(showId)
    });
    console.log("Added to watchlist!");
  }
}
```

---

## 🆘 Troubleshooting

### "Firebase is not defined"
- Make sure `firebase-init.js` loads BEFORE your other scripts
- Check browser console for errors
- Verify Firebase SDK scripts loaded in HTML

### "User not authenticated"
- Call `firebase.auth().signIn()` first
- Check if user is null with `firebase.auth().currentUser`
- Use `onAuthStateChanged()` to wait for auth to be ready

### "Permission denied on Firestore"
- Check your security rules (rules above)
- Ensure the user is authenticated
- Verify the document path matches your rules

---

## 📚 More Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
- [Authentication Guide](https://firebase.google.com/docs/auth)

---

## 💡 Next Steps

1. **Update your login page** - Add sign-up/sign-in using the examples above
2. **Track watch history** - Save which episodes users watch
3. **Add favorites** - Let users save favorite shows
4. **Personalize dashboard** - Show recommended shows based on watch history
5. **Sync data** - Keep user preferences synced across devices

---

**Your Firebase integration is ready to use!** 🚀
