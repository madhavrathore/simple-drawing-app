var emailCorrect = false;
var nameCorrect = false;
var phoneNumber = false;
var count = 0;


function numberHandling()
{
	var phone = document.getElementById('phoneNumber').value;

	var num1='('+phone.substr(0, 3)
	var num2=num1.concat(')-',phone.substr(3, 3))
	var num3=num2.concat('-',phone.substr(6,4))
	document.getElementById('phoneNumber').value=num3;

	if(phone.length == 10)
	{
		localStorage.number = num3;
		phoneNumber = true;
		enableButton();
	}

	for (var i = 0; i < phone.length; i++) {
		var n = phone[i];
	}
	var number = phone[0].concat(phone[1],phone[2]);

	var stateValue = parseInt(phone[3].concat(phone[4],phone[5]));
	
	if(number > 621 && number < 799)
		{
			document.getElementsByTagName('img')[0].setAttribute('src', "jio.jpeg");
		}	
		else if(number > 801 && number < 920 )	
		{
			document.getElementsByTagName('img')[0].setAttribute('src', "idea.jpeg");
		}	
		else if(number > 921 && number < 999)
		{
			document.getElementsByTagName('img')[0].setAttribute('src', "vodafone.png");
		}  
		else
		{
			document.getElementById('phoneError').innerHTML = "Invalid Phone Number ";
		}

	if(stateValue > 100 && stateValue < 137)
		document.getElementById('stateName').innerHTML = map.get(stateValue);
	else
		document.getElementById('phoneError').innerHTML = "Invalid Phone Number ";
	
	return false;
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

function validateOTP(event)
	{
		var otp = document.getElementById('verification').value;

		while(true){
			
			if(otp == localStorage.randomNumber)
			{
				window.location = "http://pixel6.co/";
				return false;
			}
			else if(count != 3)
			{
				count = count+1;
				document.getElementById("correctOtp").innerHTML = "Enter the valid OTP";
				return true;
				
			}
			else{			
				window.location ='http://pixel6.co/linux';
				return false;
			}
		}
		event.preventDefaults();
		return false;
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