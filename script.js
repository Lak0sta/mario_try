(function ($, window, document) {

  $(function () {
    app.generateWorld();
  });

  let app = {
    $mario: $('#mario'),
    $left: $('#mario-left'),
    groundWidth: 125,
    marioPosX: 0,
    marioPosY: 27,
    speed: 10,
    generateWorld: function(){
      this.generateGround();
      this.controlInit();
      this.gameOver();
    },
    generateGround: function(){
     
      let ground = $('<div/>').addClass('ground');
      let hole = $('<div/>').addClass('hole');

      for (let index = 0; index < 20; index++) {
        if (index%4 || index === 0) {
          $('.footer').append(ground.clone());
        } else {
          $('.footer').append(hole.clone());
        }
      }
    },
    gameOver: function(){
      let coordintes = $('div.hole').offset().left;
        if(this.$mario.offset().left > coordintes)
        this.$mario.prop("id", 'death');
      
      

      
    },
    controlInit: function () {
      let movement = {
        right: 39,
        left: 37,
        up: 38,
        down: 40
      };
      $(document).on('keydown', (event)=>{
        switch(event.keyCode) {
          case movement.right:
            this.$mario.prop('id',"mario"); 
            this.$mario.toggleClass('rightmove');
            this.moveMario('right');
            break;
          case movement.left:
            this.$mario.prop('id',"mario-left");
            this.$mario.toggleClass('leftmove');
            this.moveMario('left');
            break;
          case movement.up:
            if (this.$mario.hasClass('upmove')) return;
            this.$mario.addClass('upmove');
            this.moveMario('up');
            break;
          case movement.down:
            if (this.$mario.hasClass('down')) return;
            this.$mario.addClass('down');
            this.moveMario('down');
          default:
            break;
        }
      });
      $(document).on('keyup', ()=>{
        this.$mario.attr('class','');
      });
    },
    moveMario: function (direction) {
      switch (direction) {
        case 'right':
          this.marioPosX += this.speed;
          break;
        case 'left':
          if (this.marioPosX < 0 || this.marioPosX < this.speed) this.marioPosX = this.speed;
          this.marioPosX -= this.speed;
          break;
        case 'up':
          for (let i=0; i< 3; i++){
            this.marioPosY += this.speed;
            this.$mario.css('bottom', this.marioPosY);
          }
          setTimeout(() => {
            for (let i = 0; i < 3; i++) {
              this.marioPosY -= this.speed;
              this.$mario.css('bottom', this.marioPosY);
            }
          }, 300);
        case 'down':
          break;  
        default:
          break;
      }

      this.$mario.css('left', this.marioPosX);
    }
  }

}(window.jQuery, window, document));
