
    //get requested cart data and store in a JS object
    function getCartData(){
      const products = []
      $('.mini-cart-product').map((index, product) => {
        var productDetails = {
          href: '',
          img: '',
          name: '',
          price: '',
          quantity: '',
        };
          productDetails.href = $(product).find('a').attr('href')
          productDetails.img = $(product).find('img').attr('src')
          productDetails.name = $(product).find('.mini-cart-name').text()
          productDetails.price = $(product).find('.mini-cart-price').html()
          productDetails.quantity = $(product).find('.mini-cart-pricing .value').html()
          products.push(productDetails);
      }).get();
      const allCartData = {
        allProducts: products,
        numItemsInCart: parseInt($('.minicart-quantity').first().text()),
        cartTotal: $('.order-value').text(),
      }
      return allCartData
    };

      //create overlay and dialog box elements

      function createOverlay(){
        var overlay = $(document.createElement('div')).attr('class', 'overlay');
        $(overlay).css({
          'background-color': 'rgba(0,0,0,0.7)',
          'width': '100%',
          'height': '100%',
          'top': 0,
          'left': 0,
          'position': 'fixed',
          'z-index': 1,
        });
        return overlay;
      }

      function createDialogBox(){
        var dialogBox = $(document.createElement('div')).attr('class', 'dialog-box');
        $(dialogBox).css({
          'background-color': '#FFFFFF',
          'width': '700px',
          'max-width': '100%',
          'height': '400px',
          'max-height': '100%',
    	    'left': '50%',
          'top': '50%',
          'transform': 'translate(-50%, -50%)',
          'position': 'relative',
	        'z-index': 1,
          'text-align': 'center',
        });
        return dialogBox;
      }

      //create elements to display requested info in dialog box

      //show number of items in cart
      function createNumOfItems(data){
        var header = $(document.createElement('div')).attr('class', 'header');
        $(header).css({
          'font-family': 'ars_maquette_proregular, sans-serif',
          'font-size': 25,
          'padding-top': '20px',
          'color': 'black',
        });
        $(header).html(
          $(`<h2>There are ${data.numItemsInCart} items in your cart.</h2>`)
        );
          return header;
      }

      //show details of all products in cart
      function createDialogBoxContents(data){
        var content = $(document.createElement('div')).attr('class', 'contents-container');
        $(content).css({
          'width': '700px',
          'max-width': '100%',
          'height': '200px',
          'max-height': '100%',
          'position': 'fixed',
          'top': '50%',
          'transform': 'translateY(-50%)',
          'overflow-x': 'auto',
        });
        products = data.allProducts
        for(i=0; i<products.length; i++){
          var newdiv = $(document.createElement('div')).attr('class', 'content-div')
          newdiv.append(`<a href="${products[i].href}"><img src="${products[i].img}">`)
          newdiv.append(`<p>${products[i].name}</p>`)
          newdiv.append(`<p>${products[i].price}</p>`)
          newdiv.append(`<p>Quantiy: ${products[i].quantity}</p>`)
          $(newdiv).css({
            'max-width': '170px',
            'display': 'inline-block',
            'vertical-align': 'top',
            'margin-right': '20px',
          })
          $(content).append(newdiv)
        }
        return content;
      }

      //show cart total price
      function createTotal(data){
        var total = $(document.createElement('div')).attr('class', 'total');
        $(total).css({
          'font-family': 'ars_maquette_proregular, sans-serif',
          'font-size': 25,
          'padding': '2px 16px',
          'color': 'black',
          'position': 'absolute',
          'left': '20px',
          'bottom': '20px',
        });
        $(total).html(
          $(`<h2>Your total is: ${data.cartTotal}.</h2>`)
        );
          return total;
      }

      //create the cart and close buttons and add functionality

      function createCartButton(){
        var cartButton = $(document.createElement('button')).attr('class', 'cart-button');
        $(cartButton).css({
          'border-radius': '0',
          'font-family': 'ars_maquette_proregular, sans-serif',
          'color': 'black',
          'font-size': '12px',
          'font-weight': 'bold',
          'border': '1px solid black',
          'background-color': 'transparent',
          'font-weight': 'bold',
          'padding': '10px 20px 10px 20px',
          'text-decoration': 'none',
          'position': 'absolute',
          'bottom': '20px',
        })
        $(cartButton).html(
          "Go to Cart"
        );
        return cartButton;
      }

      function createCloseButton(){
        var closeButton = $(document.createElement('button')).attr('class', 'close-button');
        $(closeButton).css({
          'border-radius': '0',
          'font-family': 'ars_maquette_proregular, sans-serif',
          'color': 'black',
          'font-size': '12px',
          'font-weight': 'bold',
          'border': '1px solid black',
          'background-color': 'transparent',
          'padding': '10px 20px 10px 20px',
          'text-decoration': 'none',
          'position': 'absolute',
          'right': '20px',
          'bottom': '20px',
        })
        $(closeButton).html(
          "Close"
        );
        return closeButton;
      }

      function buttonFunctionality(){
          $('.close-button').hover(
           function(){
             $(this).css({
               'background-color':'rgb(204, 0, 1)',
               'color': 'white',
            });
         });
         $('.close-button').click(function(){
           $('.overlay').hide()
         });
         $('.cart-button').hover(
           function(){
             $(this).css({
             'background-color': '#3498db',
             'color': 'white',
             });
           });
         $('.cart-button').click(function(){
           window.location = 'https://marmot.com/cart'
         });
      }

      //render components onto the page
      function renderComponents(data){
        $('body').append(createOverlay());
        $('.overlay').append(createDialogBox());
        $('.dialog-box').append(createNumOfItems(data));
        $('.dialog-box').append(createTotal(data));
        $('.dialog-box').append(createDialogBoxContents(data));
        $('.dialog-box').append(createCloseButton());
        $('.dialog-box').append(createCartButton());
        buttonFunctionality();
      }

        //run the function to get data from the cart
        //set trigger for overlay and dialog box
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.4/waypoints.min.js',
          function(){
            var $overlayTrigger = $('#q-2');
            $overlayTrigger.waypoint(function(direction){
              if(direction === 'down'){
                cartData = getCartData();
                renderComponents(cartData);
              }
            }, {offset: '50%'})
          });
