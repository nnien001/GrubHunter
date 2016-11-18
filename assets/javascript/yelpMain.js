

$( document ).ready(function() {


console.log("using yelpMain.js");

            var resultArray;
            var divArray;
            var near; 
            var num;

             $("body, html").animate({ 
                        scrollTop: $('#homeHeading').offset().top - 100
                    }, 100);

           


        $('#getResults').on('click', function(){
                    
                    $('#displayResults').empty();
                    resultArray = new Array;
                    divArray = new Array;

                // This line of code will grab the input from the textbox...
                near = $('#zipCodeInput').val().trim();

                initMap(near);

                if (near.length != 5 || isNaN(near))

                {
                    $('#displayResults').append(" Not a valid zip Code !");
                    near = 0;
                }

                console.log(near);
                var terms = 'Food Trucks';

                var parameters = [];
                parameters.push(['term', terms]);
                parameters.push(['location', near]);
                parameters.push(['callback', 'cb']);
                parameters.push(['oauth_consumer_key', auth.consumerKey]);
                parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
                parameters.push(['oauth_token', auth.accessToken]);
                parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


                var message = {
                    'action' : 'https://api.yelp.com/v2/search',
                    'method' : 'GET',
                    'parameters' : parameters
                };

                OAuth.setTimestampAndNonce(message);
                OAuth.SignatureMethod.sign(message, accessor);
        
                var parameterMap = OAuth.getParameterMap(message.parameters);


                 $.ajax({
                    'url' : message.action,
                    'data' : parameterMap,
                    'dataType' : 'jsonp',
                    'cache': true
                      })

                .done(function(data, textStatus, jqXHR) {
                      // console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                       // console.log(data);
                       // console.log("cb: " + JSON.stringify(data));
                       // console.log( "data : " + JSON.stringify(data.businesses.length));
                       // console.log( "data : " + JSON.stringify(data.businesses[0].rating));
                       // console.log( "data : " + JSON.stringify(data.businesses[0].location));
                       // console.log( "latitude : " + JSON.stringify(data.businesses[0].location.coordinate.latitude));
                       // console.log( "longitude : " + JSON.stringify(data.businesses[0].location.coordinate.longitude));
                       // console.log( "data : " + JSON.stringify(data.businesses[0].id));
                       // console.log( "data : " + JSON.stringify(data.businesses[0].price));
                       // console.log( "data : " + JSON.stringify(data.businesses[0].image_url));
                       // console.log( "data : " + JSON.stringify(data.businesses[0].rating_img_url));

                      if (data.businesses.length <10 )
                      {
                        num = data.businesses.length;
                      } 
                      else  
                      {
                        num = 10;
                      }

                    for (var i = 0; i<num; i++)
                      {
                            resultObject = 

                             {  id: data.businesses[i].id, 
                                resultImage: data.businesses[i].image_url,
                                rating : data.businesses[i].rating,
                                ratingImg : data.businesses[i].rating_img_url_large,
                                location : data.businesses[i].location.display_address,
                                ratingDesc: data.businesses[i].snippet_text,
                                link: data.businesses[i].mobile_url,
                                foodCategory: data.businesses[i].categories[i],
                                phone: data.businesses[i].display_phone,
                                lat: data.businesses[i].location.coordinate.latitude,
                                lng: data.businesses[i].location.coordinate.longitude
                             };

                            resultObject.id = resultObject.id.split('-').join(' ');
                            resultObject.id = resultObject.id.toUpperCase();




                        // var businessName = resultObject.id;
                        // $(businessName).attr('data-name', i); 

                            var businessName = $("<div>");
                            businessName.text(resultObject.id);
                            businessName.addClass("bName");
                            businessName.attr('data-name', i);


                        
                        var image1 = $('<img class = "imgDivClass1">').attr('src', resultObject.resultImage);
                        image1.attr('data-name', i);  
                        console.log(image1.attr('data-name'));
                      

                        var image2 = $('<img class = "imgDivClass2">').attr('src',resultObject.ratingImg);
                        image2.attr('data-name', i);


                        var buttonDrive = $("<button class= 'driveButton'> Take me there! </button>") ;
                        buttonDrive.attr('data-name', i); // Added a data-attribute

                        var infolink = $("<button class= 'infoButton'> Find out more! </button>") ;
                        infolink.attr('data-name',i);

                       console.log( "URL : " + resultObject.link);

                       resultArray.push(resultObject);
                        
                      divArray[i] = $("<div class = 'outerDiv'>");

                      // businessNameDiv = $("<div class = 'titleDivClass'>").text((i + 1).toString() + ". ")
                      businessName.text((i + 1).toString() + ". ");

                      // businessNameDiv.append(businessName);
                      // divArray[i].append(businessNameDiv);
                      // businessNameDiv.attr('data-name', i);

                      divArray[i].append(businessName);

                      imgDiv = $('<div >').append(image1);
                      divArray[i].append(imgDiv);

                      divArray[i].append(buttonDrive);

                      divArray[i].append(infolink);

                      ratingDiv = $("<div class = 'textclass' >").append("Rating: " + resultObject.rating);
                      divArray[i].append(ratingDiv);

                      ratingImgDiv = $("<div class = 'wrapping' >").append(image2);
                      divArray[i].append(ratingImgDiv);

                      //$("strong").text("what ever you want")

                      // var strongtext = $("strong").text("Location: ");
                      // locationDiv = $("<div class = 'textclass' >").append(strongtext + resultObject.location);

                      
                      locationDiv = $("<div class = 'textclass' >").append("Location: " + resultObject.location);
                      divArray[i].append(locationDiv);

                      ratingDescDiv = $("<div class = 'textclass' >").append("What People Said: " + resultObject.ratingDesc);
                      divArray[i].append(ratingDescDiv);

                      categoryDiv = $("<div class = 'textclass' >").append("Food Category: " + resultObject.foodCategory);
                       divArray[i].append(categoryDiv);

                      phoneDiv = $("<div class = 'textclass' >").append("Phone #: " + resultObject.phone);
                      divArray[i].append(phoneDiv);
                    
                       $('#displayResults').append(divArray[i]);

    
                    //code for adding markers
                      var newPos = {
                        lat: resultObject.lat,
                        lng: resultObject.lng
                      } 

                     addNewMarker(newPos, (i+1).toString());


                     $("body, html").animate({ 
                        scrollTop: $('#map').offset().top 
                    }, 300);
                }

                clicklistener();
                      }
            )



                .fail(function(jqXHR, textStatus, errorThrown) {
                                    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                        }

                    );
               
                  return false;
                })



                function clicklistener() 

                        {
                              $('.driveButton').on("click",function()

                              {
                                console.log("clicked on drive");

                                var newLat = resultArray[$(this).attr("data-name")].lat;
                                var newLng = resultArray[$(this).attr("data-name")].lng;
                                console.log(newLat + "    " + newLng);
      
                               var url = "https://www.google.com/maps/dir/" + currentPos.pos.lat + "," + currentPos.pos.lng + "/" + newLat + "," + newLng;

                              window.open(url,'_blank');

                              }); 


                              $('.imgDivClass1, .imgDivClass2, .bName').on("click",function()

                              {
                                    window.open(resultArray[$(this).attr("data-name")].link,'_blank');
                              });   

                             $('.infoButton').on("click",function()

                              {
                                    console.log("you clicked on title");
                                    window.open(resultArray[$(this).attr("data-name")].link,'_blank');
                              });

                        }

 
                var auth = {
                    consumerKey : "tdDeaUZsKmwWPlAHcAXrBQ",
                    consumerSecret : "Mc5OMuJ5LUzJ4H8i7olOPE0eBxo",
                    accessToken : "vxc5hq9rwljvRnhke3uz08t3LPTvTKIt",
                    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
                    // You wouldn't actually want to expose your access token secret like this in a real application.
                    accessTokenSecret : "NGYjH8ZYKU-lSjHuD_vFTfqMsvg",
                    serviceProvider : {
                        signatureMethod : "HMAC-SHA1"
                                      }
                };
        
                var accessor = {
                    consumerSecret : auth.consumerSecret,
                    tokenSecret : auth.accessTokenSecret
                };

                });
