# Guide to install Kompad

Video setup for newbie

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/aBVF-3NE_1Q/0.jpg)](https://www.youtube.com/watch?v=aBVF-3NE_1Q)


### Step 1: Clone the project repository to your computer
- Open a terminal and run the following command to clone the project from GitHub to your computer:
  
```
git clone https://github.com/hudy9x/kompad.git
```
### Step 2: Install the dependencies 
- Open a terminal and navigate to the Kompad project directory.
- Use yarn to install the dependencies:
  
```
cd kompad
yarn install
```
### Step 3: Install Tauri
- To build the Kompad application, you need to install Tauri, a tool that helps you develop cross-platform desktop applications.
- Visit the [https://tauri.app/v1/guides/getting-started/prerequisites/](https://tauri.app/v1/guides/getting-started/prerequisites/) page to find Tauri installation instructions.

### Step 4: Create a Firebase project

- Visit the [https://firebase.google.com/](https://firebase.google.com/) page to create a Firebase project.
- Sign in to your Google account or create a new account if needed.
- After signing in, you will see a "Create Project" button or similar. Click it to start the Firebase project creation process.
- Following the instructions on the Firebase website, provide the necessary information and name your project.
- When you have created the project, you will have access to your Firebase environment to continue configuring and using the project with the Kompad application.

> **Note:** The images used are for illustration purposes only and may vary depending on the Firebase interface version. Make sure to follow the instructions on the Firebase website to create your project correctly.

  ![image](https://github.com/hudy9x/kompad/assets/94043947/6520926a-75dd-4c99-9ab0-c9d5ea0d97e4)

### Step 5: Configure Firebase Config

- In the **Project Settings** section, you will find a configuration (config) file. Copy the contents of this file.

![Alt text](https://github-production-user-asset-6210df.s3.amazonaws.com/94043947/277913138-3acc5e20-0ae2-4e8d-83be-9ea457ffd125.png)

- Paste the Firebase config into the following path in the Kompad source code:
  
  ```
  src/libs/firebase.ts
  ```
### Step 6: Configure Firebase Security Rules

- Go to the Firestore Database and navigate to the **Rules** section in Firebase.
- Create security rules for your project's Firestore Database.
- Copy the entire security rules code snippet below and paste it into the **Rules** section.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  
    function checkOwner() {
    	return request.auth.uid == resource.data.uid;
    }
    
    function checkSharedToAnyone() {
    	return resource.data.shared.accessLevel == 'Anyone' 
    }
    
    function checkSharedToLimit() {
      return request.auth.token.email in resource.data.shared.viewedUsers
    }
    
    function checkAnyoneEditedUsers() {
			return resource.data.shared.accessLevel == 'Anyone' 
      && resource.data.shared.editedUsers == 'ALL'
    }
    
    function checkLimitEditedUsers() {
      return resource.data.shared.accessLevel == 'Limit'
      && request.auth.tokem.email in resource.data.shared.editedUsers 
    }

    match /users/{userId} {
    	allow create: if true;
      allow update: if request.auth.uid == userId
      allow get: if request.auth.uid == userId
      allow read: if true;
    }
    
    match /pads/{padId} {
      allow read: if checkOwner() || 
      checkSharedToAnyone() || 
      checkSharedToLimit()
      allow create: if true
      allow delete: if request.auth.uid == resource.data.uid
      allow update: if checkOwner() 
      || checkLimitEditedUsers() 
      || checkAnyoneEditedUsers()
    }
    
    
    match /files/{fileId} {
      allow list: if request.auth.uid == resource.data.createdBy;
    	allow create: if true;
      allow update: if request.auth.uid == resource.data.createdBy
      allow get: if request.auth.uid == resource.data.createdBy
      allow delete: if request.auth.uid == resource.data.createdBy
    }
    
    match /plans/{userId} {
      allow list: if request.auth.uid == userId;
    	allow create: if true;
      allow update: if request.auth.uid == userId
      allow get: if request.auth.uid == userId
      allow delete: if request.auth.uid == userId
    }
    
    match /transactions/{transactionId} {
      allow list: if request.auth.uid == resource.data.uid;
    	allow create: if true;
      allow get: if request.auth.uid == resource.data.uid
    }     
    
    match /folders/{folderId} {
      allow list: if request.auth.uid == resource.data.uid;
    	allow create: if true;
      allow update: if request.auth.uid == resource.data.uid
      allow get: if request.auth.uid == resource.data.uid
      allow delete: if request.auth.uid == resource.data.uid
    }
    
    match /tags/{tagId} {
      allow list: if request.auth.uid == resource.data.uid;
    	allow create: if true;
      allow update: if request.auth.uid == resource.data.uid
      allow get: if request.auth.uid == resource.data.uid
      allow delete: if request.auth.uid == resource.data.uid
    } 
    
    match /themes/{themeId} {
      allow list: if true;
    	allow create: if true;
      allow get: if true
    } 
    
    match /user-settings/{userId} {
    	allow create: if true;
      allow update: if request.auth.uid == userId
      allow get: if request.auth.uid == userId
      allow delete: if request.auth.uid == userId
    }  

    match /keys/{userId} {
    	allow create: if true;
      allow update: if request.auth.uid == userId
      allow get: if request.auth.uid == userId
      allow delete: if request.auth.uid == userId
    }  

    match /keys/{userId} {
    	allow create: if true;
      allow update: if request.auth.uid == userId
      allow get: if request.auth.uid == userId
      allow delete: if request.auth.uid == userId
    } 
    
    match /query-caching/{userId} {
    	allow create: if true;
      allow update: if request.auth.uid == userId
      allow get: if request.auth.uid == userId
      allow delete: if request.auth.uid == userId
    } 
  }
}
```
![Vi dụ minh họa](https://github.com/hudy9x/kompad/assets/94043947/0c468bdf-a685-4a2a-9940-d08d244d3ca3)
### Step 7: Configure Firebase Authentication

- In Firebase, initialize the Firebase Authentication service.
- In the **Sign-in method** section of Firebase Authentication, select the provider **Email/Password**.

> This will provide the Kompad application with the ability to authenticate users through email and password login. This helps to secure and manage users in your application.

  ![Vi dụ minh họa](https://github.com/hudy9x/kompad/assets/94043947/14ded3e5-ca63-422d-8944-a64a0946c1ec)
  
### Step 8: Run the Kompad project

- By this step, make sure you have successfully setup Tauri in step 3.
- Start running with the command

  
  ```
  yarn dev
  ```

### Step 9: Encrypt and secure data

- After you create an account and successfully log in to the Kompad application, the screen will automatically redirect to the data encryption and settings page.
- On the settings page, you will initialize the **SecretKey**.

> This process ensures that your data is encrypted and secure, and provides safety when you use the Kompad application.

  ![image](https://github.com/hudy9x/kompad/assets/94043947/a1e5a770-5088-41aa-9446-c5ad563aa958)

### Step 10: Set up indexes for the database

There are two ways to set up indexes for a database: manual and automatic. Depending on your choice, you can follow one of the following two methods:

- **Manually:**
    - Access the Firestore Database in Firebase.
    - For each collection that needs to have indexes set up, follow these steps:
        - Go to the **Indexes** section of the collection.
        - Add an index for the fields that you want to search or sort by.
  ![image](https://github.com/hudy9x/kompad/assets/94043947/cf1dd167-77cb-48ef-9e89-afcadef2004c)

- **Automatic installation may cause some inconvenience and require you to monitor index errors:**
  - Enable the browser's devtools.
  - Open the Kompad application and perform operations on the application.
  - The automatic installation process will generate error loggers when index errors occur. They will be displayed in the browser's devtools.
  - Monitor index errors and fix them when they occur. This process will continue until all indexes are correctly installed for all collections.
  ![Ảnh chụp màn hình 2023-11-05 105732](https://github.com/hudy9x/kompad/assets/94043947/7dd14751-f972-4481-9b07-923bee164fb9)

### Step 11: Set up Firebase Storage
- Access the **Storage** section in Firebase.
- Initialize Firebase Storage for your application.
- Create a folder in Firebase Storage with the following folder structure
  
  ```
  avatars/public
  ```
 > By following this step, you will create a Firebase storage space for the Kompad application and set up the necessary folder structure to store files, especially public shared avatars.
 
 ![image](https://github.com/hudy9x/kompad/assets/94043947/160fea3a-8faf-4fd8-a723-a81cd0c9bf6d)
 
### Step 12: Set up and integrate the Algolia Search API key

- Start by creating an Algolia account.
- Once you have an Algolia account, you need to create an Algolia application and data index. This index will store the data that you want to search for in your application.
- Get the **API key** from Algolia. In the Algolia dashboard, you have the ability to find and create API keys. You need at least one API key for search purposes and a different API key for data writing purposes. This helps to ensure data security and access control.
- Integrate the API key into your application. Go to the `src\libs\search.ts` directory, and paste the data you obtained from the previous steps here.
  
```
const algoliasearch = require('algoliasearch/lite');
const client = algoliasearch('YOUR_APP_ID', 'YOUR_SEARCH_ONLY_API_KEY');
const index = client.initIndex('your_index_name');
```

> By following these steps, you have integrated Algolia Search into your Kompad application and can now take advantage of its powerful search capabilities.

 ![image](https://github.com/hudy9x/kompad/assets/94043947/f5e536c6-5358-4ae0-b319-0b9df3db6aaf)
 
