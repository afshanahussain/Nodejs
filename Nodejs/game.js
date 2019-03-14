function user() {
this.name = "",
this.life = 100,
this.givelife = function givelife(targetplayer) {
targetplayer.life += 1;
this.life -= 1;
console.log(this.name + " gave life to " + targetplayer.name);
}
}

var mehar = new user();
var afshana = new user();

mehar.name = "Mehar";
afshana.name = "Afshana";

mehar.givelife(afshana);
console.log(mehar.life);
console.log(afshana.life);

user.prototype.uppercut = function(targetplayer){
  targetplayer.life -= 3;
  console.log(this.name + " uppercut " + targetplayer.name);

}
var stupid = new user();
stupid.name = "stupid";
stupid.uppercut(afshana);

console.log(afshana.life);

user.prototype.magicstick = "has magic wand";
console.log(afshana.magicstick);
