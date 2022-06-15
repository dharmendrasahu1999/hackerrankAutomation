//async await ki backchodi he isme....

const puppeteer=require("puppeteer");
const codeObj=require("./code");
const { del } = require("request");
const loginLink='https://www.hackerrank.com/auth/login';
const email="sanav66380@get2israel.com";
const password="sanav66380";
//let page



(async function(){
    try {
        const browserInstance=await puppeteer.launch({
            headless:false,
            args:["--start-maximized"],
            defaultViewport:null
        });

        let newTab=await browserInstance.newPage();
        await newTab.goto(loginLink);
        await newTab.type("input[id='input-1']",email,{delay:50})
        await newTab.type("input[type='password']",password,{delay:50})
        await newTab.click("button[data-analytics='LoginPassword']",{delay:50})
        await waitAndClcik(".topic-card a[data-attr1='algorithms']",newTab);
        await waitAndClcik('input[value="warmup"]',newTab)
        let allchallenges=await newTab.$$('.challenge-submit-btn',{delay:50})
        console.log(allchallenges.length);
        //let questionWillBeSolved=await questionSolver(newTab,allchallenges[0],codeObj.answers[0]);
        let questionWillBeSolved=await questionSolver(newTab,allchallenges[0],codeObj.answers[0]);
        return questionWillBeSolved;

    } catch (error) {
        console.log(error);
    }
})()





// browserOpen.then(function(browserObj){
//     console.log("browser openend");
//     let browserOpenPromise=browserObj.newPage();
//     return browserOpenPromise;
// }).then(function(newTab){
//     page=newTab;
//     let hackerrankOpenPromise=newTab.goto(loginLink);
//     return hackerrankOpenPromise;
// }).then(function(){
//    let  emailIsEntered=page.type("input[id='input-1']",email,{delay:50});
//    return emailIsEntered;
// }).then(function(){
//     let  passwordIsEntered=page.type("input[type='password']",password,{delay:50});
//    return passwordIsEntered;
// }).then(function(){
//     let loginButtonClicked=page.click("button[data-analytics='LoginPassword']",{delay:50});
//     return loginButtonClicked;
// }).then(function(){
//     let clickOnAlgoPromise=waitAndClcik(".topic-card a[data-attr1='algorithms']",page);
//     return clickOnAlgoPromise;
// }).then(function(){
//     let getToWarmUp=waitAndClcik('input[value="warmup"]',page);
//     return getToWarmUp;
// }).then(function(){
//     let waitFor4Secs=page.waitFor(4000);
//     return waitFor4Secs;
// }).then(function(){
//     let challengePromise=page.$$('.challenge-submit-btn',{delay:50});
//     return challengePromise;
// }).then(function(questionArr){
//     console.log("no of questions",questionArr.length);
//     let questionWillBeSolved=questionSolver(page,questionArr[0],codeObj.answers[0]);
//     return questionWillBeSolved;
// })



async function waitAndClcik(selector,cPage){
    
    await cPage.waitForSelector(selector);
    let selectorClicked=cPage.click(selector);
    return selectorClicked;

}

// // function questionSolver(question){
// //     return new Promise(function(resolve,reject){
// //         let questionedWillBeClicked= question.click();
// //      return questionedWillBeClicked;
       
// //     })
// // }


// function questionSolver(page,question,answer){
//     return new Promise(function(resolve,reject){
//         let questionedWillBeClicked= question.click();
//      questionedWillBeClicked.then(function(){
//         let editorInFocusPromise=waitAndClcik('.monaco-editor.no-user-select.vs',page)
//         return editorInFocusPromise;
//      }).then(function(){
//              return waitAndClcik('.checkbox-input',page)
//      }).then(function(){
//         return page.waitForSelector('textarea.custominput',page)
//     }).then(function(){
//         return page.type('textarea.custominput',answer,{ddelay:20})
//     }).then(function(){
//         let ctrlIsPressed=page.keyboard.down("Control");
//         return ctrlIsPressed;
//     }).then(function(){
//         let AIsPressed=page.keyboard.press("A",{delay:100});
//         return AIsPressed;
//     }).then(function(){
//         let XIsPressed=page.keyboard.press("X",{delay:100});
//         return XIsPressed;
//     }).then(function(){
//         let ctrlIsUnPressed=page.keyboard.up("Control");
//         return ctrlIsUnPressed;
//     }).then(function(){
//         let mainEditorInFocusPromise=waitAndClcik('.monaco-editor.no-user-select.vs',page)
//         return mainEditorInFocusPromise;
//      }).then(function(){
//         let ctrlIsPressed=page.keyboard.down("Control");
//         return ctrlIsPressed;
//     }).then(function(){
//         let AIsPressed=page.keyboard.press("A",{delay:100});
//         return AIsPressed;
//     }).then(function(){
//         let VIsPressed=page.keyboard.press("V",{delay:100});
//         return VIsPressed;
//     }).then(function(){
//         let ctrlIsUnPressed=page.keyboard.up("Control");
//         return ctrlIsUnPressed;
//     }).then(function(){
//         return page.click(".hr-monaco__run-code",{delay:50});
//     }).then(function(){
//         resolve();
//     }).catch(function(err){
//         reject();
//     })
//     })
// }


//bhoout shi launde shi likha he promises ko await me convert krke
async function questionSolver(newTab,question,answer){
         await question.click();
         await waitAndClcik('.monaco-editor.no-user-select.vs',newTab)
         await waitAndClcik('.checkbox-input',newTab)
         await newTab.type('textarea.custominput',answer,{ddelay:20})
         await  newTab.keyboard.down("Control");
         await newTab.keyboard.press("A",{delay:100});
         await newTab.keyboard.press("X",{delay:100});
         await newTab.keyboard.up("Control");
         await waitAndClcik('.monaco-editor.no-user-select.vs',newTab)
         await newTab.keyboard.down("Control");
         await newTab.keyboard.press("A",{delay:100});
         await newTab.keyboard.press("V",{delay:100});
         await newTab.keyboard.up("Control");
         return newTab.click(".hr-monaco__run-code",{delay:50});
      
}