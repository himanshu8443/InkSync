   [![Project Banner](https://github.com/himanshu8443/InkSync/assets/99420590/0e79c4b5-a834-4235-a741-67ca97e02abd)](http://inksync.cloud/)

   
A Real-Time Collaborative Whiteboard Web App built with NextJs.
---
## Features
* Share canvas in real-time easily just by sharing a link.
* Chat with people in the room.
* Own file extension .ink Save the drawing files locally on your device.

---
## ScreenShots
![image](https://github.com/himanshu8443/InkSync/assets/99420590/4971f9c1-5c19-436a-af31-664ecda2084d)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

1. Clone the repository to your local machine.
    ```sh
    git clone https://github.com/himanshu8443/InkSync.git
    ```
    
2. Install the required packages.
    ```sh
    cd InkSync
    npm install
    
    cd server
    npm install
    ```
    
3. Set up the environment variables:
   Create a .env file in the root directory
   ```sh
   NEXT_PUBLIC_SERVER_URL= # URL of the server (e.g. http://localhost:3000 in development mode)
   ```
   Create a .env file in the server directory
   ```sh
   PORT = "5000"
   ```
   

5. Start the development server.
    ```sh
    npm run dev
    ```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
