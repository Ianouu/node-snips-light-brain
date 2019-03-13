# What is a smart light without brain ? :neutral_face: :bulb:
Node server to interact with yeelight. Provide API and web ui management.

## Installation
Run the commands.
> git clone https://github.com/Ianouu/node-snips-light-brain.git

> cd node-snips-light-brain

> npm install


## Configuration
The server use http-auth to use authentification on routes. Therefore, you will need a file called creds.htpasswd on your lib folder. To get the file :\
Install if you don't have the tools.
> sudo npm install -g htpasswd

Then create your file with the following command.
> htpasswd -bc ./lib/creds.htpasswd  user_name password


## Dev TODO
- [ ] Try connection to loaded ip on db, when start the server.
- [ ] Show connections on/off on light list
- [ ] Page to show the API
- [ ] Integrate a db reader
- [ ] Add functionalities, turn all, turn on at ...
