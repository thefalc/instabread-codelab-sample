# Data Privacy and Payments with an API

## Introduction
### Secure PII collection and money movement with Skyflow and Moov

This codelab is an introduction to creating a modern privacy-preserving application that supports secure PII data collection and payments. You’ll use Skyflow’s Data Privacy Vault available as an API and Moov’s payment APIs to create a gig worker app sign up flow and payment experience.

### What you’ll build

Instabread is a fictitious company that supports a marketplace for bread enthusiasts (Instabread clients) to shop for and order bread on-demand from the comfort of their homes. Instabread shoppers receive notifications about orders on their mobile device and travel to the stores to pick up and deliver the bread to the Instabread client. Shoppers are paid based on successful delivery of tasty tasty bread goods.

In this codelab, you’re going to extend the shopper sign up experience to safely and securely store PII data within a Skyflow Vault and transfer money from Instabread to a shopper through Moov.

<p align="center">
  <img src="/images/instabread-overview.png" />
</p>

### What you'll learn
* How to use Skyflow Studio to create a data privacy vault.
* How to store and manage PII in a vault with the Skyflow SDKs.
* How to configure a Skyflow Connection between your vault and your Moov account.
* How to use the Moov APIs securely through Skyflow.

### What you’ll need
* A Skyflow trial environment account. If you don’t have one, you can register for one on the [Try Skyflow](https://skyflow.com/try-skyflow) page.
* A Moov account. If you don’t have one, [sign up here](https://dashboard.moov.io/signup).
* A computer with [ngrok](https://ngrok.com/) and [Node.js version 10](https://nodejs.org/en/) or above installed.

> **Note:**
> ngrok is needed to run the project locally. The URL for Instabread must be saved within your Moov developer account in order for the client-side Moov APIs to work.

## Getting set up

### Get the starter code
In a terminal, clone the Instabread sample code to your project’s working directory with the following command:

```shell
git clone https://github.com/thefalc/instabread-codelab-sample
```

### Understand the starter code

Let’s take a look at the starter code structure that you’ll work with throughout the codelab. The project uses the Next.js framework, but even if you’ve never worked with this framework before, you should be able to complete the lab.

Navigate to the [**/baseline**](/baseline) directory within the repository and view its content. It has the following elements:

* **components**: this directory has reusable frontend components
* **pages**: this directory has the individual pages used in the Instabread shopper sign up application. [**index.js**](/baseline/pages/index.js) is where the app begins
* **pages/api**: this directory has the backend Node.js code
* **public**: this directory has frontend static references like CSS and images
* **util**: this has utility files for session management
* **package.json, package-lock.json**: configuration files for dependencies and running the app

### Run the application

1. In a terminal, navigate to your project directory and open the **/baseline** folder. Run the app with the following command:

```shell
npm install
npm run dev
```

1. From your browser, navigate to **http://localhost:3000** and you should see the initial Instabread shopper app page.
1. Click on the **Sign Up** button to view the account creation form. After you configure your Skyflow vault, you'll use the Skyflow client-side SDK to enable the form.

## Skyflow Studio and API credentials

Skyflow Studio is a web-based app for creating and managing vaults. You can also do all vault operations via APIs, but for this codelab you’ll use the Studio.

![Skyflow Studio](images/skyflow-studio-dashboard.png "Skyflow Studio")

### Create the Instabread vault

#### Prerequisites

Before you start,

* Log in to your Skyflow account

#### Create the Instabread vault

The Instrabread vault schema defines the tables, columns, and privacy and security options for secure storage of an Instabread shopper account.

1. In the Vault Dashboard, click **Create Vault > Upload Vault Schema**.
1. Drag the [**/data/vault_schema.json**](/data/vault_schema.json) file and click **Upload**.
1. In the schema view, click the pencil icon next to the default vault title and rename it as *YOUR NAME* Instabread. Click **Create Vault.**

![Edit vault name](images/skyflow-studio-edit-vault-name.png "Edit vault name")

#### Understand the schema

Once the vault is created, take a few minutes to explore the schema. There are three tables:
* **shoppers:** has columns representing an Instabread shopper account. This is similar to a traditional “users” or “customers” table in a database
* **shoppers_stores:** has columns representing the locations an Instrabread shopper is willing to travel to
* **shoppers_bank_information:** has columns representing the bank account information for the Instagread shoppers

> **Note:**
> When defining the schema for a vault, the Skyflow platform supports both basic data types (like you’d find in any database) and pre-defined Skyflow Data Types, which encapsulate common PII elements defined for your convenience. This includes data types like social security number, email, name, address, and credit card. Most of the columns in this schema use the Skyflow Data Types.

In the shoppers table, click any column header's down arrow and select **View column**.

<p align="center">
  <img src="images/skyflow-email-column.png" width="500" />
</p>

Within the column settings, there are four tabs: **General**, **Redaction**, **Encrypted Operations**, and **Tokenization**.

##### General

The General tab has basic details about the column, including the name, description, base data type, whether the values should be unique, and a regular expression for validating new data as it’s inserted into the vault. In the preceding email example, the column uses a regular expression to automatically validate that new data looks like an email on insertion.

##### Redaction

Redaction is a privacy preservation technique that partially or fully obscures data. In the email column example, the data is partially obscured, by default, using masking. An email like john.doe@gmail.com displays as j******e@gmail.com.

You can change the masking scheme as needed, but the Skyflow Data Types pre-configure this value for PII where masking is often standard.

<p align="center">
  <img src="images/skyflow-redaction-tab.png" width="500" />
</p>

##### Encrypted Operations

All data within the vault is encrypted at rest and during transit. However, through a technique called [polymorphic encryption](https://www.skyflow.com/post/a-look-at-polymorphic-encryption-the-new-paradigm-of-data-privacy), many operations perform over fully encrypted data. Continuing with  the email column example, you perform exact match operations without ever decrypting the data. Polymorphic encryption supports numeric fields, comparison and aggregation operations, like average and sum.

<p align="center">
  <img src="images/skyflow-encryption-tab.png" width="500" />
</p>

##### Tokenization

[Tokenization](https://www.skyflow.com/post/demystifying-tokenization-what-every-engineer-should-know) is a privacy-preserving technique that substitutes sensitive data with non-sensitive tokens. Tokens have no exploitable value and are safely stored within your database and other downstream services. The token is only exchanged for the original value by privileged services.

For the email column, the default configuration uses a **Format Preserving Deterministic Token**. This means the token still looks like an email but isn’t the actual email.

<p align="center">
  <img src="images/skyflow-tokenization-tab.png" width="500" />
</p>

### Create API credentials

Before jumping into the code, you need to create a role, policy, and service account to use API authentication.

1. From the vault schema view of your vault, click the gear icon next to the name of your vault and then click **Edit Settings**.

<p align="center">
  <img src="images/edit-settings-view.png" width="300" />
</p>

1. Click **Roles > Add New Role**.
1. Enter **Client SDK** for Name, enter a Description, then click **Create**.
1. Click **Attach Policies**and replace the placeholder content with the following policies:

```
ALLOW CREATE ON *.*
ALLOW TOKENIZATION
```
1. Click **Create**, enter **Client SDK** for the policy name. Click **Save**.
1. Select the **Enable** option, then close the window.
1. Click **Service Accounts > New Service Account**.
1. Enter *Your Name* - Client SDK" and choose **Client SDK** for Roles. Click **Create**.
1. After completing your API configuration, your browser downloads a`credentials.json` file containing your service account key. Store this file in a secure and accessible location. You'll use it exclusively to provide access tokens for API calls from the client-side SDK.

> **Tip:**
> When creating roles and policies and granting access to your vault, keep the following best practices in mind:
> * Differentiate between user and app accounts.
> * Ensure your service accounts and user permissions follow the principle of least privilege. In other words, give the lowest privileges possible to grant access only for necessary permissions.
> * Create separate service accounts for administration and app runtime.

#### Configure the API credentials

The source code for the Instabread app assumes the service account key is available in an environment variable called **SERVICE_ACCCOUNT_KEY**. Before extending the app, you need to create this environment variable.

1. Open a terminal and enter the following command:

    ```shell
    export SERVICE_ACCOUNT_KEY='CONTENTS FROM credentials.json'
    ```

> **Note:**
> In a real deployment, the best practice is to store your service account key with a secrets manager and retrieve it from a service with privileged access to the secrets store.

## Account creation

In this section, you'll' collect the Instabread shopper account information and send it securely to your vault using the Skyflow client-side SDK.

### Understanding the code

1. Open the [**components/Layout.js**](/baseline/components/Layout.js) file. Every client-side page uses this file for creating the base HTML for the page layout.
1. At the top of the file, there’s a function called **getBearerToken**. This function calls the server endpoint, **api/skyflow-token**, which uses your service account key to generate an access token. Your client-side code uses the token to call the APIs for your vault. You don’t need to make any updates or modifications to this file.
1. Open the [**pages/sign-up.js**](/baseline/pages/sign-up.js) file. This file is the frontend for the shopper account creation page.
1. Move down to the function named **signUpHandler**. When you click the **Create account** button, it invokes this function.

### Configure the Skyflow Client

Before, when the **signUpHandler** (or sign-up button) was invoked, a message displayed stating the feature didn't exist. In the next section, you'll update the [**pages/sign-up.js**](/baseline/pages/sign-up.js) file to send the collected data to your vault.

1. Remove the line beginning with **alert**.
1. Copy and paste the following code into the **signUpHandler** file, below the **event.preventDefault()** line.

```javascript
const skyflowClient = Skyflow.init({
  vaultID: process.env.vaultID,
  vaultURL: process.env.vaultURL,
  getBearerToken: getBearerToken,
  options: {
    env: Skyflow.Env.DEV
  }
 });
```

This code block initializes the **skyflowClient** object. The first two parameters are expect your **vaultID** and **vaultURL** values. You need to update the environment variables with your vault details.

> **Tip:**
> You can find the vault ID and vault URL values in the Edit vault details section of your Instabread vault.

1. Navigate to the **/baseline** directory and open the [**next.config.js**](/baseline/next.config.js) file.

```javascript
module.exports = {
 env: {
   vaultID: '<VAULT_ID>',
   vaultURL: '<VAULT_URL>',
 },
}
```

1. Replace **vaultID** and **vaultURL** with the values for your vault.
1. Save the file.

### Insert data into the vault

Navigate to the **/pages** directory and open [**pages/sign-up.js**](/baseline/pages/sign-up.js). After the **skyflowClient** initialization, copy and paste in the code below.

```javascript
let response = await skyflowClient.insert({
  records: [
    {
      fields: {
        first_name: this.state.fname,
        last_name: this.state.lname,
        email: this.state.email,
        zip_code: this.state.zipcode,
        phone_number: this.state.phone,
      },
      table: 'shoppers'
     }
   ]
 }, { tokens: true });
```

The state object has the form field values entered by the shopper. This code uses the Skyflow client to insert a single record into the shoppers table with the values collected from the form.

Because the parameter `{ tokens: true }` passes the call as an option to the insert function, tokenized values returned by the API are part of the response object.

Before testing the code, copy the line below and paste it beneath the insert call. Once you store the record, this line invokes an alert with the JSON string returned from the API.

```javascript
alert(JSON.stringify(response));
```

### Testing the account sign up

1. From the same terminal that you exported the **SERVICE_ACCOUNT_KEY** variable, enter the following command:
```shell
npm run dev
```
1. Navigate to **http://localhost:3000** in your browser.
1. Click the **Sign Up** button.
1. FComplete all fields in the form. There’s currently no client-side form validation, so make sure you fill in everything.
1. Click **Create Account**. Once the call is complete, an alert message displays, like the example shown below, containing the JSON response from the API.

<p align="center">
  <img src="images/instabread-json-alert.png" width="300" />
</p>

1. Return to the vault schema page in Skyflow Studio to view the newly created record. You may need to refresh the table if you were already in the schema view.

### Saving the tokenized data

The last thing you need to do is store the newly created **skyflow_id** and token data on the server. These values are required for later use in this lab.

Open the [**pages/sign-up.js**](/baseline/pages/sign-up.js) file and locate the **signUpHandler** function. Find the line starting with **alert** and replace it with the following code:

```javascript
// Call sign-up passing in record object.
const res = await fetch('/api/sign-up', {
  body: JSON.stringify(response.records[0]),
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST'
});

const result = await res.json();
if(result.ok === true) {
  window.location.href = '/about-instabread';
}
```

The fetch call passes the tokenized data to the server endpoint `api/sign-up`.

Navigate to the [**pages/api/sign-up.js**](/baseline/pages/api/sign-up.js) file and inspect the **handler**. This code receives the data and stores the **skyflow_id** and tokenized data to a user session variable.

> **Note:**
> In a real app, you would likely store the **skyflow_id** and tokens in your app database and downstream services to reference and use later. For simplicity of this lab, you’ll rely on session memory to play this role.

Try testing the sign up form again, making sure to complete all fields. This time, the shopper record saves to the vault, and a new page displays, explaining the Instabread experience.

## Grocery store selection

In this section, you'll collect information about which stores the shopper is willing to travel to for bread pickups.

### Understanding the code

1. Open the [**/pages/choose-stores.js**](/baseline/pages/choose-stores.js) file. It has the frontend code for displaying the store selection page.
1. Locate the **initStores** function. It calls the backend endpoint, **/api/list-stores** to read the list of possible stores.
1. Open [**pages/api/list-stores.js**](/baseline/pages/api/list-stores.js). The handler returns a static list of stores. In an actual app, the location of the shopper account determines which stores are available and likely pulled from an application database.
1. Return to the [**/pages/choose-stores.js**](/baseline/pages/choose-stores.js) file
and locate the **chooseStoreHandler** function. Clicking the **Continue** button calls this function. It takes the selected store IDs and maps them to full store details in the static store list, creating a sublist of stores. The **storeMapping** object creates a list of records that write to the **shoppers_stores** vault table.

### Inserting data into the vault

1. In the **chooseStoreHandler** function, remove the line beginning with **alert**.
1. Below the **for loop**, used to initialize the **storeMapping** object, initialize the **skyflowClient** with the following code and your vault values from earlier in the lab.

```javascript
const skyflowClient = Skyflow.init({
  vaultID: process.env.vaultID,
  vaultURL: process.env.vaultURL,
  getBearerToken: getBearerToken,
  options: {
    env: Skyflow.Env.DEV
  }
});
```

1. After initializing the **skyflowClient** object, insert the **storeMapping** records by adding the following lines below the client initialization:

```javascript
await skyflowClient.insert({ records: storeMapping });
window.location.href = '/banking-info';
```

The first line inserts the array of store mappings and the second line progresses the sign up screen to the banking collection screen.

### Test the result

1. From the same terminal that you exported the **SERVICE_ACCOUNT_KEY** variable, enter the following command:

```shell
npm run dev
```

1. Navigate to **http://localhost:3000** in your browser.
1. Click the **Sign Up** button.
1. Complete all fields in the form. There’s currently no client-side form validation, so make sure you fill in everything.
1. Click **Create Account**. A screen displays explaining how Instabread works.

> **Note:**
> If you don't see the screen below, there is a possible error in the client-side code that creates the account. Return to the [Saving the tokenized data](#saving-the-tokenized-data) section and verify the code for the sign up page.

<p align="center">
  <img src="images/how-instabread-works.png" width="500" />
</p>

1. Click **Continue**.
1. On the shopper requirements page, select the **I meet the requirements** option.
1. A page, like the screenshot below, displays.

<p align="center">
  <img src="images/choose-store.png" width="500" />
</p>

1. Select at least one option and click **Continue**.
1. Once the screen shows the direct deposit page, return to your Skyflow Studio vault schema view. Click the tab for the **shoppers_stores** table and one to four records displays, depending on how many stores you selected.

## Connecting Skyflow to Moov

Congratulations on making it this far!

You successfully collected PII from the Instabread shopper app in a secure way by sending it directly from the front-end to your data privacy vault. Your backend system is completely de-scoped from ever touching any of this sensitive data.

The next step is to collect banking information from the shopper, securely store it, passrelevant information to Moov, and then use Moov's money movement APIs to pay the shopper. Let’s begin by creating a Skyflow Connection to Moov.

### Create a Skyflow connection

Skyflow Connections is a gateway service that uses Skyflow’s underlying tokenization capabilities to securely connect to first party and third party services. This way, your infrastructure is never directly exposed to sensitive data, and you offload security and compliance requirements to Skyflow.

You need to create a connection between Skyflow and Moov so you can pass stored PII to Moov without exposing your backend to the plaintext values.

To create the connection:

1. Open Skyflow Studio to your vault’s schema view. Click the gear icon next to your vault name and click **Edit Settings**.
1. Click **Connections** > **Create Connection** > **Start from scratch**.
1. Name the connection **Moov**. (Optional) Enter a description.
1. Select **Outbound Connection** as the connection mode.
1. Set the Outbound Base URL to [https://api.moov.io](https://api.moov.io) and click **Continue**.

#### Configure the Moov account route

You need to create two routes, one for creating a Moov account and the other for passing bank account data to Moov. Let’s start with the Moov account.

To create an individual account with Moov directly, you make an API call:

```javascript
curl -X POST 'https://api.moov.io/accounts'
  -H 'Authorization: Bearer {token}' \
  -H "Content-Type: application/json" \
  -H "Origin: https://api.moov.io" \
  -data-raw '{
    "accountType": "individual",
    "profile": {
      "individual": {
        "name": {
           "firstName": "John",
           "lastName": "Doe",
        }
        "email": "john.doe@email.com",
      }
    },
    "capabilities": ["transfers"]
  }'
```

The Skyflow route has a similar structure, but instead of accepting the plaintext values for `firstName`, `lastName`, and `email`, the API expects Skyflow tokens.

1. Enter the route details including the name, description, path, method, and content type.
    1. **Name**: Moov Account Creation.
    1. **Path**: The path value is **/accounts**. When combined with the outbound base URL, it maps to Moov’s API with the full path URL, [https://api.moov.io/accounts](https://api.moov.io/accounts).
    1. **Method**: Skyflow connections support the following http methods: PUT, POST, PATCH, GET, DELETE. For the  account creation, use the **POST** method.
    1. **Content Type**: Skyflow connections support the following content types: JSON, XML, X_WWW_FORM_URLENCODED. Select the JSON content type.
1. Move down the page and complete the route mappings for the request body.

    The request body configures the specific fields in the request that Skyflow processes.  Currently, Skyflow supports two actions that can perform on a field: **Tokenization** and **Detokenization**.

    For this route, configure the connection to detokenize the request and extract the values associated with three fields: `profile.individual.name.firstName`, `profile.individual.name.lastName`, and `profile.individual.email`, like the example below.

<p align="center">
  <img src="images/skyflow-moov-account-route.png" width="500" />
</p>

1. Click **Continue > Create Connection**.

#### Authenticate the connection-level service account

To authenticate to a connection endpoint and invoke it, Skyflow requires you to create a dedicated service account with the **Connection Invoker** role assigned to it. This keeps the identity of the client consuming the connection endpoint different from the identity of the service account or the user creating the connection.

Additionally, this means the service account can only make requests to the specific connection. It has no direct read or write access to the data in the vault.

1. Enter a name and description for your new service account like *Your Name* Moov Service Account.
1. Click **Create service account**.
1. Your browser downloads a credentials.json file containing your service account key. Store this file in a secure and accessible location.
1. Click **Finish**.

#### Configure the Moov bank account route

Before you head back to the Instabread code, you need to create one more route to support bank account creation.

1. Select **Connections**, find the Moov connection and click **Edit**.

![Connections UI](images/skyflow-connections-ui.png "Connections UI")

1. Go to **Route** and click **+ Add route**.
1. Enter the route details including the name, description, path, method, and content type.
    1. **Name**: Enter “Moov Bank Account Creation”
    1. **Path**: `/accounts/{account_id}/bank-accounts`
    1. **Method**: Use the **POST** method.
    1. **Content Type**: Raw and JSON.
1. Scroll down the page and complete the route mappings for the **Request body**.
   For this route, configure the connection to detokenize the request and extract the values associated with three fields: **account.holderName**, **account.accountNumber**, and **account.routingNumber**, like the below example:

<p align="center">
  <img src="images/skyflow-bank-account-creation-route.png" width="500" />
</p>

1. Click **Save Route** and then click **Save**.

#### Configure your connections service account for Instabread

Your Skyflow connection and routes are all set. For Instabread to call the routes you configured, you need to create another environment variable for the connections-specific service account key credentials file you downloaded.

1. In the terminal where you’ve been running your Instabread application, stop the application if it is currently running.
1. Enter the command
    ```shell
    export CONNECTIONS_SERVICE_ACCOUNT_KEY='CONTENTS FROM CONNECTIONS-SPECIFIC credentials.json'
    ```
1. This service account key is used later to invoke the connection to Moov. It creates the shopper’s Moov account and registers their banking information.

### Configure Moov API

Before you complete the next coding step of the lab, you need to collect a few items from your Moov account and configure them to be used by the Instabread application.

#### ngrok

To configure your Moov developer API key, you need to give a domain to Moov where the API calls take place. To do this locally, you need to install ngrok.

Once installed, open a **new** terminal window and  start ngrok using the following command:

```shell
ngrok http 3000
```

If your Instabread app is running, go to the forwarding address shown by ngrok.

![ngrok example](images/ngrok-example.png "ngrok example")

### Moov developer account

1. Navigate to [https://dashboard.moov.io/signin](https://dashboard.moov.io/signin) and login to your Moov account.
1. In the navigation menu, select **Developers > New API Key**.
1. Enter a name for the API Key and paste in your ngrok https URL.
1. Click **Create API key**.
1. You’ll be shown a **Public key** and **Secret key**.
1. Copy the Public key and in the terminal running Instabread, stop the app and type **export MOOV_PUBLIC_KEY=&lt;COPIED PUBLIC KEY>**.
1. Copy the Secret key and in the same terminal, type **export MOOV_SECRET_KEY=&lt;COPIED SECRET KEY>**.
1. Copy your ngrok https URL and in the same terminal, type **export MOOV_DOMAIN=&lt;COPIED ngrok URL>**.

> **Note:**
> In a real deployment, your API keys should be stored with a secrets manager and retrieved from a service that has privileged access to the secrets store.

#### Moov business account details

The last thing you need is your Moov business account details. The details are used to transfer money from your business account to your gig workers.

1. In the Moov admin dashboard, click **Settings** in the navigation menu.
1. Select **Business details** copy the **Account ID**.
1. In your Instabread app terminal, create one more environment variable for this value by executing **export MOOV_BUSINESS_ACCOUNT_ID=&lt;COPIED MOOV BUSINESS ACCOUNT ID>**.

## Moov account and bank registration

In this section, you will collect the Instabread shopper bank information and use the Skyflow connection to create a Moov account for the shopper, and register their bank information.

### Creating the Moov account

The first step is to update the client-side code to call the server. You’ll use one of the routes configured in Skyflow Studio to create the Moov account and update the server-side code.

#### Understanding the code

1. Open the [**pages/banking-info.js**](/baseline/pages/banking-info.js) file. This file is the frontend for the shopper bank information entry.
2. Move down to a function called **bankingHandler**. This function is invoked when the **Continue** button is clicked.
3. Presently, when you invoke this function, it shows an alert to the user informing them that this feature doesn’t exist yet. You’ll update this function to send the collected data to your vault.

#### Using the route to create the Moov account

1. Remove the line starting with **alert**.
1. Copy the code below and paste it into the **bankingHandler** below the **event.preventDefault()** line.

```javascript
// Create the Moov account.
const result = await fetch('/api/moov-account-creation', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST'
});

const payload = await result.json();
let skyflowId = payload.skyflowId;

// Account was successfully created.
if(result.ok === true) {
  // TODO
}
```

The code is calling the endpoint **/api/moov-account-creation**, which does the heavy lifting for using the Skyflow connection API to create the Moov account.

1. Open [**pages/api/moov-account-creation.js**](/baseline/pages/api/moov-account-creation.js). This file contains the server-side code to create the Moov account using only the tokenized data. At the top of this file, you can see that the Moov SDK is initialized with the environment variables you configured before.
1. Move down to the line beginning with **const body = {**. This defines the body of the payload that passes to the route you configured. The **firstName**, **lastName**, and **email** use the tokens stored in the user session variable after a shopper registers their account.
1. The next two lines create authentication tokens for Moov and Skyflow. These are both needed to make the connections API call. The Skyflow token is used to authenticate your request to the connections API and the Moov token is used for Skyflow to call Moov on your behalf.
1. Find the line starting with **let connectionsRouteUrl**. You need to update this URL with the route you created earlier for Moov account creation.

#### Connection route URL

1. Go back to Skyflow Studio and from your vault’s schema view, click the gear icon next to your vault name and then click **Edit Settings**.
1. Click **Connections**. From the list, expand the connection you created earlier and find the route called Moov Account Creation.
1. Click **Sample request** and copy the **Path**. This is your route URL. Paste the path back in the [**pages/api/moov-account-creation.js**](/baseline/pages/api/moov-account-creation.js) as the value to the **connectionsRouteUrl** variable.

<p align="center">
  <img src="images/skyflow-create-acccount-route.png" width="500" />
</p>

#### Testing the result

1. From the same terminal that you exported your environment variables, enter the following command:

```shell
npm run dev
```
1. Navigate to **http://localhost:3000** in your browser.
1. Go through the various screens until you reach the **Set up direct deposit** page and click **Continue**.
1. Although the capability doesn’t exist yet, if you’ve done everything correctly, the Moov account for your shopper should exist. Log into the Moov admin dashboard. Under **Accounts**, you should see the shopper name and email listed.

### Creating the Moov bank account

Now that your shopper has a Moov account, you need to collect the shopper’s bank information, store it in the vault, and then use your other connection route to pass the bank information securely to Moov.

#### Understanding the code

1. Open the [**pages/banking-info.js**](/baseline/pages/banking-info.js) file and find the **bankingHandler** function again.
1. Find the **// TODO** inside the **bankingHandler** and replace it with the code below.

```javascript
const skyflowClient = Skyflow.init({
  vaultID: process.env.vaultID,
  vaultURL: process.env.vaultURL,
  getBearerToken: getBearerToken,
  options: {
    env: Skyflow.Env.DEV
  }
});

// Save bank information to the vault.
let response = await skyflowClient.insert({
  records: [
    {
      fields: {
        bank_account_number: this.state.accountNumber,
        bank_routing_number: this.state.routingNumber,
        shoppers_skyflow_id: skyflowId,
        account_holder_name: this.state.holderName
      },
      table: 'shoppers_bank_information'
     }
   ]
 }, { tokens: true });

// Create the Moov bank account.
const result = await fetch('/api/moov-bank-account-creation', {
  body: JSON.stringify(response.records[0]),
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST'
});

const payload = await result.json();
if(payload.ok === true) {
  window.location.href = '/congratulations';
}
```

1. Similar to the code you added for storing the shopper account information in the vault, this code is storing the banking information in the vault and receiving tokens back. The tokens are then posted to the **/api/moov-bank-account-creation** endpoint.
1. Open the file [**pages/api/moov-bank-account-creation.js**](/baseline/pages/api/moov-bank-account-creation.js). This handler accepts the tokens representing the banking information from the shopper and securely shares them with Moov via the second route you created earlier.
1. Move down to the line beginning with **let connectionsRouteUrl**. Update this URL to the Moov Bank Account Creation route URL. Make sure you replace the **{accountId}** portion in the URL with the **moovAccountId** constant similar to the following:

```javascript
let connectionsRouteUrl = `https://ebfc9bee4242.gateway.skyflowapis.com/v1/gateway/outboundRoutes/h3e5a644a8674b29a9bfcbdfbccf16fe/accounts/${moovAccountId}/bank-accounts`;
```

#### Testing the result

1. From the same terminal that you exported your environment variables, enter the following command:

```shell
npm run dev
```

1. Navigate to **http://localhost:3000** in your browser.
1. Go through the various screens until you reach the **Set up direct deposit** screen.
1. Fill in the **Holder name** with anything you wish.
1. For the **Routing number**, enter 322271627, which is Chase Bank’s routing number.
1. For the **Account number**, enter 0004321567000, which is a valid test bank account number for Moov.
1. Click **Continue**.
1. When the app successfully displays the Congratulations page, go to Skyflow Studio and check the **shoppers_bank_information** table. A new record is displayed. Additionally, if you look at the latest account in your Moov administrator dashboard, there is  a payment method listed under the account information.

![Moov payment information page](images/moov-account-payment-information.png "Moov payment information page")

## Pay your gig workers

Congratulations! You’re nearly done.

All you need to do now is make sure your shoppers get paid. The Instabread shopper app is set up to automatically owe the shopper $64.00 for completed deliveries. In this section, you’ll add the final piece of client-side code to securely issue a transaction to pay the shopper.

### Understanding the code

1. Open the [**pages/cashout.js**](/baseline/pages/cashout.js) file. This is the frontend code for confirming that a shopper wants to cashout the money they’ve earned.
1. Move down to the **cashOutHandler**. This function is called when you click on the **Cashout $64.00** button. It currently makes an API call to the **/api/cashout** endpoint.
1. Open the [**pages/api/cashout.js**](/baseline/pages/api/cashout.js) file. Presently, this handler function doesn’t do anything. We need to add the Moov API calls to carry out a money transfer. We use the Moov APIs instead of  Skyflow because no sensitive data is being exchanged.
1. Copy the code below and replace the **// TODO** line in the **handler** function.

```javascript
// Get the source payment method ID. The source is the Instabread business account.
const businessPaymentMethodId = await
  getPaymentMethodId(process.env.MOOV_BUSINESS_ACCOUNT_ID, 'ach-debit-fund');

// Get the destinatino payment method ID. The destination is the shopper's account.
const destinationPaymentMethodId = await getPaymentMethodId(req.session.moovAccountId,
     'ach-credit-standard');

// Set the scopes for a transfer.
await moov.generateToken([SCOPES.TRANSFERS_WRITE, SCOPES.BANK_ACCOUNTS_READ],
  req.session.moovAccountId);

const transfer = {
  source: { paymentMethodID: businessPaymentMethodId },
  destination: { paymentMethodID: destinationPaymentMethodId },
  amount: {
    value: 6400, // $64.00
    currency: 'USD'
  },
  description: 'instabread shopper fees'
};

// Execute the transfer from Instabread to the shopper.
await moov.transfers.create(transfer);
```

The code uses a helper function called **getPaymentMethodId**.It uses the Moov APIs to look up the payment method ID that makes the account transfer call. Once the two ID values are retrieved, the money transfer object is created and the transfer is invoked via the Moov Node SDK.

### Test the result

1. From the same terminal that you exported your environment variables, enter the following command:

```shell
npm run dev
```
1. Navigate to **http://localhost:3000** in your browser.
1. Go through the various screens until you reach the **Set up direct deposit** page.
    1. Fill in the **Holder name** with anything you wish.
    1. For the **Routing number**, enter 322271627, which is Chase Bank’s routing number.
    1. For the **Account number**, enter 0004321567000, which is a valid test bank account number for Moov.
1. Click **Continue**.
1. Click **Continue to my home screen**, **Cashout $64.00**, and finally **Cashout $64.00** on the **Instant checkout** screen. If everything works, a page displays with the message, "Transferring $64.00 to your bank account ending in 7000".

Go to the Moov admin dashboard to view your shopper’s account. Click the **Transfer** tab to view the transaction.

![Moov transfer page](images/moov-transfer-screen.png "Moov transfer page")

## Wrapping up

Congratulations on completing the data privacy and payments codelab!

You successfully created a gig worker sign-up and payment process that collects PII and ACH information and issues money movement transfers through Moov.

### What’s next?

* Currently, the cashout screens don’t display bank account information. Take a look at the [reading data from a vault](https://docs.skyflow.com/core-apis/#read-data-from-the-vault) guide to explore how you display just the last four digits of the bank account number in the cashout UI.
* The tokenized data is stored within the application session. Ideally, this would be stored in your application database. Try extending Instabread to integrate with an application database and even a data warehouse.

### Further reading

* Learn more about how to govern access to your vault with the [Data governance overview](https://docs.skyflow.com/data-governance-overview/) guide.
* Review additional information about connecting to third-party systems with the [Connections overview](https://docs.skyflow.com/connections-overview/) guide.
* Check out the [Security best practices checklist](https://docs.skyflow.com/security-best-practices-checklist/) to learn more about how to keep data secure.

### Reference docs

* Skyflow:
    * [Insert Record](https://docs.skyflow.com/record/#RecordService_InsertRecord)
* Moov:
    * [Create account](https://docs.moov.io/api/#operation/createAccount)
    * Create [bank account](https://docs.moov.io/api/#operation/bankAccount)
    * [Create a transfer](https://docs.moov.io/api/#operation/createTransfer)
    * [Get payment methods](https://docs.moov.io/api/#tag/Payment-methods)
