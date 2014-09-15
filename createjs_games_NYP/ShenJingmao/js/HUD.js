/**
 * Created by Enveesoft.
 * User: WINSTON HO
 * Date: 14-9-10
 * Time: ??17:26
 * Write the description in this section.
 */

//this function does the inheritance
BOK.inherits(HUD, createjs.Container);

/**
 * @ constructor
 * */
function HUD() {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);
	
	this.gameOver = new createjs.Bitmap(imgContainer["imgs/failed.png"]);
	this.win = new createjs.Bitmap(imgContainer["imgs/victory.png"])
	
	//this.addChild(this.LevelText);
	this.x = 100;
	this.y = 300;
	
}

HUD.prototype.addGameOver = function(isGameOver)
{
	if(isGameOver){
		this.addChild(this.gameOver);
	}
	else{
		this.removeChild(this.gameOver);
	}
}

HUD.prototype.addWining = function(isWin)
{
	if(isWin){
		this.addChild(this.gameOver);
	}
	else{
		this.removeChild(this.gameOver);
	}
}


