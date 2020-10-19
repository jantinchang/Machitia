# Running Application

We use `npm` not `yarn` as our package manager so all commands should be done via `npm` and not `yarn`

Before you start with `npm` though, be sure your `.env` variables are set correctly. 

If you have not changed the connection string in the `.env`, you should do so now.

### Starting Application

We need to execute a few commands before we can see our application up and running.

####  One Time Script

From the root of your node folder, execute the following shell script which is a file you can see in your windows folder.

```
./one-time.sh
```

#### Running Application Commands

Every time you open up your code editor you will need to execute these series of scripts. You can do this from the command line or as shown in the videos view the "NPM Scripts" tab.

##### Install

You will have to run this command the first time you clone a repo or after you refresh your local code with remote code. 


```
npm install 
```

##### Compile (Transpile)

After that is completed you will execute the following command which will keep the bash window open and busy. So after this is complete you will have to open a new terminal window to continue.

```bash
npm run compile
```

##### Start Application 

The following command with start the application without nodemon. A debug session will be available but it will not automatically connect to your debugger. 

You would use this command to quick the application up and running when you do not want to fuss with the debugger. 

```bash
npm start
```

##### Starting with Nodemon

Launch the "Debug Server with nodemon" to both start the application launch the debugger session.


