# oneEdo CMS Repository

This repository hosts the CMS software used to feed content for Oneedo.

## Setting Up the Project

1. **Clone the Repository**

   ```bash
   git clone git@github.com:Edo-DiDA/oneEdo-CMS.git
   cd oneEdo-CMS
   ```

2. **Install Dependencies**
   Install the required Node.js dependencies:

   ```bash
   npm install
   ```

   or, if using Yarn:

   ```bash
   yarn install
   ```

3. **Create Environment Variables**
   Create a `.env` file in the root directory and configure the following variables:

   ```env
   NODE_ENV=development
   DATABASE_CLIENT=your_database_client (e.g., postgres, mysql, sqlite)
   DATABASE_HOST=your_database_host
   DATABASE_PORT=your_database_port
   DATABASE_NAME=your_database_name
   DATABASE_USERNAME=your_database_username
   DATABASE_PASSWORD=your_database_password
   DATABASE_SSL=your_database_ssl (true or false)
   HOST=your_application_host (e.g., 0.0.0.0)
   PORT=your_application_port (e.g., 1337)
   APP_KEYS=your_application_keys (comma-separated, e.g., key1,key2,key3,key4)
   API_TOKEN_SALT=your_api_token_salt
   ADMIN_JWT_SECRET=your_admin_jwt_secret
   TRANSFER_TOKEN_SALT=your_transfer_token_salt
   JWT_SECRET=your_jwt_secret
   ```

   Replace placeholders (`your_*`) with your actual configuration values.

## Running the Application

1. **Start the Development Server**

   ```bash
   npm run develop
   ```

   or, if using Yarn:

   ```bash
   yarn develop
   ```

   This will start the application in development mode.

2. **Start the Production Server**
   After building the project, start the production server:

   ```bash
   npm run start
   ```

   or, if using Yarn:

   ```bash
   yarn start
   ```

## Notes

- Keep the `.env` file secure and do not commit it to version control.
- Regularly update dependencies to ensure compatibility and security.
- Refer to the [Strapi Documentation](https://docs.strapi.io/) for additional help and advanced configurations.

