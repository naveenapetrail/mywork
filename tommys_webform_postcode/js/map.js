


 function getLocation(){
	getAddressInfoByZip(document.forms[1].zip.value);
	  
}
 
function response(obj){
  window.alert(obj);
    
}

function getAddressInfoByZip(zip){
  if(zip.length >= 5 && typeof google != 'undefined'){
    var addr = {};
	var zipcode={};
    
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': zip }, function(results, status){
      if (status == google.maps.GeocoderStatus.OK){
        if (results.length >= 1) {
	  for (var ii = 0; ii < results[0].address_components.length; ii++){
	    var street_number = route = street = city = state = zipcode = country = formatted_address = '';
	    var types = results[0].address_components[ii].types.join(",");
	    if (types == "street_number"){
	      addr.street_number = results[0].address_components[ii].long_name;
	    }
	    if (types == "route" || types == "point_of_interest,establishment"){
	      addr.route = results[0].address_components[ii].long_name;
	    }
	    if (types == "sublocality,political" || types == "locality,political" || types == "neighborhood,political" || types == "administrative_area_level_3,political"){
	      addr.city = (city == '' || types == "locality,political") ? results[0].address_components[ii].long_name : city;
	    }
	    if (types == "administrative_area_level_1,political"){
	      addr.state = results[0].address_components[ii].short_name;
	    }
	    if (types == "postal_code" || types == "postal_code_prefix,postal_code"){
	      addr.zipcode = results[0].address_components[ii].long_name;
	    }
	    if (types == "country,political"){
	      addr.country = results[0].address_components[ii].long_name;
	    }
	  }
	  addr.success = true;
	  for (name in addr){
	      window.alert('### google maps api ### ' + name + ': ' + addr[name] );
	  }
	  response(addr);
        } else {
          response({success:false});
        }
      } else {
        response({success:false});
      }
    });
  } else {
    response({success:false});
  }
}



                        // custum script for geting value  

				function jqsub() {
							window.alert("sometext");
							var $f = $('#zipcode1');//data from zip code filed 
							//var $m = $('#message');// this variable have to passed for web form filed callback
							//extends getLocation(); // include function over variable for getting json data type 
							
							$.ajax({
							type: 'POST',
							url: $f.attr('action') + '&amp;JSON=1',
							data: $f.serialize(),
							success: function(msg) {
							var formResponse = eval(msg); // This line evaluates the JSON data and converts it to JSON object. In older version of jQuery you will have to evaluate JSON object as a string.
							if (formResponse.FormProcessV2Response.success) { 
							$m.addClass('success').fadeIn().html(formResponse.FormProcessV2Response.message); 
							$f.fadeOut(); //Hide the form
							}
							return;
						},
							error: function(msg) {
								alert('error'+msg);
							return false;
						}
						});
				}
























					


	