const puppeteer=require("puppeteer");
const codeObj=require("./code");
// const { del } = require("request");
const loginLink='https://www.hackerrank.com/auth/login';
const email="sanav66380@get2israel.com";
const password="sanav66380";
let page



const browserOpen=puppeteer.launch({
    headless:false,
    args:["--start-maximized"],
    defaultViewport:null
});
browserOpen.then(function(browserObj){
    console.log("browser openend");
    let browserOpenPromise=browserObj.newPage();
    return browserOpenPromise;
}).then(function(newTab){
    page=newTab;
    let hackerrankOpenPromise=newTab.goto(loginLink);
    return hackerrankOpenPromise;
}).then(function(){
   let  emailIsEntered=page.type("input[id='input-1']",email,{delay:50});
   return emailIsEntered;
}).then(function(){
    let  passwordIsEntered=page.type("input[type='password']",password,{delay:50});
   return passwordIsEntered;
}).then(function(){
    let loginButtonClicked=page.click("button[data-analytics='LoginPassword']",{delay:50});
    return loginButtonClicked;
}).then(function(){
    let clickOnAlgoPromise=waitAndClcik(".topic-card a[data-attr1='algorithms']",page);
    return clickOnAlgoPromise;
}).then(function(){
    let getToWarmUp=waitAndClcik('input[value="warmup"]',page);
    return getToWarmUp;
}).then(function(){
    let waitFor4Secs=page.waitFor(4000);
    return waitFor4Secs;
}).then(function(){
    let challengePromise=page.$$('.challenge-submit-btn',{delay:50});
    return challengePromise;
}).then(function(questionArr){
    console.log("no of questions",questionArr.length);
    let questionWillBeSolved=questionSolver(page,questionArr[0],codeObj.answers[0]);
    return questionWillBeSolved;
})



function waitAndClcik(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise=cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModel=cPage.click(selector);
            return clickModel;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })

}

// function questionSolver(question){
//     return new Promise(function(resolve,reject){
//         let questionedWillBeClicked= question.click();
//      return questionedWillBeClicked;
       
//     })
// }


function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionedWillBeClicked= question.click();
     questionedWillBeClicked.then(function(){
        let editorInFocusPromise=waitAndClcik('.monaco-editor.no-user-select.vs',page)
        return editorInFocusPromise;
     }).then(function(){
             return waitAndClcik('.checkbox-input',page)
     }).then(function(){
        return page.waitForSelector('textarea.custominput',page)
    }).then(function(){
        return page.type('textarea.custominput',answer,{ddelay:20})
    }).then(function(){
        let ctrlIsPressed=page.keyboard.down("Control");
        return ctrlIsPressed;
    }).then(function(){
        let AIsPressed=page.keyboard.press("A",{delay:100});
        return AIsPressed;
    }).then(function(){
        let XIsPressed=page.keyboard.press("X",{delay:100});
        return XIsPressed;
    }).then(function(){
        let ctrlIsUnPressed=page.keyboard.up("Control");
        return ctrlIsUnPressed;
    }).then(function(){
        let mainEditorInFocusPromise=waitAndClcik('.monaco-editor.no-user-select.vs',page)
        return mainEditorInFocusPromise;
     }).then(function(){
        let ctrlIsPressed=page.keyboard.down("Control");
        return ctrlIsPressed;
    }).then(function(){
        let AIsPressed=page.keyboard.press("A",{delay:100});
        return AIsPressed;
    }).then(function(){
        let VIsPressed=page.keyboard.press("V",{delay:100});
        return VIsPressed;
    }).then(function(){
        let ctrlIsUnPressed=page.keyboard.up("Control");
        return ctrlIsUnPressed;
    }).then(function(){
        return page.click(".hr-monaco__run-code",{delay:50});
    }).then(function(){
        resolve();
    }).catch(function(err){
        reject();
    })
    })
}

// function questionSolver(question){
//     return new Promise(function(resolve,reject){
//         let questionedWillBeClicked= question.click();
//         questionedWillBeClicked.then(function(){
//             let editorInFocusPromise=waitAndClcik('.monaco-editor.no-user-select.vs-dark',page)
//             return editorInFocusPromise;
//         })//.then(function(){
//         //     return waitAndClcik('.checkbox-input',page)
//         //   }).then(function(){
//         //     return page.waitForSelector('textarea.custominput',page)
//         // })
//     })
// }