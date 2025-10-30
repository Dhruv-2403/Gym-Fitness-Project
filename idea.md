
# 🏋️‍♂️ Project Title: Gym & Fitness Platform

## 📘 Project Overview
Our Project is a full-stack web application designed to help users achieve fitness goals through personalized AI-generated workout plans. The platform gamifies progress with **daily streaks and level-ups**, and integrates an **e-commerce store** for gym apparel and equipment. The **AI Trainer** provides real-time feedback to keep members motivated and on track.

---

## ⚙️ Key Features 
- 🧠 **AI Trainer Integration** – Generate workout plans and provide personalized feedback after each workout.
- 🔥 **Streak & Level-Up System** – Track daily workout completion and reward consistency with XP and levels.
- 📊 **Member Dashboard** – View AI workouts, streaks, levels, progress charts, and motivational messages.
- 🏋️‍♂️ **Workout Tracker** – Mark workouts as complete; streaks and feedback update automatically.
- 🛍️ **E-commerce Store** – Browse and purchase gym apparel, supplements, and equipment.
- 💳 **Payment Gateway Integration** – Secure checkout via Stripe / Razorpay.
- 👤 **Profile Management** – Edit personal info, update fitness goals, view history, and track performance.
- 🔔 **Notifications & Reminders** – Receive workout reminders and streak alerts.

---

## 👥 User Roles
- **Member** – Registers/login, accesses AI Trainer, tracks workouts, maintains streaks, levels up, purchases items from the store.

## Note: We are thinking of whether we can add admin  or trainer role in our project or not .

---

## 🖥️ Frontend Pages / UI Components 
1. **Home Page** – Overview of features, CTA (Join Now / Login).
2. **Login / Signup** – Member authentication.
3. **Member Dashboard** – Daily workouts, streaks, XP, AI feedback, and progress charts.
4. **AI Trainer Page** – Generate personalized plans and view AI feedback for completed workouts.
5. **Workout Tracker** – Log completed exercises; streaks and level-up updates automatically.
6. **Level-Up / Badges Page** – Gamification display of milestones and achievements.
7. **E-commerce Store** – Browse products, add to cart, checkout.
8. **Payment Page** – Stripe / Razorpay secure payment integration.
9. **Profile Page** – Edit member info, update goals, view workout history.
10. **User Feedback Page** – Submit ratings and comments about the platform.

---

## 🗄️ Database Schema 

### **Users**
| Field       | Type          | Description                     |
|------------ |-------------- |--------------------------------|
| user_id     | INT (PK)      | Unique user ID                  |
| user_name       | VARCHAR       | Full name                       |
| user_email      | VARCHAR       | Unique email                    |
| user_password   | VARCHAR       | Hashed password                 |
| user_age        | INT           | User age                        |
| height     | FLOAT         | Height (cm)                     |
| weight     | FLOAT         | Weight (kg)                     |
| level      | INT           | User level (gamification)       |
| streak     | INT           | Consecutive workout days        |
| goals      | TEXT          | Fitness goals                   |
| createdAt  | DATE          | Registration date               |

### **Workouts**
| Field        | Type          | Description                  |
|------------- |-------------- |----------------------------- |
| workout_id   | INT (PK)      | Unique workout ID            |
| user_id      | INT (FK)      | Linked to Users              |
| plan         | JSON          | AI-generated workout plan    |
| completed_on | DATE          | Date completed               |
| calories_burned | INT        | Optional tracking            |


### **Ecommerce_Products**
| Field       | Type          | Description                   |
|------------ |-------------- |------------------------------ |
| product_id  | INT (PK)      | Product identifier           |
| name        | VARCHAR       | Product name                 |
| category    | VARCHAR       | Apparel, Equipment, etc.     |
| price       | FLOAT         | Product price                |
| image_url   | VARCHAR       | Product image                |
| stock       | INT           | Available stock              |
| description | TEXT          | Product details              |

### **Orders**
| Field         | Type                     | Description                  |
|-------------- |------------------------  |----------------------------- |
| order_id       | INT (PK)                | Order identifier             |
| user_id        | INT (FK)                | Linked to Users             |
| product_id     | INT (FK)                | Purchased product           |
| quantity       | INT                     | Units bought                |
| total_price    | FLOAT                   | Total amount                |
| payment_status | ENUM('pending','paid','failed') | Payment status |
| order_date     | DATE                    | Timestamp                   |

---

## 💻 Tech Stack 
**Frontend:** React.js , Recharts/Chart.js for graph tracking of each user login 
**Backend:** Node.js + Express.js, RESTful APIs, JWT authentication/ OAuth  
**Database:** MySQL
**AI Integration**
**Payment Gateway:** Stripe / Razorpay  
**Hosting / Deployment:** Vercel

---

## 🔄 Workflow
1. Member signs up → enters fitness stats and goals.
2. AI Trainer generates a personalized workout plan.
3. Member completes daily workout → marks it as complete → streak & level updated.
4. AI Trainer provides feedback on performance.
5. Member views charts of progress and achievements.    
6. Member visits store → purchases items → completes secure payment.
7. Member submits platform feedback → stored in User_Feedback table.
8. System checks daily for missed workouts → triggers dynamic notifications / streak alerts (no separate table required).

9. Repeat daily → maintain streaks, level up, interact with AI Trainer.
---

## 🎯 Expected Outcomes
- Fully functional full-stack fitness web app with **AI-driven workouts** and **feedback system**.  
- Modification of workouts via streaks and level-ups to encourage consistency.  
- Working e-commerce store with **payment integration**.  
- Clean, responsive UI/UX for all devices.  
- Deployed system accessible online via GitHub links.  

---
## Thinking on this...
## 🔹 Optional Enhancements(Future Plan)
- Membership planning and subscription system.
- Optional Admin/Trainer Panel – Manage products, view feedback, send custom notifications.
- Some more add ons and enhanced features on our website to make it user-friendly.

## Note : There may be some changes in our website like tables and relationships may vary slightly as we are discussing to how we can make it in a more better way.


