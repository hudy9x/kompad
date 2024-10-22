# Những bước cài đặt phần mềm Kompad

Hướng dẫn cài đặt qua video cho người mới

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/aBVF-3NE_1Q/0.jpg)](https://www.youtube.com/watch?v=aBVF-3NE_1Q)

### Bước 1: Sao chép Repository dự án về máy tính của bạn
- Mở terminal và chạy lệnh sau để sao chép dự án từ GitHub về máy tính của bạn:
  
```
git clone https://github.com/hudy9x/kompad.git
```
### Bước 2: Cài đặt các gói phụ thuộc 
- Mở terminal và di chuyển vào thư mục của dự án Kompad.
- Sử dụng yarn để cài đặt các gói phụ thuộc:
  
```
cd kompad
yarn install
```
### Bước 3: Cài đặt Tauri
- Để xây dựng ứng dụng Kompad, bạn cần cài đặt Tauri, một công cụ giúp phát triển ứng dụng máy tính đa nền tảng.
- Truy cập trang [https://tauri.app/v1/guides/getting-started/prerequisites/](https://tauri.app/v1/guides/getting-started/prerequisites/) để tìm hướng dẫn cài đặt Tauri.
### Bước 4: Tạo dự án Firebase
- Truy cập [https://firebase.google.com/](https://firebase.google.com/) để tạo dự án Firebase.
- Đăng nhập vào tài khoản Google của bạn hoặc tạo tài khoản mới nếu cần.
- Sau khi đăng nhập, bạn sẽ thấy nút "Tạo dự án" hoặc tương tự. Bấm vào đó để bắt đầu quá trình tạo dự án Firebase.
- Theo hướng dẫn trên trang web Firebase, bạn sẽ cung cấp thông tin cần thiết và đặt tên cho dự án của mình.
- Khi tạo xong dự án, bạn sẽ có quyền truy cập vào môi trường Firebase của mình để tiếp tục cấu hình và sử dụng dự án với ứng dụng Kompad.
> Chú ý: Hình ảnh được sử dụng chỉ để minh họa và có thể thay đổi tùy theo phiên bản giao diện của Firebase. Đảm bảo tuân thủ hướng dẫn trên trang web Firebase để tạo dự án một cách chính xác.

  ![image](https://github.com/hudy9x/kompad/assets/94043947/6520926a-75dd-4c99-9ab0-c9d5ea0d97e4)
### Bước 5: Cài đặt Config Firebase
- Trong mục **Project Setting**, bạn sẽ có một file cấu hình (config). Sao chép nội dung của file này.
  
![Alt text](https://github-production-user-asset-6210df.s3.amazonaws.com/94043947/277913138-3acc5e20-0ae2-4e8d-83be-9ea457ffd125.png)

- Dán config firebase vào đường dẫn sau trong source code Kompad
  
  ```
  src/libs/firebase.ts
  ```
### Bước 6: Cài đặt Firebase Security Rules
- Truy cập vào Firestore Database và đến mục **Rules**  trong Firebase.
- Tạo các quy tắc bảo mật cho Firestore Database của dự án của bạn.
- Sao chép toàn bộ đoạn mã quy tắc bảo mật dưới đây và dán vào mục **Rules**
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
### Bước 7: Cài đặt Firebase Authentication
- Trong Firebase, hãy khởi tạo dịch vụ Firebase Authentication.
- Trong phần **Sign-in method** của Firebase Authentication, chọn provider là **Email/Password**
> Việc này sẽ cung cấp cho ứng dụng Kompad khả năng xác thực người dùng thông qua đăng nhập bằng email và mật khẩu. Điều này giúp bảo mật và quản lý người dùng trong ứng dụng của bạn.

  ![Vi dụ minh họa](https://github.com/hudy9x/kompad/assets/94043947/14ded3e5-ca63-422d-8944-a64a0946c1ec)
### Bước 8: Khởi chạy dự án kompad
- Khi làm tới bước này, hãy chắc chắn bạn đã setup tauri thành công ở bước 3
- Bắt đầu khởi chạy với lệnh
  
  ```
  yarn dev
  ```

### Bước 9: Mã hóa và bảo mật dữ liệu
-  Sau khi bạn tạo tài khoản và đăng nhập thành công vào ứng dụng Kompad, màn hình sẽ tự động chuyển hướng tới trang cài đặt và mã hóa dữ liệu.
-  Tại trang cài đặt, bạn sẽ khởi tạo **SecretKey**
> Quá trình này đảm bảo rằng dữ liệu của bạn được mã hóa và bảo mật, đồng thời cung cấp sự an toàn khi bạn sử dụng ứng dụng Kompad.

  ![image](https://github.com/hudy9x/kompad/assets/94043947/a1e5a770-5088-41aa-9446-c5ad563aa958)

### Bước 10:  Cài đặt Indexes cho Database
Cài đặt indexes cho database có hai cách thực hiện: cài đặt thủ công và cài đặt tự động. Dựa vào sự lựa chọn của bạn, bạn có thể thực hiện một trong hai cách sau:
- Cài đặt thủ công:
     - Truy cập Firestore Database trong Firebase.
     - Đối với mỗi collection cần cài đặt indexes, thực hiện các bước sau:
       - Vào mục **Indexes** của collection.
       - Thêm index cho các trường mà bạn muốn tìm kiếm hoặc sắp xếp theo chúng.
  ![image](https://github.com/hudy9x/kompad/assets/94043947/cf1dd167-77cb-48ef-9e89-afcadef2004c)

- Cài đặt tự động có thể gây ra một số bất tiện và yêu cầu bạn theo dõi lỗi indexes:
  - Bật devtools của trình duyệt.
  - Mở ứng dụng Kompad và thực hiện các thao tác trên ứng dụng.
  - Quá trình cài đặt tự động sẽ tạo ra các logger lỗi khi có lỗi indexes xuất hiện. Chúng sẽ được hiển thị trong devtools của trình duyệt.
  - Theo dõi các lỗi indexes và sửa chúng khi chúng xuất hiện. Quá trình này sẽ tiếp tục cho đến khi tất cả indexes được cài đặt đúng cho tất cả các collection.
  ![Ảnh chụp màn hình 2023-11-05 105732](https://github.com/hudy9x/kompad/assets/94043947/7dd14751-f972-4481-9b07-923bee164fb9)
### Bước 11: Cài đặt Firebase Storage
- Truy cập mục **Storage** trong Firebase.
- Khởi tạo Firebase Storage cho ứng dụng của bạn.
- Tạo thư mục trong Firebase Storage với cấu trúc thư mục như sau
  
  ```
  avatars/public
  ```
 > Bằng cách thực hiện bước này, bạn sẽ tạo ra một không gian lưu trữ Firebase cho ứng dụng Kompad và thiết lập cấu trúc thư mục cần thiết để lưu trữ tệp tin, đặc biệt là các hình ảnh avatars được chia sẻ công     khai (public).
 
 ![image](https://github.com/hudy9x/kompad/assets/94043947/160fea3a-8faf-4fd8-a723-a81cd0c9bf6d)
### Bước 12: Cài đặt và tích hợp API KEY cho Algolia earch 
- Bắt đầu bằng việc tạo một tài khoản Algolia.
- Sau khi bạn đã có tài khoản Algolia, bạn cần tạo một ứng dụng Algolia và chỉ mục (index) dữ liệu. Chỉ mục này sẽ lưu trữ dữ liệu mà bạn muốn tìm kiếm trong ứng dụng.
- Lấy **API Key** từ Algolia. Trong bảng điều khiển Algolia, bạn có khả năng tìm và tạo các API key. Cần ít nhất một API key cho mục đích tìm kiếm và một API key khác cho mục đích ghi dữ liệu. Điều này giúp đảm bảo tính an toàn và kiểm soát quyền truy cập vào dữ liệu.
- Tích hợp API Key vào ứng dụng của bạn. Bạn tới thư mục ``` src\libs\search.ts ```, và lấy những dữ kiện có được từ những bước trên và dán vào đây
  
```
const algoliasearch = require('algoliasearch/lite');
const client = algoliasearch('YOUR_APP_ID', 'YOUR_SEARCH_ONLY_API_KEY');
const index = client.initIndex('your_index_name');
```

> Bằng cách thực hiện các bước trên, bạn đã tích hợp Algolia Search vào ứng dụng Kompad và có thể tận dụng khả năng tìm kiếm mạnh mẽ trong ứng dụng của mình

 ![image](https://github.com/hudy9x/kompad/assets/94043947/f5e536c6-5358-4ae0-b319-0b9df3db6aaf)
 
