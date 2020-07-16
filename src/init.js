/* Set everything up
 * ------------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      15th July, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/SpaceFlap
 * @codepen:   https://codepen.io/niitettehtsuru/pen/vYLVLBd
 * @license:   GNU General Public License v3.0 
 */ 
let 
curve,
backgroundColor = 0;//black
function getBrowserWindowSize()//get the width and height of the browser window 
{
    let win = window,
    doc = document,
    offset = 20,//
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    browserWindowWidth = win.innerWidth || docElem.clientWidth || body.clientWidth,
    browserWindowHeight = win.innerHeight|| docElem.clientHeight|| body.clientHeight;  
    return {width:browserWindowWidth-offset,height:browserWindowHeight-offset}; 
} 
function onWindowResize()//called every time the window gets resized. 
{  
    let browserWindowSize = getBrowserWindowSize(); 
    resizeCanvas(browserWindowSize.width,browserWindowSize.height);  
    curve.resize(browserWindowSize.width,browserWindowSize.height); 
}
//gets the height of the curve, assuming that the the window was in 
//fullscreen mode and is now reduced to it's present dimensions
function getMaxHeight()
{ 
    let maxHeight = 60; 
    let fullScreenHeight = 644;//assumed browser window height of device  
    let dy  = height/fullScreenHeight;//percentage change in browser window height   
    maxHeight *= dy; 
    return maxHeight;   
}
function setNewCurve()
{
    let browserWindowSize = getBrowserWindowSize();  
    createCanvas(browserWindowSize.width,browserWindowSize.height);  
    let data = 
    {        
        //position the curve in the center of the screen
        xCoord: width/2,
        yCoord: height/2,
        //other params
        screenWidth: width,
        screenHeight: height,
        maxHeight: getMaxHeight(),
        color: 'white'
    };
    curve = new Curve(data);  
}  
function setup() 
{
    let browserWindowSize = getBrowserWindowSize();  
    createCanvas(browserWindowSize.width,browserWindowSize.height);  
    let data = 
    {        
        //position the curve in the center of the screen
        xCoord: width/2,
        yCoord: height/2,
        //other params
        screenWidth: width,
        screenHeight: height, 
        maxHeight: getMaxHeight(),
        color: 'white'
    };
    curve = new Curve(data);  
    window.addEventListener('resize',onWindowResize);
    document.addEventListener('click',(event)=>//when canvas is clicked,
    {    
        setNewCurve();//start the animation all over
    });
    background(backgroundColor);//black 
} 
function draw() 
{     
    smooth();   
    background(backgroundColor); 
    curve.update();
    curve.draw();  
}