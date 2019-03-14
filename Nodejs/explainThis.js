var Afshana = {
     PrintFirstName:function(){
                console.log("Afshana is beautiful");
                console.log(this === Afshana);
        }
};

Afshana.PrintFirstName();


function dosomething(){
           console.log("Afshana is other world");
           console.log(this === global); //This needs to be 'global' here but for some reason it is undefined (is it due to strict mode)
   }

dosomething();
