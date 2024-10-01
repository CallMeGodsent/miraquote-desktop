# Miraquote Desktop

**Miraquote Desktop** is an Electron-based desktop application for the **Miraquote api**. This README will walk you through the steps to set up and run the project on your local machine. Perfect for beginners!

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Running the app](#3-running-the-app)
- [Development Workflow](#development-workflow)
- [Building the App](#building-the-app)
- [Contributing](#contributing)
- [License](#license)

---

## Prerequisites

Before setting up the project, ensure you have the following software installed on your machine:

1. **Node.js** (v14 or above): [Download Node.js](https://nodejs.org/en/)
2. **Git**: [Download Git](https://git-scm.com/downloads)

To check if they are installed, run these commands in your terminal:
```bash
node -v
git --version
```

If these commands return version numbers, you're good to go!

---

## Getting Started

Follow these steps to set up the project.

### 1. Clone the repository

Open your terminal or command prompt and clone the repository by running:
```bash
git clone https://github.com/CallMeGodsent/miraquote-desktop.git
```

Navigate into the project directory:
```bash
cd miraquote-desktop
```

### 2. Install dependencies

Once you’re inside the project directory, install the necessary dependencies using **npm** (Node Package Manager):
```bash
npm install
```

This command will download and install everything your project needs.

### 3. Running the app

After the dependencies are installed, you can launch the app by running:
```bash
npm start
```

This will start the Electron app and open it in a new window.

If you are following this step, please avoid the **release section of this project**
---

## Development Workflow

While developing the app, you'll mostly be working with JavaScript, HTML, and CSS files.

- **Hot reloading** is not available by default in Electron, so each time you make a change, restart the app:
  ```bash
  npm start
  ```

---

## Building the App

To package the app for distribution (create an executable version), run the following command:
```bash
npm run build
```

This will package the app for your current operating system (Windows, macOS, or Linux). You’ll find the generated files in the `dist` or `build` directory.

While this never worked for us for unknown reasons, we have put together in our doc how to get it done. Checkit out and dont miss out!

https://quotes.moragek.com/docs

---

## Contributing

We welcome contributions to improve the app! If you would like to contribute, follow these steps:

1. **Fork the repo**
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Open a pull request on GitHub

Please don't forget to check out the doc in Electron section in other to not miss anything important

---

## License

This project is licensed under the MIT License.

---

That's it! You should now have the app running on your machine 🎉. Feel free to reach out if you face any issues, and happy coding! 😄

miraquotes@miragek.com

