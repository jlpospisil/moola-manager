Getting Started
---

1. Install dependencies:
    ```
    npm install
    cp src/config/index.example.js src/config/index.js
    ```
    
2. Modify src/config/index.js


Start the application
---

1. Start the webserver
    ```
    react-native start --reset-cache
    ```

2. Start application on device
    ```
    react-native run-ios
    ```
    
    OR
    
    ```
    react-native run-android
    ```

Notes
---

1. Update react native

    ```
    npx react-native-git-upgrade
    ```

2. Re-generate ios or android folder

    *Remove the folder and then run*:
    
    ```
    react-native eject
    ```