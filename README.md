# CodeSnipIt

a web application that allows developers to save, categorize, and manage their code snippets in one place. Whether you're working on multiple projects or learning new programming languages, this tool helps you keep track of useful code snippets and easily access them when needed.

## Table of Contents

- [Distinctiveness and Complexity](#distinctiveness-and-complexity)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)

## Distinctiveness and Complexity

CodeSnipIt is distinct and complex due to several key aspects:

1. **Advanced Categorization and Tagging**:

   - The application allows users to categorize snippets by language.

2. **Syntax Highlighting**:

   - Implementing syntax highlighting for 21 different programming languages using the React Syntax Highlighter library involves handling various language grammars.

3. **User Authentication and Authorization**:

   - The application uses Django REST Framework and Django Simple JWT for secure user authentication and role-based authorization, ensuring that only authorized users can access certain features.
   - Cookies containing authentication tokens are flagged as HttpOnly. This configuration prevents the cookies from being accessed via client-side scripts, thereby providing protection against Cross-Site Scripting (XSS) attacks.

4. **Persistent Login**:

   - Persistent login is implemented, allowing users to remain logged in for up to 30 days without needing to reauthenticate. This is achieved using refresh tokens, which are configured to have a 30-day expiration period.

5. **Responsive and Intuitive UI/UX**:

   - The frontend is built with React and Chakra UI, providing a highly responsive and user-friendly interface. This includes features like light/dark mode, which enhances usability.

6. **State Management**:

   - The application uses Zustand for efficient state management in React, which is more lightweight and flexible compared to other state management libraries like Redux.

7. **Asynchronous Operations**:

   - The application employs React Query for handling server state and asynchronous operations, providing features like caching, synchronization, and background updates.

8. **Robust API Integration**:

   - A well-structured API built with Django REST Framework allows for seamless integration with the frontend (in this case Vite + React + Typescript) and supports future scalability, such as mobile app integration.

9. **Form Validations**:
   - Forms are validated using React Hook Form combined with ZodResolver for schema-based validation. This ensures that form inputs are validated against predefined schemas, providing robust and consistent validation logic.
   - Custom validations are also implemented to handle dynamic validation scenarios and to enhance the overall user experience.

These features collectively make CodeSnipIt a robust and versatile tool for developers, distinguishing it from simpler code snippet managers. The complexity arises from integrating multiple technologies and ensuring they work together seamlessly to provide a smooth user experience.

## Features

- Save code snippets with titles.
- Categorize snippets by language.
- Scroll to top button.
- Syntax highlighting for 21 programming languages.
- User authentication and authorization.
- Light / dark mode depending on your preference.
- In the account settings, you can change your name and your password.
- Responsive design for mobile and desktop use.

## Screenshots

- **_Login Page_**

  | Desktop                               | Mobile (Hero)                          | Mobile (Login Form)                |
  | ------------------------------------- | -------------------------------------- | ---------------------------------- |
  | ![login](/screenshots/login_desk.png) | ![hero](/screenshots/login_hero_m.png) | ![login](/screenshots/login_m.png) |

- **_Registration Page_**

  | Desktop                                     | Mobile                                          |
  | ------------------------------------------- | ----------------------------------------------- |
  | ![register](/screenshots/register_desk.png) | ![register_mobile](/screenshots/reg_mobile.png) |

- **_Home Page_**

  | Desktop                                     | Mobile                                               |
  | ------------------------------------------- | ---------------------------------------------------- |
  | ![homepage](/screenshots/homepage_desk.png) | ![homepage_mobile](/screenshots/homepage_mobile.png) |

- **_Filtered by language_**

  | Desktop                                     | Mobile                                               |
  | ------------------------------------------- | ---------------------------------------------------- |
  | ![filter](/screenshots/filter_language.png) | ![filter_mobile](/screenshots/filter_language_m.png) |

- **_Snippet Page_**

  | Desktop                                             | Mobile                                                  |
  | --------------------------------------------------- | ------------------------------------------------------- |
  | ![snippet_page](/screenshots/snippet_page_desk.png) | ![snippet_page_mobile](/screenshots/snippet_page_m.png) |

- **_Edit Snippet_**

  | Desktop                        | Mobile                                  |
  | ------------------------------ | --------------------------------------- |
  | ![edit](/screenshots/edit.png) | ![edit_mobile](/screenshots/edit_m.png) |

- **_Add Snippet Page_**

  | Desktop                                         | Mobile                                                   |
  | ----------------------------------------------- | -------------------------------------------------------- |
  | ![addsnippet_page](/screenshots/addsnippet.png) | ![addsnippet_page_mobile](/screenshots/addsnippet_m.png) |

- **_Account Settings Page_**

  | Desktop                                               | Mobile                                                         |
  | ----------------------------------------------------- | -------------------------------------------------------------- |
  | ![acct_settings_page](/screenshots/acct_settings.png) | ![acct_settings_page_mobile](/screenshots/acct_settings_m.png) |

- **_Account Name Change_**

  | Desktop                                      | Mobile                                           |
  | -------------------------------------------- | ------------------------------------------------ |
  | ![name_change](/screenshots/change_name.png) | ![name_change_m](/screenshots/change_name_m.png) |

- **_Account Password Change_**

  | Desktop                                          | Mobile                                               |
  | ------------------------------------------------ | ---------------------------------------------------- |
  | ![password_change](/screenshots/change_pass.png) | ![password_change_m](/screenshots/change_pass_m.png) |

## Installation

In your CLI, execute the following:

1. Go to project directory `cd /path/to/your/capstone`
2. Create virtual environment `python -m venv venv`
3. Activate virtual environtment:
   - for windows: `venv/Scripts/activate` ;
   - for Unix/MacOS: `source venv/bin/activate`
4. Django directory `cd capstone`
5. Download all requirements `pip install -r requirements.txt`
6. Makemigrations `python manage.py makemigrations backend`
7. Migrate `python manage.py migrate`
8. Load initial language data to Language model `python manage.py loaddata languages`
9. Run Django server `python manage.py runserver`
10. React directory `cd frontend`
11. Download all modules `npm install`
12. Run React server `npm run dev`

## Usage

1. **Register an account or log in:**

   - Create a new account or log in with your existing credentials.

2. **Add a new snippet:**

   - Click on the "Add Snippet" button under the appropriate language and fill in the title and code.
   - Save

3. **Manage snippets:**

   - View your snippets in the homepage.
   - Edit or delete snippets as needed.
   - Filter snippets by language.

4. **Settings:**
   - **Color mode**
     - choose either light or dark mode
   - **Account Settings**
     - Change name
     - Change password

## Acknowledgements

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Django Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/)
- [django-cors-headers](https://pypi.org/project/django-cors-headers/)
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Hook Form](https://react-hook-form.com/)
- [React Syntax Highlighter](https://www.npmjs.com/package/react-syntax-highlighter)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Zod](https://zod.dev/)
- [Axios Http](https://axios-http.com/docs/intro)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Chakra UI](https://chakra-ui.com/)
