# Wordsmith
<b>Wordsmith</b> is an experimental ChatGPT Web Add-in for Microsoft Word 

This add-in is meant just for fun and learning. Do not use it for production. It takes advantage of an unofficial ChatGPT API it only operates in "Developer mode" and could break or stop working at any time. You should be reasonably comfortable with terminal, as setup is a bit fussy and the server has to often be restarted given the current ChatGPT interest.

## Features
The add-in does 3 major things to help with your writing

* `Polish` your writing
* `Extract` key facts from your writing and formate into bullet items
* `Translate` foreign language into English
*  `Reboot` service is to reboot REST API server and reconnect to ChatGPT if connection is lost.

[Watch Demo](https://youtu.be/mExg3o3p_fQ)

![image](https://user-images.githubusercontent.com/88595845/210734401-409f3387-7f03-42b5-ae94-288027c4ee76.png)

## Getting Started
### Prerequisites

* Create an OpenAI account
* Make sure you have Node 18.0+ installed. 
* Visual Studio 2022 free community version works fine. You can also run from VS code but Visual Studio is much easier.
* Microsoft Word 2016 and above. In theory this add-in can run in iOS as well but I haven't tested.

### Download and Build

* Clone this repository into directory of your choice. 
```git 
git clone https://github.com/xtremehpx/Wordsmith.git
```
There are two projects in this repo, the first one, `WordsmithGpt` is a nodejs project that hosts a REST API server to enable communication to ChatGPT server and the second, `WordsmithOffice`, is the Add-in project. The reason for two project is due to Microsoft Web Add-in project lacks the support for "real" nodejs application. If you know how to create `real` nodejs app for Office Add-in, drop me a message.

* Install necessary dependencies for `WordsmithGpt` by calling
```node
 npm install
 ```

Create a .env file, and add your OpenAI login credentials OPENAI_EMAIL="..." and OPENAI_PASSWORD="..."

You should also config your favour prompt in the .evn file.

to run this, simply call the following:
```node
 npm start
 ```
* Build and run `WordsmithOffice` directly from Visual Studio 2022.


