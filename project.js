var emailCorrect = false;
var nameCorrect = false;
var phoneNumber = false;
var phone1 = false;
var phone2 = false;
var phone3 = false;
function handleProvider() 
{
	var provider = document.getElementById('provider').value;

	var img = document.createElement('img');

	if(provider > 621 && provider < 799)
	{
		document.getElementsByTagName('img')[0].setAttribute('src', "jio.jpeg");
	}	
	else if(provider > 801 && provider < 920 )	
	{
		document.getElementsByTagName('img')[0].setAttribute('src', "idea.jpeg");
	}	
	else if(provider > 921 && provider < 999)
	{
		document.getElementsByTagName('img')[0].setAttribute('src', "vodafone.png");
	}  
	else
	{
		document.getElementById('phoneError').innerHTML = "Invalid Phone Number ";
		return false
	}
	phone1 = true;
	correctPhoneNumber();
	return true;
}
function handleState(){
	var state = parseInt(document.getElementById('state').value);

	if(state > 100 && state < 137)
	{
		document.getElementById('stateName').innerHTML = map.get(state);
		phone2 = true;
		correctPhoneNumber();
		return true;
	}
	else
	{
		document.getElementById('phoneError').innerHTML = "Invalid Phone Number";
		return false;
	}

}
function handleNumber(){
			var phoneNumber = document.getElementById('number').value;

			if(phoneNumber.length == 4)
			{
				phone3 = true;
				correctPhoneNumber();
				return true;
			}
			return false;
						
}
function correctPhoneNumber(){
	if(phone1 && phone2 && phone3)
	{
		phoneNumber = true;
		enableButton();
	}
}


function onlyNumberKey(evt) 
{
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
	if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) 
    	return false; 
	
	return true;
}

function applyUpperCase()
{
	var name = document.getElementById("name").value;
		document.getElementById("name").value = name.toUpperCase();
}

function nameHandling()
	{
		var name = document.getElementById('name').value;

		var [firstName, lastName] = name.split(" ");

		if(firstName.trim().length < 4 || name.split(' ').length < 2)
		{
			document.getElementById('error').innerHTML="Minimum two words are reuired or length of word should be 4";
			return false;
		}
		else if(lastName.trim().length < 4)
		{
			document.getElementById('error').innerHTML="Length of word must be 4";
			return false;
		}
		else
		{
			localStorage.name = firstName;
			nameCorrect = true;
			enableButton();
			return true;
		}
}

function emailHandling() {
	var email = document.getElementById('email').value;

	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('email').value))
      		{
        		emailCorrect = true;
        		enableButton();
        		return true;
      		}
      		else
      		{
		        document.getElementById('emailError').innerHTML= "You have entered an invalid email address!";
		        return false;   
			}
}		

function validateOTP()
	{
		var otp = document.getElementById('verification').value;
		var count = 0;
			if(otp == localStorage.randomNumber)
			{
				window.location.href = "http://pixel6.co/";
			}
			else if(count == 3)
			{
					window.location.href ='http://pixel6.co/linux';
			}
			else
			{
				count++;
				// window.location.href = "project.html";
			}
	}

function lettersOnly(evt) {
       evt = (evt) ? evt : event;
       var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
          ((evt.which) ? evt.which : 0));
       if (charCode > 32 && (charCode < 65 || charCode > 90) &&
          (charCode < 97 || charCode > 122)) {
          alert("Enter letters only.");
          return false;
       }
       return true;
     }