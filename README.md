# Inquiry Kanban Board

This is a responsive Inquiry Kanban Board application that includes functionalities for managing inquiries through different phases, filtering inquiries, and viewing detailed inquiry information.

## Technologies Used:

- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand (State Management)
- Backend: Next.js API Routes
- Database: Mock Data (No database)
- Drag-and-Drop: React DnD

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- **Kanban Board Management**

  - Four distinct phases: New, Sent to Hotels, Offers Received, Completed
  - Drag and drop inquiries between columns to update their status
  - Real-time status updates with API integration

- **Advanced Filtering**

  - Client name search with debounced input (500ms delay)
  - Date range filtering (From/To dates)
  - Minimum value filtering (CHF)
  - Clear all filters functionality

- **Inquiry Details**

  - Click on any inquiry card to view full details in a modal
  - Update inquiry phase directly from the modal


## Overview
#### Inquiry Kanban Board
<img width="1680" height="940" alt="Screenshot 2026-01-11 at 5 08 06 PM" src="https://github.com/user-attachments/assets/eaa01300-8883-4f36-b318-7eef8e8c5689" />

#### Drag-and-Drop
<img width="1680" height="939" alt="Screenshot 2026-01-11 at 5 24 28 PM" src="https://github.com/user-attachments/assets/8d687427-17b1-44aa-8833-88bd890de069" />

#### Modals
<img width="1680" height="940" alt="Screenshot 2026-01-11 at 5 09 49 PM" src="https://github.com/user-attachments/assets/0eae8b31-6c63-418e-8cd8-965ac197bfc0" />
<img width="643" height="244" alt="Screenshot 2026-01-11 at 5 10 13 PM" src="https://github.com/user-attachments/assets/034ef544-91bd-4155-a432-acf1025f22d6" />

#### Filtering
<img width="1680" height="938" alt="Screenshot 2026-01-11 at 5 09 31 PM" src="https://github.com/user-attachments/assets/f1e85f9e-0747-4344-8971-4712df94e110" />
