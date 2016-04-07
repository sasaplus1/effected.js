(function(){

  'use strict';

  var animationName = 'move',
      animation = 'js-animation-move',
      iteration = 'js-animation-iterate-move';

  describe('effected', function() {

    describe('effected', function() {

      var div;

      beforeEach(function() {
        div = document.createElement('div');

        document.body.appendChild(div);
      });

      afterEach(function() {
        var removedChild;

        removedChild = document.body.removeChild(div);
        removedChild = null;

        div = null;
      });

      it('callback when animated', function(done) {
        effected(div, function(event) {
          assert(event.animationName === animationName);
          done();
        });

        div.classList.add(animation);
      });

      it('resolve when animated', function(done) {
        effected(div).then(function(event) {
          assert(event.animationName === animationName);
          done();
        });

        div.classList.add(animation);
      });

      it('throw error if Promise is not implemented', (!effected.Promise) &&
        function() {
          assert.throws(function() {
            effected(div);
          });
        }
      );

      it('throw error if not passed an element', function() {
        assert.throws(function() {
          effected();
        });
      });

    });

    describe('iterated', function() {

      var div;

      beforeEach(function() {
        div = document.createElement('div');

        document.body.appendChild(div);
      });

      afterEach(function() {
        var removedChild;

        removedChild = document.body.removeChild(div);
        removedChild = null;

        div = null;
      });

      it('callback when iterated', function(done) {
        effected.iterated(div, function(event) {
          assert(event.animationName === animationName);
          done();
        });

        div.classList.add(iteration);
      });

      it('throw error if not passed an element', function() {
        assert.throws(function() {
          effected.iterated();
        });
      });

    });

  });

}());
