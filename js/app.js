// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (dt * this.speed);

    // Reset position when it moves off the board.
    if (this.x > 500) {
        this.reset();
    }

    // Detect collision with player and execute if any.
    if (this.collisionDetected()) {
        this.collision();
    }
};

Enemy.prototype.reset = function() {
    // Set initial x and y coordinates.
    // The starting x position is between -100 and -300 to stagger flow.
    this.x = -1 * (Math.floor(Math.random() * 300) + 100);

    // The starting y position is assigned randomly from
    // one of three possible positions with higher chance
    // of starting in one of the top two rows.
    var startY = [62, 62, 62, 62, 145, 145, 145, 230, 230];
    this.y = startY[Math.floor(Math.random() * startY.length)]; 

    // The speed is set randomly between [80-350].
    this.speed = Math.floor(Math.random() * 350) + 80;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Determine if enemy is close enough to player to cause a collision
Enemy.prototype.collisionDetected = function() {
    Xcollided = (this.x > player.x - 70 && this.x < player.x + 70);
    Ycollided = (this.y > player.y - 30 && this.y < player.y + 30);
    return(Xcollided && Ycollided);
};

// Handle collision with player
Enemy.prototype.collision = function () {
    player.reset();
    // This method can be extended to handle points and lives.
};

// This is our player
var Player = function() {
    // Set initial starting coordinates and image.
    this.reset();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // if the player reaches the water (when y is smaller than 0)
    // then reset the player to the starting position.
    if (this.y < 0) {
        this.reset();
    }
};

// Reset player to starting position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 385;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the player within game bounds based on key press input.
Player.prototype.handleInput = function(keyPress) {
    var x = this.x;
    var y = this.y;

    switch(keyPress) {
        case 'up':
            y -= 83;
            break;
        case 'right':
            x += 100;
            break;
        case 'down':
            y += 83;
            break;
        case 'left':
            x -= 100;
            break;
    }
    x = Math.min(Math.max(x, 0), 400); // Prevent out-of-bounds
    y = Math.min(Math.max(y, -30), 385); // Prevent out-of-bounds
   
    this.x = x;
    this.y = y;
};

// Now instantiate enemy and player objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 7; i++) {
    allEnemies.push(new Enemy());
};

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
