

// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import * as vscode from 'vscode';




var request = require('request');

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: vscode.ExtensionContext) {

   
    console.log('Congratulations, your weather extension is now active!');

    var disposable = vscode.commands.registerCommand('extension.Weather', () => {
              
        vscode.window.showInputBox('Please enter your ZipCode').then(zip => {
            getWeather(zip)  
        })
       
    })
        
        
        context.subscriptions.push(disposable);
}

function getWeather(zipcode:string) {	
	
request(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=Imperial&appid=0370b1e6a0361ced417335ddfba7f3b2`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            
            var  parsed = JSON.parse(body);
            if (parsed.cod != null)
            {
                vscode.window.showErrorMessage(parsed.message);
                
            }
            else{
            var temp = parsed.main.temp
            var cover =parsed.weather[0].main

            console.log(temp)
   
            if (!this._statusBarItem) { 
                this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left); 
            if(temp < 60){
                 this._statusBarItem.text = `$(thumbsdown) ${cover} and ${temp}`;
            }
            else if(temp>=85){
                this._statusBarItem.text = `$(flame) ${cover} and ${temp}`;
            }
            else{
                this._statusBarItem.text = `$(thumbsup) ${cover} and ${temp}`;
            }
            this._statusBarItem.show();

            }  

            }
        }
            else if(error){
            vscode.window.showErrorMessage(error);
            this._statusBarItem.Hide();
            }
            else{this._statusBarItem.Hide()}
            
        })
		
}