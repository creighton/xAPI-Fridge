interact(".draggable").draggable({
    onmove:dragMoveListener,
    snap: {
        targets: [],
        range: Infinity,
        relativePoints: [ {x: 0.5, y: 0.5} ],
        endOnly: true
    },
    onstart: function (event) {
        var rect = interact.getElementRect(event.target);
        var startPos = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };

        event.target.setAttribute('data-start-x', startPos.x);
        event.target.setAttribute('data-start-y', startPos.y);

        event.interactable.draggable({
            snap: {
                targets: [ startPos ]
            }
        });
    },
    onend: function (event) {
        // event.target.classList.remove('getting-dragged');
    }
});

interact(".drop").dropzone({ 
    overlap: 'center',
    accept: '.draggable',
    ondropactivate: function (event) {
        // event.target.classList.add('can-drop');
    },
    ondragenter: function (event) {
        var dragElement = event.relatedTarget,
            dropRect = interact.getElementRect(event.target),
            dropCenter = {
                x: dropRect.left + dropRect.width / 2,
                y: dropRect.top + dropRect.height / 2
            };
        event.draggable.draggable({
            snap: {
                targets: [ dropCenter ]
            }
        });
        if ( dropCenter.x != parseFloat(event.relatedTarget.getAttribute('data-start-x')) 
            && dropCenter.y != parseFloat(event.relatedTarget.getAttribute('data-start-y')) ) {
            $(event.target).addClass('hovery');
        }
    },
    ondragleave: function (event) {
        var startPos = {
            x: parseFloat(event.relatedTarget.getAttribute('data-start-x')),
            y: parseFloat(event.relatedTarget.getAttribute('data-start-y'))
        };
        event.draggable.draggable({
            snap: {
                targets: [startPos]
            }
        });
        $(event.target).removeClass('hovery');
    },
    ondropdeactivate: function (event) {},
    ondrop: function (event) {
        var item = $(event.relatedTarget).detach();
        item.appendTo(event.target);
        item.removeAttr('data-start-x');
        item.removeAttr('data-start-y');
        item.removeAttr('data-x');
        item.removeAttr('data-y');
        item.removeAttr('style');
        $(event.target).removeClass('hovery');
        Meteor.call('addItem', 'foo');
    }
});

function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    //target.classList.add('getting-dragged');
  }