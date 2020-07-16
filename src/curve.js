'use strict';
/* The curve
 * ---------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      15th July, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/SpaceFlap
 * @codepen:   https://codepen.io/niitettehtsuru/pen/vYLVLBd
 * @license:   GNU General Public License v3.0 
 */    
class Curve
{
    constructor(data)
    {          
        this.screenHeight = data.screenHeight;  
        this.screenWidth = data.screenWidth;      
        this.param  = 0;//the parameter in the parametric equation 
        this.xCoord = data.xCoord;//set x coordinate of the center of the curve  
        this.yCoord = data.yCoord;//set y coordinate of the center of the curve      
        this.color =  data.color; 
        //so the angle will increase from min to max and then vice versa
        this.maxAngle = 1; 
        this.minAngle = 0; 
        this.angle = this.minAngle;
        this.angleIncrement = 0.009; 
        this.toggleAngle = true;//true to move the angle from min to max, false for the reverse 
        //so the height will increase from min to max and vice versa 
        this.maxHeight = data.maxHeight; 
        this.minHeight = Math.min(20,this.maxHeight) === this.maxHeight? 10: 20; 
        this.height = this.minHeight; 
        this.toggleHeight = true;//true to move the height from min to max, false for the reverse  
    }  
    update() 
    { 
        //increases and reduces the angle, creating the effect of a rotating curve 
        if(this.toggleAngle)
        {
            this.angle+= this.angleIncrement; 
            //ensure angle never goes above the max
            if(this.angle >= this.maxAngle)
            { 
                this.toggleAngle = !this.toggleAngle;
            }
        }
        else 
        {
            this.angle-= this.angleIncrement; 
            //ensure angle never goes below the min
            if(this.angle <= this.minAngle)
            { 
                this.toggleAngle = !this.toggleAngle;
            }
        }  
        //increases and reduces the height
        if(this.toggleHeight)
        {
            this.height+= 1; 
            //ensure height never goes above the max
            if(this.height >= this.maxHeight)
            { 
              this.toggleHeight = !this.toggleHeight;
            }
        }
        else 
        {
            this.height-= 1; 
            //ensure height never goes below the min
            if(this.height <= this.minHeight)
            { 
                this.toggleHeight = !this.toggleHeight;
            }
        } 
    } 
    draw()//draws the curve
    {        
        let coordinates = []; 
        this.param = 0;//reset parameter   
        //iterate the parameter from 0 to 12 * PI 
        for(this.param = 0; this.param <  12 * Math.PI;this.param+= 0.017) 
        {    
            //first parametric equation
            let x = 50* sin(this.angle*this.param) * ((exp(sin(this.param))) - (2 * cos(0 * this.param)) - (pow(sin(this.param / 12), 1))) + this.xCoord;
            //second parametric equation
            let y = this.height* cos(this.param) * ((exp(cos(this.param ))) + (2 * cos(this.angle* this.param)) - (pow(sin(this.param / 12), 5))) + this.yCoord;
            coordinates.push({x:x,y:y});     
        }   
        this.drawLines(coordinates);   
    }  
    drawLines(coordinates)//draw lines to connect the dots on the curve
    {
        stroke(this.color);
        strokeWeight(0.1); 
        for(let i = 0; i < coordinates.length; i++)
        {
            let point1 = coordinates[i];
            let point2 = coordinates[coordinates.length-1-i];
            let point3 = coordinates[coordinates.length-2-i];
            line(point1.x,point1.y,point2.x,point2.y); 
            line(point1.x,point1.y,point3.x,point3.y); 
            if(i >= coordinates.length/2)
            {
                break; 
            }
        }
    } 
    resize(screenWidth,screenHeight)
    {   
        if(this.screenHeight !== screenHeight || this.screenWidth !== screenWidth)//if the screen size has changed
        {    
            let dy = screenHeight/this.screenHeight;//percentage change in browser window height 
            let dx = screenWidth/this.screenWidth;//percentage change in browser window width  
            this.screenHeight = screenHeight;  
            this.screenWidth = screenWidth; 
            this.xCoord *= dx; 
            this.yCoord *= dy;   
            this.maxHeight *= dy;    
            this.minHeight *= dy;   
        } 
    }  
}