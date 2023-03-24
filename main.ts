scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    sprite.sayText(text_list._pickRandom())
    pause(500)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairLadder, function (sprite, location) {
    if (!(canPass)) {
        // When "canPass" is false the Cherry Sprite cannot go through the brown stair blocks because it will get destroyed.
        sprites.destroy(sprite, effects.fire, 200)
        game.gameOver(false)
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    game.gameOver(true)
    game.splash("You win!")
})
function startConditions (cherry: Sprite, donut: Sprite) {
    scene.setBackgroundColor(15)
    controller.player1.moveSprite(cherry)
    controller.player2.moveSprite(donut)
    tiles.setCurrentTilemap(tilemap`level1`)
    tiles.placeOnRandomTile(cherry, sprites.dungeon.darkGroundNorthWest1)
    tiles.placeOnRandomTile(donut, sprites.dungeon.darkGroundNorthWest1)
    scene.cameraFollowSprite(cherry)
    canPass = false
    myMinimap = myMinimap
    mapSprite = sprites.create(minimap.getImage(minimap.minimap()), SpriteKind.Player)
    mapSprite.setPosition(150, 3)
    // Uses extension "minimap" to show the end target on the map when it is not visible at the beginning of the game(in the future, we can edit this to display the sprites on it)
    myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 0)
    // Adds while loop with sound to let users know the wall has been opened when the music stops playing
    while (canPass == false) {
        music.play(music.stringPlayable("C5 A B G A F G E ", 120), music.PlaybackMode.UntilDone)
    }
}
// Sets "canPass" to true which lets the Cherry Sprite pass by safely.
scene.onOverlapTile(SpriteKind.Enemy, sprites.dungeon.floorDarkDiamond, function (sprite, location) {
    canPass = true
    sprite.sayText("Safe For Cherry To Pass Now!", 500, false)
    sprite.startEffect(effects.confetti, 500)
})
let mapSprite: Sprite = null
let myMinimap: minimap.Minimap = null
let canPass = false
let text_list: string[] = []
game.splash("Mission: Work together to have the cherry sprite collect the treasure at the end of the maze!")
// text array for when the sprite hits a wall
text_list = ["Ouch!", "Wall!", "NOOOO"]
startConditions(sprites.create(img`
    . . . . . . . . . . . 6 6 6 6 6 
    . . . . . . . . . 6 6 7 7 7 7 8 
    . . . . . . 8 8 8 7 7 8 8 6 8 8 
    . . e e e e c 6 6 8 8 . 8 7 8 . 
    . e 2 5 4 2 e c 8 . . . 6 7 8 . 
    e 2 4 2 2 2 2 2 c . . . 6 7 8 . 
    e 2 2 2 2 2 2 2 c . . . 8 6 8 . 
    e 2 e e 2 2 2 2 e e e e c 6 8 . 
    c 2 e e 2 2 2 2 e 2 5 4 2 c 8 . 
    . c 2 e e e 2 e 2 4 2 2 2 2 c . 
    . . c 2 2 2 e e 2 2 2 2 2 2 2 e 
    . . . e c c e c 2 2 2 2 2 2 2 e 
    . . . . . . . c 2 e e 2 2 e 2 c 
    . . . . . . . c e e e e e e 2 c 
    . . . . . . . . c e 2 2 2 2 c . 
    . . . . . . . . . c c c c c . . 
    `, SpriteKind.Player), sprites.create(img`
    . . . . . . b b b b a a . . . . 
    . . . . b b d d d 3 3 3 a a . . 
    . . . b d d d 3 3 3 3 3 3 a a . 
    . . b d d 3 3 3 3 3 3 3 3 3 a . 
    . b 3 d 3 3 3 3 3 b 3 3 3 3 a b 
    . b 3 3 3 3 3 a a 3 3 3 3 3 a b 
    b 3 3 3 3 3 a a 3 3 3 3 d a 4 b 
    b 3 3 3 3 b a 3 3 3 3 3 d a 4 b 
    b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e 
    a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e 
    a 3 3 3 3 3 3 3 d d a 4 4 4 e . 
    a a 3 3 3 d d d a a 4 4 4 e e . 
    . e a a a a a a 4 4 4 4 e e . . 
    . . e e b b 4 4 4 4 b e e . . . 
    . . . e e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Enemy))
