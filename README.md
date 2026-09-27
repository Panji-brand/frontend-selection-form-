# Front End Registration Form

A responsive registration form developed as a Front End Web Development selection project.

## Overview

This project is a single-page registration form designed to demonstrate basic Front End Web Development skills using Next.js, React, TypeScript, and Tailwind CSS.

The form allows users to enter their personal information, select a preferred division, provide their motivation, and submit their registration.

## Features

- Responsive registration form
- Personal information form
- Division selection
- Motivation textarea
- Character counter
- Custom form validation
- Error messages for invalid input
- Submit loading state
- Registration success state
- Submit another response functionality

## Tech Stack

- **Next.js** – React framework for building the web application
- **React** – Used to manage components and form states
- **TypeScript** – Provides type safety
- **Tailwind CSS** – Used for styling and responsive layout

## Form Validation

The form includes custom validation for:

- Full Name
  - Required
  - Minimum 3 characters
- NRP
  - Required
  - Must consist of exactly 10 digits
- Phone Number
  - Required
  - Must start with `08`
  - Must contain 10–13 digits
- Email
  - Required
  - Must use a valid email format
- Division
  - Required
  - User must select a division
- Motivation
  - Required
  - Minimum 20 characters
  - Maximum 500 characters
- Confirmation
  - User must confirm that the submitted information is correct

## User Flow

The form follows a simple registration flow:

1. User opens the registration form.
2. User fills in the required information.
3. The form validates the submitted data.
4. If the data is invalid, an error message is displayed.
5. If the data is valid, the form displays a submitting state.
6. After submission, a registration success screen is displayed.
7. User can choose to submit another response.

## Project Structure

frontend-selection-form/

├── app/
│   ├── page.tsx
│   └── ...
├── public/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/Panji-brand/frontend-selection-form-.git
```
### 2. Navigate to the project directory

```
cd frontend-selection-form-
```

### 3. Install dependencies

```
npm install
```

### 4. Run the development server

```
npm run dev
```

### 5. Open the application
Open the following address in your browser:
```
http://localhost:3000
```

### extra info
Screenshots

The project was tested through several states:

1. Initial Form
   The initial state of the registration form before any information is entered.

2. Form Validation
   The form displays validation messages when the submitted information does not meet the required criteria.

3. Submitting State
   The submit button changes to Submitting... while the form is being processed.

4. Registration Success
   After valid information is submitted, the application displays a registration success message.
